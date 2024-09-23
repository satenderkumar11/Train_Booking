const mongoose = require("mongoose");

// Schema for individual seat
const seatSchema = new mongoose.Schema({
  number: Number,
  isBooked: { type: Boolean, default: false },
});

// Schema for a row of seats
const rowSchema = new mongoose.Schema({
  seats: [seatSchema],
});

// Schema for a train
const trainSchema = new mongoose.Schema({
  trainId: { type: String, unique: true },
  seatLayout: [rowSchema],
});

module.exports = mongoose.model("Train", trainSchema);
