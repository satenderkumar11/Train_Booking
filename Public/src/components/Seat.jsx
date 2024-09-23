// src/components/Seat.js
import React from "react";

const Seat = ({ seat, onSeatClick }) => {
  return (
    <div
      key={seat.number}
      onClick={() => !seat.isBooked && onSeatClick(seat.seatNumber)}
      className={` w-8 h-6 mx-1 sm:w-10 sm:m-1 flex items-center justify-center rounded-lg text-sm font-bold 
        ${seat.isBooked ? "bg-red-400 text-white" : "bg-gray-300 text-gray-600"}
        ${!seat.isBooked && "hover:bg-gray-400 cursor-pointer"}
      `}
    >
      {seat.number}
    </div>
  );
};

export default Seat;
