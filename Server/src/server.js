import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import quizRoutes from "./routes/quizRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

// Connect MongoDB only once in serverless
await connectDB();

// Middleware
// Strict CORS allowlist without trailing slashes
const allowedOrigins = [
  (process.env.CLIENT_URL || "").replace(/\/$/, ""),
  "http://localhost:5173",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // non-browser or same-origin
      const normalized = origin.replace(/\/$/, "");
      if (allowedOrigins.includes(normalized)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Server running successfully");
});

app.use("/api/quiz", quizRoutes);
app.use("/api/user", userRoutes);

export default app; // Export app for Vercel
