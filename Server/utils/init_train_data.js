async function initializeTrainData() {
  const existingTrain = await Train.findOne({ trainId: "001" });
  if (!existingTrain) {
    const seatLayout = [];
    let seatNumber = 1;
    for (let i = 0; i < 12; i++) {
      const row = { seats: [] };
      const seatsInRow = i === 11 ? 3 : 7; // Last row has 3 seats, others have 7
      for (let j = 0; j < seatsInRow; j++) {
        row.seats.push({ number: seatNumber++, isBooked: false });
      }
      seatLayout.push(row);
    }
    await Train.create({ trainId: "001", seatLayout });
    console.log("Train data initialized");
  }
}

initializeTrainData();
