import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../App";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  LinearProgress,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import {
  FaTrophy,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaQuestionCircle,
  FaChartBar,
  FaDownload,
} from "react-icons/fa";
import { MdOutlineRefresh } from "react-icons/md";
import { fetchDashboard } from "../Utils/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const context = useContext(MyContext);
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!context.isLogin) {
      navigate("/login");
      return;
    }

    const loadPerformanceData = async () => {
      setLoading(true);
      try {
        const res = await fetchDashboard();
        if (res?.success) {
          const latest = res.data?.latestQuiz;
          const latestComparisonRaw = sessionStorage.getItem(
            "latest_quiz_comparison"
          );
          const latestComparison = latestComparisonRaw
            ? JSON.parse(latestComparisonRaw)
            : null;

          setPerformanceData({
            totalMarks: latest?.totalMarks || 0,
            userMarks: latest?.userMarks || 0,
            attemptedQuestions: latest?.attemptedQuestions || 0,
            notVisited: latest?.notVisited || 0,
            markedForReview: latest?.markedForReview || 0,
            timeSpent: latest?.timeSpent || 0,
            percentage: latest?.accuracy || 0,
            recentQuiz: {
              date: latest?.createdAt,
              score: latest?.userMarks || 0,
              total: latest?.totalMarks || 0,
              timeSpent: latest?.timeSpent || 0,
              answers: latestComparison?.answers || [],
            },
            pastPerformances: (res.data?.recentReports || []).map((r) => ({
              date: r.createdAt,
              score: r.userMarks,
              total: r.totalMarks,
              percentage: r.accuracy,
              timeSpent: r.timeSpent,
            })),
          });
        } else {
          setPerformanceData(null);
        }
      } catch (e) {
        console.error(e);
        setPerformanceData(null);
      } finally {
        setLoading(false);
      }
    };

    loadPerformanceData();
  }, [context.isLogin, navigate]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const generateReport = () => {
    // In a real app, this would generate and download a PDF report
    console.log("Generating performance report...");
    alert(
      "Performance report generated! (This would download a PDF in a real app)"
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Loading Dashboard...
          </h2>
          <p className="text-gray-600">Fetching your performance data</p>
        </div>
      </div>
    );
  }

  if (!performanceData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            No Performance Data Available
          </h2>
          <p className="text-gray-600 mb-6">
            Complete a quiz to see your performance analytics.
          </p>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/quiz-api")}
            startIcon={<FaChartBar />}
          >
            Start Your First Quiz
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <Typography variant="h4" className="font-bold text-gray-800 mb-2">
                Performance Dashboard
              </Typography>
              <Typography variant="body1" className="text-gray-600">
                Track your quiz performance and progress
              </Typography>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outlined"
                startIcon={<MdOutlineRefresh />}
                onClick={() => window.location.reload()}
              >
                Refresh
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<FaDownload />}
                onClick={generateReport}
              >
                Generate Report
              </Button>
            </div>
          </div>
        </div>

        {/* Performance Overview Cards */}
        <Grid container spacing={4} className="mb-8">
          <Grid item xs={12} sm={6} md={3}>
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Typography variant="h4" className="font-bold">
                      {performanceData.userMarks}/{performanceData.totalMarks}
                    </Typography>
                    <Typography variant="body2" className="opacity-90">
                      Total Score
                    </Typography>
                  </div>
                  <FaTrophy className="text-3xl opacity-80" />
                </div>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Typography variant="h4" className="font-bold">
                      {performanceData.percentage}%
                    </Typography>
                    <Typography variant="body2" className="opacity-90">
                      Accuracy
                    </Typography>
                  </div>
                  <FaCheckCircle className="text-3xl opacity-80" />
                </div>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Typography variant="h4" className="font-bold">
                      {performanceData.attemptedQuestions}
                    </Typography>
                    <Typography variant="body2" className="opacity-90">
                      Attempted
                    </Typography>
                  </div>
                  <FaQuestionCircle className="text-3xl opacity-80" />
                </div>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Typography variant="h4" className="font-bold">
                      {formatTime(performanceData.timeSpent)}
                    </Typography>
                    <Typography variant="body2" className="opacity-90">
                      Time Spent
                    </Typography>
                  </div>
                  <FaClock className="text-3xl opacity-80" />
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          {/* Detailed Performance */}
          <Grid item xs={12} lg={8}>
            <Card className="mb-6">
              <CardContent>
                <Typography
                  variant="h6"
                  className="font-bold text-gray-800 mb-4"
                >
                  Detailed Performance Analysis
                </Typography>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Questions:</span>
                    <span className="font-semibold">
                      {performanceData.totalMarks}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Attempted Questions:</span>
                    <span className="font-semibold text-blue-600">
                      {performanceData.attemptedQuestions}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Not Visited:</span>
                    <span className="font-semibold text-red-600">
                      {performanceData.notVisited}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Marked for Review:</span>
                    <span className="font-semibold text-yellow-600">
                      {performanceData.markedForReview}
                    </span>
                  </div>

                  <Divider />

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Time Spent:</span>
                    <span className="font-semibold">
                      {formatTime(performanceData.timeSpent)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      Average Time per Question:
                    </span>
                    <span className="font-semibold">
                      {formatTime(
                        performanceData.attemptedQuestions > 0
                          ? Math.round(
                              performanceData.timeSpent /
                                performanceData.attemptedQuestions
                            )
                          : 0
                      )}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Question-Answer Comparison */}
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  className="font-bold text-gray-800 mb-4"
                >
                  Question-Answer Comparison (Latest Quiz)
                </Typography>

                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Question</TableCell>
                        <TableCell>Your Answer</TableCell>
                        <TableCell>Correct Answer</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {performanceData.recentQuiz.answers.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Typography
                              variant="body2"
                              className="max-w-xs truncate"
                            >
                              {item.question}
                            </Typography>
                          </TableCell>
                          <TableCell>{item.userAnswer}</TableCell>
                          <TableCell>{item.correctAnswer}</TableCell>
                          <TableCell>
                            <Chip
                              icon={
                                item.isCorrect ? (
                                  <FaCheckCircle />
                                ) : (
                                  <FaTimesCircle />
                                )
                              }
                              label={item.isCorrect ? "Correct" : "Incorrect"}
                              color={item.isCorrect ? "success" : "error"}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Past Performances */}
          <Grid item xs={12} lg={4}>
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  className="font-bold text-gray-800 mb-4"
                >
                  Past Performances
                </Typography>

                <div className="space-y-3">
                  {performanceData.pastPerformances?.map(
                    (performance, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <Typography variant="body2" className="text-gray-600">
                            {new Date(performance.date).toLocaleDateString()}
                          </Typography>
                          <Chip
                            label={`${performance.percentage}%`}
                            color={
                              performance.percentage >= 70
                                ? "success"
                                : "default"
                            }
                            size="small"
                          />
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>
                            Score: {performance.score}/{performance.total}
                          </span>
                          <span className="text-gray-500">
                            {performance.percentage >= 70
                              ? "Good"
                              : "Needs Improvement"}
                          </span>
                        </div>
                        <LinearProgress
                          variant="determinate"
                          value={performance.percentage}
                          className="mt-2"
                          color={
                            performance.percentage >= 70 ? "success" : "primary"
                          }
                        />
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Dashboard;
