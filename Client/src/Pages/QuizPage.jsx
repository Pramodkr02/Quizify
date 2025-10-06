import React, { useState, useEffect, useCallback } from "react";
import { useTimer } from "../Utils/useTimer";
import Timer from "../Components/Timer";
import QuestionCard from "../Components/QuestionCard";
import SidebarNav from "../Components/SidebarNav";

const QuizPage = ({ quizData, onQuizSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizId, setQuizId] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState({});

  // Reset quiz state (useful for starting a new quiz)
  const resetQuizState = useCallback(() => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setMarkedForReview(new Set());
    setIsSubmitting(false);
    setQuizId(null);
    setShuffledOptions({});
  }, []);

  // Timer setup - 30 minutes
  const handleTimeUp = useCallback(() => {
    handleSubmitQuiz();
  }, []);

  const { timeLeft, formattedTime, isRunning } = useTimer(
    30 * 60,
    handleTimeUp
  );

  // Reset quiz state when quizData changes (new quiz)
  useEffect(() => {
    if (quizData?.results) {
      resetQuizState();
    }
  }, [quizData?.results?.length, resetQuizState]); // Only reset when quiz length changes (new quiz)

  // Initialize quiz ID when quiz data changes
  useEffect(() => {
    if (quizData?.results && !quizId) {
      setQuizId(generateQuizId());
    }
  }, [quizData, quizId]);

  // Initialize answers state and shuffle options when quiz data changes
  useEffect(() => {
    if (quizData?.results && Object.keys(answers).length === 0) {
      const initialAnswers = {};
      const optionsMap = {};

      quizData.results.forEach((question, index) => {
        initialAnswers[index] = null;

        // Shuffle options once and store them
        if (question.type === "boolean") {
          optionsMap[index] = ["True", "False"];
        } else {
          const allOptions = [
            question.correct_answer,
            ...question.incorrect_answers,
          ];
          optionsMap[index] = shuffleArray([...allOptions]);
        }
      });

      setAnswers(initialAnswers);
      setShuffledOptions(optionsMap);
    }
  }, [quizData, answers]);

  // Get current question data
  const currentQuestion = quizData?.results?.[currentQuestionIndex];
  const totalQuestions = quizData?.results?.length || 0;

  // Get pre-shuffled options for current question
  const getOptions = (questionIndex) => {
    return shuffledOptions[questionIndex] || [];
  };

  // Shuffle array utility
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: answer,
    }));
  };

  // Handle question navigation
  const handleQuestionSelect = (index) => {
    setCurrentQuestionIndex(index);
  };

  // Navigate to previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Navigate to next question
  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  // Handle mark for review toggle
  const handleMarkForReview = () => {
    setMarkedForReview((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestionIndex)) {
        newSet.delete(currentQuestionIndex);
      } else {
        newSet.add(currentQuestionIndex);
      }
      return newSet;
    });
  };

  // Handle quiz submission
  const handleSubmitQuiz = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    // Prepare submission data
    const submissionData = {
      quizId: quizId,
      answers: answers,
      markedForReview: Array.from(markedForReview),
      timeSpent: 30 * 60 - timeLeft,
      totalQuestions: totalQuestions,
      attemptedQuestions: Object.values(answers).filter(
        (answer) => answer !== null
      ).length,
    };

    console.log("Quiz Submission Data:", submissionData);

    // Call the onQuizSubmit callback if provided
    if (onQuizSubmit) {
      await onQuizSubmit(submissionData);
    }

    setIsSubmitting(false);
  };

  // Generate a simple quiz ID
  const generateQuizId = () => {
    return Math.random().toString(36).substr(2, 7).toUpperCase();
  };

  // Calculate progress
  const attemptedQuestions = Object.values(answers).filter(
    (answer) => answer !== null
  ).length;
  const progressPercentage =
    totalQuestions > 0 ? (attemptedQuestions / totalQuestions) * 100 : 0;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft" && currentQuestionIndex > 0) {
        handlePrevious();
      } else if (
        e.key === "ArrowRight" &&
        currentQuestionIndex < totalQuestions - 1
      ) {
        handleNext();
      } else if (e.key === "m" || e.key === "M") {
        handleMarkForReview();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentQuestionIndex, totalQuestions]);

  if (!quizData?.results || quizData.results.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            No Quiz Data Available
          </h2>
          <p className="text-gray-600">
            Please load quiz data to start the quiz.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[clamp(1.5rem,5vw,3rem)] font-bold text-gray-800 text-center mb-2">
            Quiz Challenge
          </h1>
          <div className="flex items-center justify-between flex-wrap gap-1">
            <div className="text-[clamp(0.7rem,2vw,0.9rem)] bg-blue-700 text-white rounded-2xl px-3 py-1">
              Progress: {attemptedQuestions}/{totalQuestions} Questions
              attempted
            </div>

            <div className="text-[clamp(0.7rem,2vw,0.9rem)]  text-gray-600 font-medium whitespace-nowrap">
              Quiz ID: {quizId || "Loading..."}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="transition-all duration-300 ease-in-out">
              <QuestionCard
                question={currentQuestion?.question}
                options={getOptions(currentQuestionIndex)}
                selectedAnswer={answers[currentQuestionIndex]}
                onAnswerSelect={handleAnswerSelect}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={totalQuestions}
                category={currentQuestion?.category}
                difficulty={currentQuestion?.difficulty}
                type={currentQuestion?.type}
                isMarkedForReview={markedForReview.has(currentQuestionIndex)}
                onMarkForReview={handleMarkForReview}
              />
            </div>

            {/* Navigation Controls */}

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer w-full sm:w-auto"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span>Previous</span>
                </button>

                <div className="flex items-center flex-wrap gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-center">
                  <button
                    onClick={handleMarkForReview}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer w-full sm:w-auto text-center ${
                      markedForReview.has(currentQuestionIndex)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {markedForReview.has(currentQuestionIndex)
                      ? "✓ Marked for Review"
                      : "Mark for Review "}
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={currentQuestionIndex === totalQuestions - 1}
                    className="flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer w-full sm:w-auto"
                  >
                    <span>Next</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                <button
                  onClick={handleSubmitQuiz}
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer w-full sm:w-auto"
                >
                  {isSubmitting ? "Submitting..." : "Submit Quiz"}
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Quiz Progress</span>
                  <span>{Math.round(progressPercentage)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Timer
                formattedTime={formattedTime}
                timeLeft={timeLeft}
                totalTime={30 * 60}
              />
              <SidebarNav
                questions={quizData.results}
                currentQuestionIndex={currentQuestionIndex}
                answers={answers}
                markedForReview={Array.from(markedForReview)}
                onQuestionSelect={handleQuestionSelect}
              />
            </div>
          </div>
        </div>

        {/* Keyboard Shortcuts Help */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">
            Keyboard Shortcuts
          </h3>
          <div className="text-xs text-blue-700 space-y-1">
            <div>← → Arrow keys: Navigate between questions</div>
            <div>M: Mark current question for review</div>
            <div>Space: Select answer (when focused on option)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
