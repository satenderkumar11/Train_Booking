const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  number: Number,
  isBooked: { type: Boolean, default: false },
});

const rowSchema = new mongoose.Schema({
  seats: [seatSchema],
});

const trainSchema = new mongoose.Schema({
  trainId: { type: String, unique: true },
  seatLayout: [rowSchema],
});

module.exports = mongoose.model("Train", trainSchema);
