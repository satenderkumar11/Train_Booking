const Train = require("../models/train");
const mongoose = require("mongoose");
const { bookSeats } = require("../utils/bookSeats");

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

    const bookedSeats = bookSeats(train.seatLayout, seatsRequired);
    if (bookedSeats.length === 0) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Not enough seats available" });
    }
    console.log("booked", bookedSeats);
    const reservedSeats = [];
    bookedSeats.forEach(({ row, index }) => {
      train.seatLayout[row].seats[index].isBooked = true;
      reservedSeats.push(train.seatLayout[row].seats[index]);
    });

    console.log(bookedSeats);

    await train.save({ session });
    await session.commitTransaction();
    session.endSession();
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

exports.handleReset = async (req, res) => {
  try {
    const train = await Train.findOne({ trainId: req.params.trainId });
    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }
    train.seatLayout.forEach((row) => {
      row.seats.forEach((seat) => {
        seat.isBooked = false;
      });
    });

    await train.save();
    res.json(train.seatLayout);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
