// src/components/SeatMap.js
import React from "react";
import SeatRow from "./SeatRow";

const SeatMap = ({ seats, onSeatClick }) => {
  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
      {seats.map((row, rowIndex) => (
        <SeatRow key={rowIndex} row={row.seats} onSeatClick={onSeatClick} />
      ))}
    </div>
  );
};

export default SeatMap;
