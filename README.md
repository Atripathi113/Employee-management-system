# Employee Management System (EMS)

A full-stack web application for managing employees, attendance, leaves, salary, and departments — built with the MERN stack.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Overview](#api-overview)

---

## About the Project

EMS is a role-based employee management system designed for organizations to manage their workforce efficiently. It provides separate dashboards for **Admins** and **Employees**, with each role having access to different features and data.

---

## Features

### Admin
- Secure login with JWT authentication
- Dashboard with summary cards (total employees, departments, leaves)
- Add, view, edit, and delete employees
- Manage departments (add, edit, delete)
- View and manage attendance records with date filtering and pagination
- View and manage leave requests (approve/reject)
- Add and view salary records per employee

### Employee
- Secure login with JWT authentication
- Personal dashboard
- View own profile
- Apply for leave
- View own salary details
- Update account settings (password change)

---

## Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Axios
- Tailwind CSS
- React Data Table Component
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT)
- Bcrypt (password hashing)
- Nodemon (development)
- Multer (file uploads)

---

## Project Structure

```
Project/
├── frontend/               # React frontend (Vite)
│   ├── src/
│   │   ├── components/     # All UI components
│   │   │   ├── attendance/
│   │   │   ├── dashboard/
│   │   │   ├── department/
│   │   │   ├── employee/
│   │   │   ├── EmployeeDashboard/
│   │   │   ├── leave/
│   │   │   └── salary/
│   │   ├── context/        # Auth context (global state)
│   │   ├── Pages/          # Page-level components (Login etc.)
│   │   ├── utilities/      # Helper functions and API config
│   │   └── constants/      # App-wide constants
│   ├── .env.example
│   ├── vite.config.js
│   └── package.json
│
└── Server/                 # Node.js backend
    ├── controllers/        # Route handler logic
    ├── models/             # Mongoose schemas
    ├── routes/             # Express routes
    ├── middleware/         # Auth middleware
    ├── utils/              # Utility functions and constants
    ├── .env.example
    └── index.js
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or above)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- npm

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

2. **Install backend dependencies**

```bash
cd Server
npm install
```

3. **Install frontend dependencies**

```bash
cd ../frontend
npm install
```

4. **Set up environment variables** (see below)

5. **Run the backend**

```bash
cd Server
npm start
```

6. **Run the frontend**

```bash
cd frontend
npm run dev
```

7. Open your browser and go to `http://localhost:5173`

---

## Environment Variables

Create a `.env` file in both `Server/` and `frontend/` directories based on the `.env.example` files provided.

### `Server/.env`

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

### `frontend/.env`

```
VITE_API_URL=http://localhost:5000
```

> Never commit your `.env` files. They are listed in `.gitignore`.

---

## Available Scripts

### Backend (`Server/`)

| Command | Description |
|---|---|
| `npm start` | Starts the server with nodemon |

### Frontend (`frontend/`)

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Builds the app for production |
| `npm run preview` | Previews the production build locally |

---

## API Overview

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/login` | Login for admin and employee | No |
| GET | `/api/auth/verify-user` | Verify JWT token | Yes |
| GET | `/api/employee` | Get all employees | Yes (Admin) |
| POST | `/api/employee/add` | Add new employee | Yes (Admin) |
| GET | `/api/employee/:id` | Get employee by ID | Yes |
| PUT | `/api/employee/:id` | Update employee | Yes (Admin) |
| DELETE | `/api/employee/:id` | Delete employee | Yes (Admin) |
| GET | `/api/department` | Get all departments | Yes |
| POST | `/api/department/add` | Add department | Yes (Admin) |
| GET | `/api/attendance/report` | Get attendance report | Yes (Admin) |
| GET | `/api/leave` | Get all leave requests | Yes |
| POST | `/api/leave/add` | Apply for leave | Yes (Employee) |
| PUT | `/api/leave/:id` | Approve or reject leave | Yes (Admin) |
| GET | `/api/salary/:id` | Get salary by employee | Yes |
| POST | `/api/salary/add` | Add salary record | Yes (Admin) |

---

## Author

GitHub: [@Atripathi113](https://github.com/Atripathi113)