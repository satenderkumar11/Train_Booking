const Train = require("../models/train");
const mongoose = require("mongoose");

exports.getTrainStatus = async (req, res) => {
  try {
    const train = await Train.findOne({ trainId: req.params.trainId });
    if (!train) {
      return res.status(404).json({ message: "Train not found" });
    }
    res.json(train.seatLayout);
  } catch (error) {
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
    const reservedSeats = [];
    bookedSeats.forEach(({ row, seat }) => {
      train.seatLayout[row].seats[seat].isBooked = true;
      reservedSeats.push(train.seatLayout[row].seats[seat]);
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
  }
};

function bookSeats(seatLayout, seatsRequired) {
  const bookedSeats = [];

  // Try to book in a single row
  for (let i = 0; i < seatLayout.length; i++) {
    const row = seatLayout[i].seats;
    const availableInRow = [];
    row.forEach((seat, index) => {if(!seat.isBooked)availableInRow.push(index);});

    console.log(availableInRow);
    if (availableInRow.length >= seatsRequired) {
      for (let j = 0; j < seatsRequired; j++) {
        const seatIndex = availableInRow[j];
        bookedSeats.push({
          row: i,
          seat: seatIndex,
          number: row[seatIndex].number,
        });
      }
      return bookedSeats;
    }
  }

  // If not possible in a single row, book nearby seats
  let remainingSeats = seatsRequired;
  for (let i = 0; i < seatLayout.length && remainingSeats > 0; i++) {
    const row = seatLayout[i].seats;
    for (let j = 0; j < row.length && remainingSeats > 0; j++) {
      if (!row[j].isBooked) {
        bookedSeats.push({ row: i, seat: j, number: row[j].number });
        remainingSeats--;
      }
    }
  }

  return remainingSeats === 0 ? bookedSeats : [];
}
