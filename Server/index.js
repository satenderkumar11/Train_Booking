require("dotenv").config();
require("./utils/init_mongoDB");

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const trainRoutes = require("./routes/trainRoutes");
const Train = require("./models/train");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    // origin: "https://train-booking-omega.vercel.app/",
    origin: true,
  })
);

// async function initializeTrainData() {
//   const existingTrain = await Train.findOne({ trainId: "001" });
//   if (!existingTrain) {
//     const seatLayout = [];
//     let seatNumber = 1;
//     for (let i = 0; i < 12; i++) {
//       const row = { seats: [] };
//       const seatsInRow = i === 11 ? 3 : 7; // Last row has 3 seats, others have 7
//       for (let j = 0; j < seatsInRow; j++) {
//         row.seats.push({ number: seatNumber++, isBooked: false });
//       }
//       seatLayout.push(row);
//     }
//     await Train.create({ trainId: "001", seatLayout });
//     console.log("Train data initialized");
//   }
// }

// initializeTrainData();

app.use("/api/train", trainRoutes);

app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT}`);
});
