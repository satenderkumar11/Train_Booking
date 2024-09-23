// src/components/SeatMap.js
import React from "react";
import SeatRow from "./SeatRow";

const SeatMap = ({ seats, onSeatClick }) => {
  return (
    <div className="flex flex-col items-center bg-white px-6 py-4 rounded-lg shadow-md">
      <div className="text-neutral-500 font-semibold pb-2">
        {" "}
        Class - Second AC(2A){" "}
      </div>

      {seats.map((row, rowIndex) => (
        <SeatRow key={rowIndex} row={row.seats} onSeatClick={onSeatClick} />
      ))}
    </div>
  );
};

export default SeatMap;
