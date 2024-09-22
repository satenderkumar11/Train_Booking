// src/components/SeatRow.js
import React from "react";
import Seat from "./Seat";

const SeatRow = ({ row, onSeatClick }) => {
  return (
    <div className="flex justify-center mb-2">
      {row.map((seat) => (
        <Seat key={seat.number} seat={seat} onSeatClick={onSeatClick} />
      ))}
    </div>
  );
};

export default SeatRow;
