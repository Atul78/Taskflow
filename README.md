# TaskFlow — Task Management Web Application

A full-stack task management application built with **React.js**, **Node.js + Express.js**, and **MongoDB**.

---

## Project Structure

```
taskflow/
├── backend/                  # Node.js + Express API
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js # Signup, login, getMe
│   │   └── taskController.js # CRUD + toggle
│   ├── middleware/
│   │   ├── auth.js           # JWT protect middleware
│   │   └── errorHandler.js   # Global error handler
│   ├── models/
│   │   ├── User.js           # User schema
│   │   └── Task.js           # Task schema
│   ├── routes/
│   │   ├── authRoutes.js     # /api/auth/*
│   │   └── taskRoutes.js     # /api/tasks/*
│   ├── .env.example
│   ├── package.json
│   └── server.js             # Entry point
│
├── frontend/                 # React application
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/         # (reserved for future components)
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.js
│   │   │   │   └── ProtectedRoute.js
│   │   │   ├── tasks/
│   │   │   │   ├── TaskCard.js
│   │   │   │   └── TaskModal.js
│   │   │   └── ui/
│   │   │       ├── Button.js
│   │   │       └── Input.js
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── TaskContext.js
│   │   ├── hooks/
│   │   │   └── useForm.js    # Reusable form + validation hook
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── LoginPage.js
│   │   │   │   └── SignupPage.js
│   │   │   └── dashboard/
│   │   │       └── DashboardPage.js
│   │   ├── utils/
│   │   │   └── api.js        # Axios instance with interceptors
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css         # Global styles + CSS variables
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Prerequisites

- **Node.js** v18+
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **npm** v9+

---

## Setup & Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd taskflow
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create the environment file:

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

Start the backend server:

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

> The API will be available at `http://localhost:5000`

---

### 3. Frontend Setup

Open a **new terminal**:

```bash
cd frontend
npm install
```

Create the environment file:

```bash
cp .env.example .env
```

Edit `.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend dev server:

```bash
npm start
```

> The app will open at `http://localhost:3000`

---

## API Reference

### Auth Routes

| Method | Endpoint          | Access  | Description          |
|--------|-------------------|---------|----------------------|
| POST   | /api/auth/signup  | Public  | Register new user    |
| POST   | /api/auth/login   | Public  | Login user           |
| GET    | /api/auth/me      | Private | Get current user     |

### Task Routes (all protected via JWT)

| Method | Endpoint               | Description                        |
|--------|------------------------|------------------------------------|
| GET    | /api/tasks             | Get all tasks (supports ?status=)  |
| POST   | /api/tasks             | Create a new task                  |
| GET    | /api/tasks/:id         | Get task by ID                     |
| PUT    | /api/tasks/:id         | Update task                        |
| DELETE | /api/tasks/:id         | Delete task                        |
| PATCH  | /api/tasks/:id/toggle  | Toggle pending ↔ completed         |

**Authentication:** Pass JWT in the `Authorization` header:
```
Authorization: Bearer <token>
```

---

## Features

### Frontend
- User signup and login with form validation
- Protected dashboard — redirects unauthenticated users to login
- Create, edit, and delete tasks via modal
- Toggle task status (Pending / Completed) with one click
- Filter tasks: All / Pending / Completed
- Stats bar showing totals and a progress bar
- Responsive grid layout for all screen sizes
- Toast notifications for all actions
- Context API for global auth and task state
- Axios interceptors for automatic token attachment and 401 handling

### Backend
- JWT-based authentication (signup/login/protected routes)
- RESTful CRUD API for tasks
- Task ownership — users can only access their own tasks
- Input validation via `express-validator`
- Centralised error handling middleware
- MongoDB indexes for query performance

---

## Deployment Notes

### Backend (e.g., Render / Railway)
1. Set environment variables: `MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`, `CLIENT_URL=<frontend-url>`
2. Set start command: `npm start`

### Frontend (e.g., Vercel / Netlify)
1. Set `REACT_APP_API_URL=https://<your-backend-url>/api`
2. Build command: `npm run build`
3. Publish directory: `build`

---

## Tech Stack

| Layer     | Technology                     |
|-----------|--------------------------------|
| Frontend  | React 18, React Router 6, Context API, CSS Modules |
| Backend   | Node.js, Express.js            |
| Database  | MongoDB + Mongoose             |
| Auth      | JWT + bcryptjs                 |
| Validation| express-validator (BE), custom hooks (FE) |
| HTTP      | Axios                          |
| Notifications | react-hot-toast            |
