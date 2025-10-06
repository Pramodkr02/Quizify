import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
} from "@mui/material";
import { FaTrophy, FaChartBar, FaHome } from "react-icons/fa";

const CongratulationsModal = ({
  open,
  onClose,
  score,
  totalMarks,
  onViewDashboard,
}) => {
  const percentage =
    totalMarks > 0 ? Math.round((score / totalMarks) * 100) : 0;

  const getScoreMessage = () => {
    if (percentage >= 90) return "Outstanding! 🌟";
    if (percentage >= 80) return "Excellent! 🎉";
    if (percentage >= 70) return "Great job! 👏";
    if (percentage >= 60) return "Good work! 👍";
    return "Keep practicing! 💪";
  };

  const getScoreColor = () => {
    if (percentage >= 80) return "from-green-500 to-emerald-500";
    if (percentage >= 60) return "from-blue-500 to-cyan-500";
    return "from-orange-500 to-red-500";
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        },
      }}
    >
      <DialogTitle>
        <Box className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <Typography variant="h4" className="font-bold text-gray-800 mb-2">
            Congratulations!
          </Typography>
          <Typography
            variant="h6"
            className={`font-semibold bg-gradient-to-r ${getScoreColor()} bg-clip-text text-transparent`}
          >
            {getScoreMessage()}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box className="text-center py-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-center mb-4">
              <FaTrophy className="text-4xl text-yellow-500 mr-3" />
              <Typography variant="h3" className="font-bold text-gray-800">
                {score} / {totalMarks}
              </Typography>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Score:</span>
                <span className="font-semibold text-lg">{score} points</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Percentage:</span>
                <span className="font-semibold text-lg">{percentage}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Questions:</span>
                <span className="font-semibold text-lg">{totalMarks}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
            <Typography variant="body1" className="text-gray-600 mb-2">
              Your performance has been recorded and saved to your dashboard.
            </Typography>
            <Typography variant="body2" className="text-gray-500">
              You can view detailed analytics, compare your answers, and track
              your progress over time.
            </Typography>
          </div>
        </Box>
      </DialogContent>

      <DialogActions className="pb-6 w-full !m-0">
        <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <Button
            onClick={onClose}
            variant="outlined"
            color="secondary"
            size="large"
            className="w-full sm:w-auto px-6 py-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold rounded-lg transition-all duration-200"
            startIcon={<FaHome />}
          >
            Go Home
          </Button>
          <Button
            onClick={onViewDashboard}
            variant="contained"
            color="primary"
            size="large"
            className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            startIcon={<FaChartBar />}
            autoFocus
          >
            View Dashboard
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default CongratulationsModal;
