const Train = require("../models/train");
const mongoose = require("mongoose");
const { bookSeats } = require("../utils/bookSeats");

// Controller to get the status of a specific train
exports.getTrainStatus = async (req, res) => {
  try {
    const train = await Train.findOne({ trainId: req.params.trainId });
    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }
    res.json(train.seatLayout);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to handle booking of tickets
exports.bookTickets = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { seats: seatsRequired } = req.body;

    if (seatsRequired < 1 || seatsRequired > 7) {
      return res.status(400).json({ message: "Invalid number of seats" });
    }

    const train = await Train.findOne({ trainId: req.params.trainId }).session(
      session
    );
    if (!train) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Train not found" });
    }

    // Attempt to book the required seats
    const bookedSeats = bookSeats(train.seatLayout, seatsRequired);
    if (bookedSeats.length === 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Not enough seats available" });
    }

    // Mark the booked seats as reserved
    const reservedSeats = [];
    bookedSeats.forEach(({ row, index }) => {
      train.seatLayout[row].seats[index].isBooked = true;
      reservedSeats.push(train.seatLayout[row].seats[index]);
    });

    // Save the updated train data and commit the transaction
    await train.save({ session });
    await session.commitTransaction();
    session.endSession();

    // Send a success response with the booked seats and updated seat layout
    res.status(200).json({
      message: "Booking successful",
      bookedSeats: reservedSeats,
      seatLayout: train.seatLayout,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Server error" });
    console.error(error);
  }
};

// Controller to handle resetting the seat layout
exports.handleReset = async (req, res) => {
  try {
    const train = await Train.findOne({ trainId: req.params.trainId });
    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }

    // Reset all seats to not booked
    train.seatLayout.forEach((row) => {
      row.seats.forEach((seat) => {
        seat.isBooked = false;
      });
    });

    // Save the updated train data and return the seat layout
    await train.save();
    res.json(train.seatLayout);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
