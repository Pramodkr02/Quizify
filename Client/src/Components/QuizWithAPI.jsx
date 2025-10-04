import React, { useState, useEffect } from "react";
import QuizPage from "../Pages/QuizPage";
import { fetchQuizQuestions, QUIZ_CONFIGS } from "../Utils/api";

const QuizWithAPI = ({ config = QUIZ_CONFIGS.MEDIUM_MIXED }) => {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchQuizQuestions(config);
        setQuizData(data);
      } catch (err) {
        setError(err.message);
        console.error("Failed to load quiz:", err);
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [config]);

  const handleQuizSubmit = async (submissionData) => {
    console.log("Quiz submitted with data:", submissionData);
    // Here you would typically send the data to your backend
    alert("Quiz submitted successfully! Check console for submission data.");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Loading Quiz...
          </h2>
          <p className="text-gray-600">
            Fetching questions from Open Trivia Database API
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg
              className="w-16 h-16 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Failed to Load Quiz
            </h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            No Quiz Data Available
          </h2>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  return <QuizPage quizData={quizData} onQuizSubmit={handleQuizSubmit} />;
};

export default QuizWithAPI;
