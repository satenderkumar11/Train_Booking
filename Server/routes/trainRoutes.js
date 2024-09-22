const express = require("express");
const router = express.Router();
const trainController = require("../controllers/trainController");

router.get("/:trainId/status", trainController.getTrainStatus);
router.post("/:trainId/book", trainController.bookTickets);

module.exports = router;
