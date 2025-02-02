# Task Manager

Task Manager is a web application built using the MERN (MongoDB, Express, React, Node.js) stack that allows admins to create tasks and assign them to employees. Employees can view their assigned tasks and mark them as completed.

## Features

- **Admin Features:**
  - Create tasks and assign them to employees using their email addresses (comma-separated).
  - View the list of employees on the dashboard while creating tasks.
  - Delete tasks.
  
- **Employee Features:**
  - View assigned tasks.
  - Mark tasks as completed.

- **Authentication:**
  - JWT-based authentication for security.

## Installation & Setup

### Backend Setup

1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the backend folder and add the following fields:
   ```sh
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm run dev
   ```

## Usage

1. Admin logs in and creates tasks by adding employee email addresses.
2. Employees log in to view their tasks.
3. Employees mark tasks as completed when done.

## Tech Stack

- **Frontend:** React.js, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)

## License

This project is licensed under the MIT License.

