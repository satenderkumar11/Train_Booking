import React, { useEffect, useRef, useState } from "react";
import SeatMap from "./components/SeatMap";
import SeatMapShimmer from "./components/shimmer/SeatMapShimmer";
import ReservationForm from "./components/ReservationForm";
import "./App.css";

const App = () => {
  // State to store seat layout data
  const [seats, setSeats] = useState([]);

  const [showSeatMapShimmer, setShowSeatMapShimmer] = useState(true);

  const [isFetching, setIsFetching] = useState(false);

  const backend_url = "https://train-booking-v5te.onrender.com/";
  // const backend_url = "http://localhost:3000/";

  // Fetch seat data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch seat status data from the backend
  const fetchData = async () => {
    setIsFetching(true);
    try {
      const response = await fetch(`${backend_url}api/train/001/status`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSeats(data);
      setShowSeatMapShimmer(false);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsFetching(false);
    }
  };

  // Function to reserve a specified number of seats
  const reserveSeats = async (numSeats) => {
    setIsFetching(true);
    try {
      const response = await fetch(`${backend_url}api/train/001/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          seats: numSeats,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(`Error: ${data.message}`);
      } else {
        console.log("Booking successful:", data);
        setSeats(data.seatLayout);
        alert(
          `Seats booked successfully: ${data.bookedSeats
            .map((seat) => seat.number)
            .join(", ")}`
        );
      }
    } catch (error) {
      console.error("Error booking train:", error);
    } finally {
      setIsFetching(false);
    }
  };

  // Function to reset seat reservations to the initial state
  const handleReset = async () => {
    setIsFetching(true);

    try {
      const response = await fetch(`${backend_url}api/train/001/reset`);
      const data = await response.json();
      alert("Successfully reset");
      setSeats(data);
    } catch (error) {
      console.error("Error reset", error);
      alert("Error reset", error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar with title and reset button */}
      <nav className="bg-blue-600 text-white py-4 shadow-md flex">
        <div className="container mx-auto flex ">
          <h1 className="text-2xl pl-4 font-bold">Train Seat Reservation</h1>
        </div>
        <button
          onClick={handleReset}
          disabled={isFetching}
          className="px-8 py-2 mr-2 bg-blue-500 text-white rounded-md hover:bg-blue-800 transition"
        >
          Reset
        </button>
      </nav>
      <div className="text-neutral-600 text-center text-3xl font-bold pt-4">
        {" "}
        Train No. 12425
      </div>
      {/* Main content with seat map and reservation form */}
      <div className="flex flex-col items-center justify-center p-4">
        {showSeatMapShimmer ? <SeatMapShimmer /> : <SeatMap seats={seats} />}
        <ReservationForm onReserve={reserveSeats} isFetching={isFetching} />
      </div>
    </div>
  );
};

export default App;
