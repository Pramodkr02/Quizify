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
import { FaPlay, FaTimes } from "react-icons/fa";

const QuizStartModal = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
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
          <Typography variant="h5" className="font-bold text-gray-800 mb-2">
            🎯 Ready to Start?
          </Typography>
          <Typography variant="body1" className="text-gray-600">
            Are you ready to start the quiz?
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box className="text-center py-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-4">
            <Typography
              variant="h6"
              className="font-semibold text-gray-700 mb-2"
            >
              Quiz Information
            </Typography>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Questions:</span>
                <span className="font-semibold">15 Questions</span>
              </div>
              <div className="flex justify-between">
                <span>Time Limit:</span>
                <span className="font-semibold">30 Minutes</span>
              </div>
              <div className="flex justify-between">
                <span>Difficulty:</span>
                <span className="font-semibold">Mixed</span>
              </div>
            </div>
          </div>

          <Typography variant="body2" className="text-gray-500">
            Once you start, the timer will begin. Make sure you're in a quiet
            environment and ready to focus!
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions className="justify-center pb-6">
        <Button
          onClick={onClose}
          variant="outlined"
          color="secondary"
          size="large"
          className="mr-4 px-6 py-2 border-2 border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold rounded-lg transition-all duration-200"
          startIcon={<FaTimes />}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="primary"
          size="large"
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          startIcon={<FaPlay />}
        >
          Start Quiz
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuizStartModal;
