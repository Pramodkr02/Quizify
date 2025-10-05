import express from "express";
import {
  submitQuizController,
  getUserPerformanceController,
  getDetailedPerformanceController,
  getDashboardDataController,
  generatePerformanceReportController,
} from "../controllers/quizController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// All quiz routes require authentication
router.use(auth);

// Submit quiz results
router.post("/submit", submitQuizController);

// Get user's performance reports
router.get("/performance", getUserPerformanceController);

// Get detailed performance report
router.get("/performance/:reportId", getDetailedPerformanceController);

// Get dashboard data
router.get("/dashboard", getDashboardDataController);

// Generate performance report
router.post("/report/:reportId", generatePerformanceReportController);

export default router;
