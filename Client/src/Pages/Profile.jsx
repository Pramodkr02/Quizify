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
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
} from "@mui/material";
import {
  FaUser,
  FaTrophy,
  FaChartLine,
  FaCalendarAlt,
  FaEdit,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { fetchDashboard, fetchPerformanceHistory } from "../Utils/api";

const Profile = () => {
  const navigate = useNavigate();
  const context = useContext(MyContext);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!context.isLogin) {
      navigate("/login");
      return;
    }

    const loadUserProfile = async () => {
      setLoading(true);
      try {
        const [dash, perf] = await Promise.all([
          fetchDashboard(),
          fetchPerformanceHistory(1, 10),
        ]);
        if (dash?.success) {
          const d = dash.data;
          setUserProfile({
            name: context.userData?.name || "User",
            email: context.userData?.email || "",
            joinDate: context.userData?.createdAt || new Date().toISOString(),
            totalQuizzes: d.totalQuizzes || 0,
            averageScore: d.averageScore || 0,
            bestScore: d.bestScore || 0,
            totalTimeSpent: d.totalTimeSpent || 0,
            achievements: [],
            recentScores: (d.recentReports || []).map((r) => ({
              date: r.createdAt,
              score: r.userMarks,
              total: r.totalMarks,
              percentage: r.accuracy,
              timeSpent: r.timeSpent,
            })),
            stats: {
              totalQuestions: d.totalQuestions || 0,
              correctAnswers: d.totalCorrect || 0,
              accuracy:
                d.totalQuizzes > 0
                  ? Math.round((d.totalCorrect / d.totalQuestions) * 100)
                  : 0,
              averageTimePerQuestion:
                d.totalQuizzes > 0 && d.totalQuestions > 0
                  ? Math.round(d.totalTimeSpent / d.totalQuestions)
                  : 0,
              streak: 0,
              longestStreak: 0,
            },
          });
        } else {
          setUserProfile(null);
        }
      } catch (e) {
        console.error(e);
        setUserProfile(null);
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [context.isLogin, context.userData, navigate]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Loading Profile...
          </h2>
          <p className="text-gray-600">Fetching your profile data</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Profile Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            Unable to load your profile data.
          </p>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
          >
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div>
              <Typography
                variant="h4"
                className="font-bold text-gray-800 mb-1 text-2xl sm:text-3xl lg:text-4xl"
              >
                User Profile
              </Typography>
              <Typography
                variant="body1"
                className="text-gray-600 text-sm sm:text-base"
              >
                Manage your account and view your progress
              </Typography>
            </div>
            <div className="flex w-full md:w-auto justify-center md:justify-end gap-2">
              <Button
                variant="outlined"
                startIcon={<FaEdit />}
                className="focus-visible:ring-2 focus-visible:ring-blue-500"
                onClick={() =>
                  alert("Edit profile functionality would be implemented here")
                }
              >
                Edit Profile
              </Button>
              <Button
                variant="outlined"
                startIcon={<FaCog />}
                className="focus-visible:ring-2 focus-visible:ring-blue-500"
                onClick={() =>
                  alert("Settings functionality would be implemented here")
                }
              >
                Settings
              </Button>
            </div>
          </div>
        </div>

        <Grid container spacing={4}>
          {/* Profile Information */}
          <Grid item xs={12} lg={4}>
            <Card className="mb-6">
              <CardContent className="text-center">
                <Avatar className="bg-gradient-to-r from-blue-500 to-purple-600 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-2">
                  <FaUser className="text-4xl" />
                </Avatar>
                <Typography
                  variant="h5"
                  className="font-bold text-gray-800 mb-1 text-lg sm:text-xl lg:text-2xl"
                >
                  {userProfile.name}
                </Typography>
                <Typography
                  variant="body2"
                  className="text-gray-600 mb-2 break-all"
                >
                  {userProfile.email}
                </Typography>
                <Typography variant="body2" className="text-gray-500">
                  Member since {formatDate(userProfile.joinDate)}
                </Typography>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  className="font-bold text-gray-800 mb-4"
                >
                  Quick Stats
                </Typography>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Quizzes:</span>
                    <span className="font-semibold text-sm sm:text-base lg:text-lg">
                      {userProfile.totalQuizzes}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Score:</span>
                    <span className="font-semibold text-blue-600 text-sm sm:text-base lg:text-lg">
                      {userProfile.averageScore}%
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Best Score:</span>
                    <span className="font-semibold text-green-600 text-sm sm:text-base lg:text-lg">
                      {userProfile.bestScore}%
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Time:</span>
                    <span className="font-semibold text-sm sm:text-base lg:text-lg">
                      {formatTime(userProfile.totalTimeSpent)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={8}>
            {/* Detailed Statistics */}
            <Card className="mb-6">
              <CardContent>
                <Typography
                  variant="h6"
                  className="font-bold text-gray-800 mb-4"
                >
                  Detailed Statistics
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={3}>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Typography
                        variant="h4"
                        className="font-bold text-blue-600 text-xl sm:text-2xl lg:text-3xl"
                      >
                        {userProfile.stats.totalQuestions}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        Total Questions
                      </Typography>
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Typography
                        variant="h4"
                        className="font-bold text-green-600 text-xl sm:text-2xl lg:text-3xl"
                      >
                        {userProfile.stats.correctAnswers}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        Correct Answers
                      </Typography>
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Typography
                        variant="h4"
                        className="font-bold text-purple-600 text-xl sm:text-2xl lg:text-3xl"
                      >
                        {userProfile.stats.accuracy}%
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        Accuracy
                      </Typography>
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <Typography
                        variant="h4"
                        className="font-bold text-orange-600 text-xl sm:text-2xl lg:text-3xl"
                      >
                        {userProfile.stats.streak}
                      </Typography>
                      <Typography variant="body2" className="text-gray-600">
                        Current Streak
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="mb-6">
              <CardContent>
                <Typography
                  variant="h6"
                  className="font-bold text-gray-800 mb-4"
                >
                  Achievements
                </Typography>

                <Grid container spacing={2}>
                  {userProfile.achievements.map((achievement, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Paper
                        className={`p-4 rounded-lg border-2 ${
                          achievement.earned
                            ? "border-green-200 bg-green-50"
                            : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center mb-2">
                          <FaTrophy
                            className={`text-2xl mr-3 ${
                              achievement.earned
                                ? "text-yellow-500"
                                : "text-gray-400"
                            }`}
                          />
                          <Typography
                            variant="subtitle1"
                            className={`font-semibold ${
                              achievement.earned
                                ? "text-green-800"
                                : "text-gray-500"
                            }`}
                          >
                            {achievement.name}
                          </Typography>
                        </div>
                        <Typography
                          variant="body2"
                          className={
                            achievement.earned
                              ? "text-green-700"
                              : "text-gray-500"
                          }
                        >
                          {achievement.description}
                        </Typography>
                        {achievement.earned && (
                          <Chip
                            label="Earned"
                            color="success"
                            size="small"
                            className="mt-2"
                          />
                        )}
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>

            {/* Performance History */}
            <Card className="mb-6">
              <CardContent>
                <Typography
                  variant="h6"
                  className="font-bold text-gray-800 mb-4"
                >
                  Performance History
                </Typography>

                <div className="flex md:block overflow-x-auto gap-3 md:space-y-3 pr-1">
                  {userProfile.recentScores.map((score, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-4 flex-shrink-0 min-w-[260px] md:min-w-0"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <Typography variant="body2" className="text-gray-600">
                          {formatDate(score.date)}
                        </Typography>
                        <Chip
                          label={`${score.percentage}%`}
                          color={
                            score.percentage >= 80
                              ? "success"
                              : score.percentage >= 60
                              ? "warning"
                              : "error"
                          }
                          size="small"
                        />
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>
                          Score: {score.score}/{score.total}
                        </span>
                        <span className="text-gray-500">
                          Time: {formatTime(score.timeSpent)}
                        </span>
                      </div>
                      <LinearProgress
                        variant="determinate"
                        value={score.percentage}
                        className="mt-2"
                        color={
                          score.percentage >= 80
                            ? "success"
                            : score.percentage >= 60
                            ? "warning"
                            : "error"
                        }
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Profile;
