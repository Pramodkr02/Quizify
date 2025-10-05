import PerformanceReportModel from "../models/PerformanceReport.js";
import UserModel from "../models/user.model.js";

// Submit quiz results
export async function submitQuizController(req, res) {
  try {
    const userId = req.userId; // from auth middleware
    const {
      quizId,
      totalMarks,
      userMarks,
      attemptedQuestions,
      notVisited,
      markedForReview,
      timeSpent,
    } = req.body;

    // Validate numeric inputs
    const safeTotal = Number(totalMarks) || 0;
    const safeCorrect = Number(userMarks) || 0;
    const safeAttempted = Number(attemptedQuestions) || 0;
    const safeNotVisited =
      Number(notVisited) || Math.max(safeTotal - safeAttempted, 0);
    const safeMarked = Number(markedForReview) || 0;
    const safeTimeSpent = Number(timeSpent) || 0;

    // Calculate derived metrics
    const accuracy =
      safeTotal > 0 ? Math.round((safeCorrect / safeTotal) * 100) : 0;
    const averageTimePerQuestion =
      safeAttempted > 0 ? Math.round(safeTimeSpent / safeAttempted) : 0;

    // Generate summary
    const summary = `Scored ${safeCorrect}/${safeTotal} (${accuracy}%) in ${Math.floor(
      safeTimeSpent / 60
    )} minutes. Attempted ${safeAttempted} questions.`;

    // Create performance report
    const performanceReport = new PerformanceReportModel({
      userId,
      quizId,
      totalMarks: safeTotal,
      userMarks: safeCorrect,
      attemptedQuestions: safeAttempted,
      notVisited: safeNotVisited,
      markedForReview: safeMarked,
      timeSpent: safeTimeSpent,
      accuracy,
      averageTimePerQuestion,
      summary,
    });

    await performanceReport.save();

    // Update user's scores array
    await UserModel.findByIdAndUpdate(userId, {
      $push: {
        scores: {
          quizId,
          score: userMarks,
          date: new Date(),
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: "Quiz results saved successfully",
      data: {
        reportId: performanceReport._id,
        score: safeCorrect,
        totalMarks: safeTotal,
        accuracy,
        averageTimePerQuestion,
      },
    });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to save quiz results",
      error: error.message,
    });
  }
}

// Get user's performance reports
export async function getUserPerformanceController(req, res) {
  try {
    const userId = req.userId;
    const { page = 1, limit = 10 } = req.query;

    const reports = await PerformanceReportModel.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select("-__v");

    const total = await PerformanceReportModel.countDocuments({ userId });

    return res.status(200).json({
      success: true,
      data: {
        reports,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total,
      },
    });
  } catch (error) {
    console.error("Error fetching performance reports:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch performance reports",
      error: error.message,
    });
  }
}

// Get detailed performance report
export async function getDetailedPerformanceController(req, res) {
  try {
    const userId = req.userId;
    const { reportId } = req.params;

    const report = await PerformanceReportModel.findOne({
      _id: reportId,
      userId,
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Performance report not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    console.error("Error fetching detailed performance:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch detailed performance",
      error: error.message,
    });
  }
}

// Get user's dashboard data
export async function getDashboardDataController(req, res) {
  try {
    const userId = req.userId;

    // Get recent performance reports
    const recentReports = await PerformanceReportModel.find({ userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("-questions");

    // Calculate overall statistics
    const allReports = await PerformanceReportModel.find({ userId });

    const totalQuizzes = allReports.length;
    const totalQuestions = allReports.reduce(
      (sum, report) => sum + report.totalMarks,
      0
    );
    const totalCorrect = allReports.reduce(
      (sum, report) => sum + report.userMarks,
      0
    );
    const averageScore =
      totalQuizzes > 0 ? Math.round(totalCorrect / totalQuizzes) : 0; // average raw score per quiz
    const bestScore =
      allReports.length > 0
        ? Math.max(...allReports.map((r) => r.accuracy))
        : 0;
    const totalTimeSpent = allReports.reduce(
      (sum, report) => sum + report.timeSpent,
      0
    );

    // Get latest quiz details
    const latestQuiz = await PerformanceReportModel.findOne({ userId })
      .sort({ createdAt: -1 })
      .select("-__v");

    return res.status(200).json({
      success: true,
      data: {
        totalQuizzes,
        totalQuestions,
        totalCorrect,
        averageScore,
        bestScore,
        totalTimeSpent,
        recentReports,
        latestQuiz,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard data",
      error: error.message,
    });
  }
}

// Generate performance report (PDF)
export async function generatePerformanceReportController(req, res) {
  try {
    const userId = req.userId;
    const { reportId } = req.params;

    const report = await PerformanceReportModel.findOne({
      _id: reportId,
      userId,
    });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Performance report not found",
      });
    }

    // In a real implementation, you would generate a PDF here
    // For now, we'll return the report data that can be used to generate a PDF on the frontend
    return res.status(200).json({
      success: true,
      message: "Performance report generated successfully",
      data: {
        reportId: report._id,
        score: report.userMarks,
        totalMarks: report.totalMarks,
        percentage: report.percentage,
        timeSpent: report.timeSpent,
        summary: report.summary,
        createdAt: report.createdAt,
      },
    });
  } catch (error) {
    console.error("Error generating performance report:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate performance report",
      error: error.message,
    });
  }
}
