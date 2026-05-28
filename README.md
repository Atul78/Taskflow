1. # TaskFlow — Task Management Web Application

A full-stack task management application built using React.js, Node.js, Express.js, and MongoDB.

---

## Tech Stack

### Frontend

- React.js
- React Router DOM
- Context API
- CSS Modules
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## Features

- User Authentication (Signup/Login)
- JWT-based protected routes
- Create, update, and delete tasks
- Task status management (Pending / Completed)
- Task filtering
- Responsive UI
- Form validation
- Global state management using Context API
- RESTful API architecture

---

## Project Structure

```bash
taskflow/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│
└── README.md
```

---

## Environment Variables

### Backend

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Frontend

```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Installation & Setup

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

---

## API Endpoints

### Authentication

| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| POST   | /api/auth/signup | Register user    |
| POST   | /api/auth/login  | Login user       |
| GET    | /api/auth/me     | Get current user |

### Tasks

| Method | Endpoint       | Description   |
| ------ | -------------- | ------------- |
| GET    | /api/tasks     | Get all tasks |
| POST   | /api/tasks     | Create task   |
| PUT    | /api/tasks/:id | Update task   |
| DELETE | /api/tasks/:id | Delete task   |

---

## Deployment

### Frontend

- Vercel

### Backend

- Render / Railway

---

## Author

Atul
Associate Software Engineer — MERN Stack
