# Train Seat Reservation System

## Overview
This project is a web-based application for managing train seat reservations. Users can view seat availability, reserve seats, and reset reservations. The application features a user-friendly interface built with React on the front end and a Node.js/Express backend connected to a MongoDB database.

## Features
- **View Seat Layout**: Display the current seat layout for a specific train.
- **Reserve Seats**: Allow users to book a specified number of seats (1 to 7).
- **Reset Reservations**: Admin can reset the seat layout to make all seats available.
- **Responsive Design**: Works on various devices with a clean, intuitive UI.

## Technologies Used
- **Frontend**: React, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose
- **Additional Libraries**: Axios for API requests, React Router for navigation

## Live Project
Check out the live project [here](https://train-booking-omega.vercel.app/).

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)

### Installation
1. **Clone the repository**:
   
   ```bash
   git clone https://github.com/yourusername/train-seat-reservation.git
   cd Train_Booking

2. **Install dependencies:**
- **For the backend:**
    ```bash
    cd Server
    npm install

- **For the frontend:**
    
    ```bash
    cd Public
    npm install
  

- **Start the backend server:**
    ```bash
    cd Server
    npm run start

- **Start the frontend development server:**
    
    ```bash
    cd Public
    npm run dev
Open your browser and navigate to http://localhost:5173 (or the specified port) to view the application.

### API Endpoints
- GET /api/train/:trainId/status: Get the current seat layout for the specified train.
- POST /api/train/:trainId/book: Reserve seats for the specified train.
- POST /api/train/:trainId/reset: Reset all seat reservations for the specified train.
