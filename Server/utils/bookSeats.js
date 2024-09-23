exports.bookSeats = (seatLayout, seatsRequired) => {
  const bookedSeats = [];

  // Try to book in a single row
  for (let i = 0; i < seatLayout.length; i++) {
    const row = seatLayout[i].seats;
    const availableInRow = [];

    // Collect available seat objects with index and number
    row.forEach((seat, index) => {
      if (!seat.isBooked) availableInRow.push({ index, number: seat.number });
    });

    // If we have enough seats in the row, book them
    if (availableInRow.length >= seatsRequired) {
      // Find the contiguous group of seats that are closest to each other based on `number`
      let closestGroup = [];
      for (
        let start = 0;
        start <= availableInRow.length - seatsRequired;
        start++
      ) {
        const currentGroup = availableInRow.slice(start, start + seatsRequired);

        // Calculate distance using seat numbers
        const distance =
          currentGroup[seatsRequired - 1].number - currentGroup[0].number;

        // Check if this group is closer together than the previous closest
        if (
          closestGroup.length === 0 ||
          distance <
            closestGroup[seatsRequired - 1].number - closestGroup[0].number
        ) {
          closestGroup = currentGroup;
        }
      }

      // Add the closest group to bookedSeats
      closestGroup.forEach((seat) => {
        bookedSeats.push({
          row: i,
          index: seat.index,
          number: seat.number,
        });
      });
      return bookedSeats;
    }
  }

  // If no single row had enough seats, find seats across multiple rows
  let allAvailableSeats = [];
  for (let i = 0; i < seatLayout.length; i++) {
    const row = seatLayout[i].seats;
    row.forEach((seat, index) => {
      if (!seat.isBooked) {
        allAvailableSeats.push({ row: i, index, number: seat.number });
      }
    });
  }

  // Sort all available seats by `number`
  allAvailableSeats.sort((a, b) => a.number - b.number);

  // Select the closest group of required seats
  for (
    let start = 0;
    start <= allAvailableSeats.length - seatsRequired;
    start++
  ) {
    const currentGroup = allAvailableSeats.slice(start, start + seatsRequired);
    const distance =
      currentGroup[seatsRequired - 1].number - currentGroup[0].number;

    if (
      bookedSeats.length === 0 ||
      distance < bookedSeats[seatsRequired - 1].number - bookedSeats[0].number
    ) {
      bookedSeats.length = 0; // Clear previous selections
      bookedSeats.push(...currentGroup);
    }
  }

  return bookedSeats;
};
