// src/App.js
import React, { useEffect, useRef, useState } from "react";
import SeatMap from "./components/SeatMap";
import ReservationForm from "./components/ReservationForm";
import "./App.css";

const App = () => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/train/001/status"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSeats(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const reserveSeats = async (numSeats) => {
    try{

      const response = await fetch("http://localhost:3000/api/train/001/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        seats: numSeats,
      }),
    })

    const data = await response.json();
        if (!response.ok) {
          alert(`Error: ${response.message}`);
        } else {
          console.log("Booking successful:", data);
          setSeats(data.seatLayout);
          alert(
            `Seats booked successfully: ${data.bookedSeats
              .map((seat) => seat.number)
              .join(", ")}`
          );
        }
    }catch(error) {
        console.error("Error booking train:", error);
      };

    // const updatedSeats = [...seats];
    // let seatsToReserve = [];

    // for (let i = 0; i < updatedSeats.length; i++) {
    //   const availableSeatsInRow = updatedSeats[i].filter(
    //     (seat) => !seat.isBooked
    //   );
    //   if (availableSeatsInRow.length >= numSeats) {
    //     seatsToReserve = availableSeatsInRow.slice(0, numSeats);
    //     break;
    //   }
    // }

    // if (seatsToReserve.length === 0) {
    //   for (let i = 0; i < updatedSeats.length; i++) {
    //     for (let seat of updatedSeats[i]) {
    //       if (!seat.isBooked && seatsToReserve.length < numSeats) {
    //         seatsToReserve.push(seat);
    //       }
    //     }
    //     if (seatsToReserve.length === numSeats) break;
    //   }
    // }

    // if (seatsToReserve.length === numSeats) {
    //   seatsToReserve.forEach((seat) => {
    //     for (let row of updatedSeats) {
    //       const seatToUpdate = row.find(
    //         (s) => s.seatNumber === seat.seatNumber
    //       );
    //       if (seatToUpdate) {
    //         seatToUpdate.isBooked = true;
    //         seatToUpdate.bookedByUser = true;
    //       }
    //     }
    //   });

    //   setSeats(updatedSeats);
    //   alert(
    //     `Seats booked successfully: ${seatsToReserve
    //       .map((seat) => seat.seatNumber)
    //       .join(", ")}`
    //   );
    // } else {
    //   alert("Not enough seats available.");
    // }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-center">
          <h1 className="text-2xl font-bold">Train Seat Reservation</h1>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center p-6">
        <SeatMap seats={seats} />
        <ReservationForm onReserve={reserveSeats} />
      </div>
    </div>
  );
};

export default App;
