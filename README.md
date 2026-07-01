# Student Study Planner - MERN Stack Project

A comprehensive web application to help students organize their studies, manage tasks, and track their progress. Built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS.

## Features

**Student Features:**
- Secure User Authentication (JWT + bcrypt)
- Dashboard with progress overview
- Create, Read, Update, Delete Study Plans
- Add specific subjects and deadlines to plans
- Task Management: Create daily/weekly tasks linked to study plans
- Mark tasks as complete and track pending tasks
- Profile page to view user details

**Admin Features:**
- Admin Dashboard
- View all registered users
- Delete user accounts
- View all study plans created across the platform

**General UI/UX:**
- Clean, modern, and responsive interface using Tailwind CSS
- Protected routes based on user roles
- Loading states and robust error handling

## Tech Stack

- **Frontend**: React.js, React Router, Context API, Tailwind CSS, Axios, Lucide React (Icons)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: JSON Web Tokens (JWT), bcrypt

## Folder Structure

```
blessy/
├── backend/
│   ├── config/          # Database connection
│   ├── controllers/     # Route logic
│   ├── middleware/      # Auth & Role verification
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express API routes
│   ├── server.js        # Entry point
│   ├── package.json
│   └── .env             # Environment variables
└── frontend/
    ├── src/
    │   ├── assets/
    │   ├── components/  # Reusable UI components
    │   ├── context/     # Auth Context
    │   ├── pages/       # Route pages
    │   ├── services/    # Axios API config
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css    # Tailwind entry
    ├── tailwind.config.js
    ├── vite.config.js
    └── package.json
```

## Setup Instructions

### 1. Prerequisites
- Node.js installed
- MongoDB installed locally or a MongoDB Atlas URI

### 2. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Environment variables are already provided in `backend/.env`. If you are using MongoDB Atlas, update `MONGO_URI` in `.env`:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/studyplanner
   JWT_SECRET=supersecretkey12345
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user and get token

### Users
- `GET /api/users/profile` - Get logged-in user details
- `GET /api/users` - Get all users (Admin only)
- `DELETE /api/users/:id` - Delete user (Admin only)

### Study Plans
- `GET /api/study-plans` - Get all plans (user's plans if student, all if admin)
- `POST /api/study-plans` - Create a plan
- `PUT /api/study-plans/:id` - Update a plan
- `DELETE /api/study-plans/:id` - Delete a plan

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Future Improvements
- Add password reset functionality via email.
- Include a calendar view for tasks and deadlines.
- Add real-time notifications for approaching deadlines.
- Provide advanced analytics/graphs on the dashboard.
