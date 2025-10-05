## 🧠 Quizify – Real-Time Interactive Quiz App (MERN + APIs)

A modern MERN-stack quiz platform with secure auth, real-time quiz experience, insightful analytics, and a polished, responsive UI. Built with React on the frontend and Node.js/Express with MongoDB Atlas on the backend, deployed on Vercel.

- **Live Website**: [See Website Live](https://quizify-app-mauve.vercel.app/)
- **Contact**: pramodkr02.info@gmail.com

---

## 📘 Overview

Quizify helps learners and educators run interactive quizzes with instant feedback. It streamlines practice and assessment with accuracy, timing, and performance history, presented in a clean, responsive dashboard.

---

## 📸 Screenshots

- Home – [Image](https://drive.google.com/file/d/1lLJZBUx0yQX2QLUMX0hQu9mwwbxQa7-F/view?usp=sharing)
- Login – [Image](https://drive.google.com/file/d/1vfRffKY08FSVWTGk-8EdirGHKJ81xYv0/view?usp=sharing)
- Quiz Page – [Image](https://drive.google.com/file/d/18E9Fqitnmy04Pv0AL26ZN6aAjX7VkUuY/view?usp=sharing)
- Dashboard – [Image](https://drive.google.com/file/d/1NtRlt_F4etklgzqdMFnB1F2ELCkNWg1l/view?usp=sharing)
- Submitted Page – [Image](https://drive.google.com/file/d/11JFfCL5bF8Q38erbZigmDaSekqh607vp/view?usp=sharing)
- Profile Page – [Image](https://drive.google.com/file/d/1ERdpqqx8piPZPHSWaJwkxr0BPcO3ogNy/view?usp=sharing)

---

## 🚀 Features

- **Authentication**: Secure login/signup (JWT) with protected routes
- **Real-time quiz flow**: Timers, navigation, mark-for-review, persistence
- **Question–Answer comparison**: Latest quiz answers vs correct answers
- **Dashboard analytics**: Score, accuracy, attempted, time-spent, summaries
- **Performance history**: Historical results with visual progress
- **Toaster notifications**: Success/error feedback with react-hot-toast
- **Responsive UI/UX**: Built with MUI + Tailwind, optimized for all devices
- **API-driven**: REST endpoints for users, quizzes, analytics

---

## 🧰 Tech Stack

- **Frontend**: React (Vite), React Router, MUI, Tailwind CSS, Axios, react-hot-toast
- **Backend**: Node.js, Express
- **Database**: MongoDB Atlas (Mongoose)
- **Auth**: JWT, bcryptjs
- **Deployment**: Vercel (serverless-friendly Express export)
- **Tooling**: ESLint, Nodemon, dotenv

---

## ⚙️ Installation & Setup

### 1) Clone the repository

```bash
git clone https://github.com/Pramodkr02/Quizify.git
cd Quizify
```

### 2) Install dependencies

- Frontend

```bash
cd Client
npm install
```

- Backend

```bash
cd ../Server
npm install
```

### 3) Environment variables

Create a `.env` file inside `Server/` with the following variables:

```bash
# Server/.env
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority
# or MONGODB_URI (Server supports either)
```

Optionally, add a `.env` in `Client/` if you keep configurable client envs:

```bash
# Client/.env
VITE_API_BASE=http://localhost:5000
```

### 4) Run the development servers

Open two terminals (or panes):

- Frontend (Vite, default port 5173)

```bash
cd Client
npm run dev
```

- Backend (Express, default port 5000)

```bash
cd Server
npm run dev
```

The frontend expects the API at `http://localhost:5000` (adjust `CLIENT_URL`/CORS and `VITE_API_BASE` if needed).

---

## 🧪 Usage

1. Open `http://localhost:5173`.
2. Register or log in.
3. Start a quiz: answer, navigate, mark for review; timer tracks progress.
4. Submit to view results with score, accuracy, and Q–A comparison.
5. Visit the dashboard to see detailed performance and history.

---

## 🔌 API Endpoints (Summary)

Base URL (local): `http://localhost:5000/api`

**User** (`/api/user`)

- POST `/register` – Register user
- POST `/login` – Login and receive token
- GET `/logout` – Logout (auth)
- GET `/user-details` – Fetch user info (auth)

**Quiz** (`/api/quiz` – all auth-protected)

- POST `/submit` – Submit quiz results
- GET `/performance` – Get performance reports
- GET `/performance/:reportId` – Detailed performance
- GET `/dashboard` – Dashboard data
- POST `/report/:reportId` – Generate performance report

Attach the JWT in `Authorization: Bearer <token>`.

---

## ☁️ Deployment

- Live: https://quizify-app-mauve.vercel.app/
- Backend uses an Express app exported for serverless compatibility.
- Set environment variables in Vercel:
  - `MONGO_URI` (or `MONGODB_URI`)
  - `JWT_SECRET`
  - `CLIENT_URL` (frontend URL)
- Update the frontend `VITE_API_BASE` to your deployed API base.

---

## 🔔 Toaster Notifications

The app uses `react-hot-toast` for accessible, non-blocking feedback:

- Success for login, submissions, updates
- Error for validation/network/API issues

---

## 🗂️ Project Structure

```bash
Quizify/
├─ Client/                  # React frontend (Vite + Tailwind + MUI)
│  ├─ public/
│  └─ src/
│     ├─ Components/
│     ├─ ContextAPI/
│     ├─ Pages/
│     ├─ Utils/
│     ├─ App.jsx
│     └─ main.jsx
└─ Server/                  # Node/Express backend (serverless-friendly)
   └─ src/
      ├─ config/
      ├─ controllers/
      ├─ middleware/
      ├─ models/
      ├─ routes/
      ├─ utils/
      └─ server.js
```

---
