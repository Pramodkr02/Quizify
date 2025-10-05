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
app.use(
  cors({
    origin: process.env.CLIENT_URL, // set to frontend URL in Vercel
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
