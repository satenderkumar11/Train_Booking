// src/components/ReservationForm.js
import React, { useState } from "react";

const ReservationForm = ({ onReserve, isFetching }) => {
  const [numSeats, setNumSeats] = useState("");

  // Handle form submission for reserving seats
  const handleReserveClick = (event) => {
    event.preventDefault();
    const seatsToReserve = parseInt(numSeats);
    if (isNaN(seatsToReserve) || seatsToReserve < 1 || seatsToReserve > 7) {
      alert("Please enter a number between 1 and 7.");
    } else {
      onReserve(seatsToReserve);
    }
  };

  return (
    <form onSubmit={handleReserveClick} className="mt-6 flex space-x-2">
      {/* Input field to enter the number of seats */}
      <input
        type="number"
        value={numSeats}
        onChange={(e) => setNumSeats(e.target.value)}
        min="1"
        max="7"
        placeholder="Enter seats (1-7)"
        className="px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500 w-48"
      />
      {/* Button to submit the reservation request */}
      <button
        type="submit"
        disabled={isFetching}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Reserve Seats
      </button>
    </form>
  );
};

export default ReservationForm;
