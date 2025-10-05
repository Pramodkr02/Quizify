import mongoose from "mongoose";

const performanceReportSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quizId: {
      type: String,
      required: true,
    },
    totalMarks: {
      type: Number,
      required: true,
    },
    userMarks: {
      type: Number,
      required: true,
    },
    attemptedQuestions: {
      type: Number,
      required: true,
    },
    notVisited: {
      type: Number,
      required: true,
    },
    markedForReview: {
      type: Number,
      required: true,
    },
    timeSpent: {
      type: Number, // in seconds
      required: true,
    },
    accuracy: {
      type: Number, // 0-100
      required: true,
    },
    averageTimePerQuestion: {
      type: Number, // in seconds
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const PerformanceReportModel = mongoose.model(
  "PerformanceReport",
  performanceReportSchema
);

export default PerformanceReportModel;
