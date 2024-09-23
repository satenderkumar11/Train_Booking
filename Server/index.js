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
    origin: [
      "https://train-booking-satender-kumars-projects-6ee3bd3d.vercel.app",
      "https://train-booking-omega.vercel.app",
    ],
    // origin: true,
  })
);

app.use("/api/train", trainRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
