# 🧠 Quizify – Real-Time Interactive Quiz Web App

A modern MERN-stack application for creating and taking quizzes with real-time tracking, secure authentication, and insightful performance analytics — all wrapped in a responsive, delightful UI.

---

## 📘 Project Overview

Quizify helps learners and educators run interactive quizzes with instant feedback. It was built to streamline practice and assessment, making insights like accuracy, time-spent, and historical performance easily accessible. The app supports real quiz tracking, live analytics, and mobile-first responsive design for a smooth experience on any device.

---

## 🚀 Features

- **Real-time quiz tracking**: Monitor progress and state seamlessly during sessions
- **Live performance analytics**: Score, accuracy, per-question timing, and summaries
- **Responsive UI**: Optimized for mobile, tablet, and desktop
- **Secure authentication**: JWT-based login/register with protected routes
- **Personal dashboard**: Session history, profile details, and quiz insights
- **Quiz persistence**: Resume where you left off
- **Robust API**: Clean RESTful endpoints for quizzes, results, and users

---

## 🧰 Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS, MUI, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT, bcryptjs
- **Other**: RESTful APIs, (optional) WebSockets for live updates

---

## ⚙️ Installation & Setup

### 1) Clone the repository

```bash
git clone https://github.com/pramodkr02/Quizify.git
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
JWT_SECRET=your_jwt_secret_here
PORT=5000
CLIENT_URL=http://localhost:5173
```

Optionally, add a `.env` in `Client/` if you keep configurable client envs (e.g., API base):

```bash
# Client/.env
VITE_API_BASE=http://localhost:5000
```

### 4) Run the development servers

Open two terminals (or panes):

- Frontend (Vite, default port 5173)

```bash
cd Client && npm run dev
```

- Backend (Express, default port 5000)

```bash
cd Server && npm run dev
```

The frontend expects the API at `http://localhost:5000` (adjust `CLIENT_URL`/CORS and `VITE_API_BASE` if needed).

---

## 📸 Screenshots or Demo

![Dashboard Screenshot](./screenshots/dashboard.png)
![Quiz Flow Screenshot](./screenshots/quiz-flow.png)

> Replace these placeholders with actual app images from your running instance.

---

## 📊 Project Structure

```bash
Quizify/
├─ Client/                # React frontend (Vite + Tailwind + MUI)
│  ├─ public/
│  └─ src/
│     ├─ Components/
│     ├─ ContextAPI/
│     ├─ Pages/
│     ├─ Utils/
│     ├─ App.jsx
│     └─ main.jsx
├─ Server/                # Node/Express backend
│  └─ src/
│     ├─ config/
│     ├─ controllers/
│     ├─ middleware/
│     ├─ models/
│     ├─ routes/
│     ├─ utils/
│     └─ server.js
└─ README.md
```

---

## 📈 Features in Future

- **Leaderboards**: Global and friend-based rankings
- **AI question generator**: Create tailored quizzes from topics/resources
- **Quiz sharing**: Public links and collaboration modes

---

## 👨‍💻 Author

**Pramod Kumar** — Software Development Engineer (MERN & GenAI)

- GitHub: https://github.com/<your-username>
- LinkedIn: https://www.linkedin.com/in/<your-linkedin>
