import React, { useState, useEffect, useCallback } from 'react';
import QuizPage from '../Pages/QuizPage';
import APIErrorHandler from './APIErrorHandler';
import { fetchQuizQuestionsSmart, QUIZ_CONFIGS } from '../Utils/api';

const QuizPageWrapper = () => {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const loadQuiz = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setIsRetrying(false);
      // Load a medium mixed quiz by default
      const data = await fetchQuizQuestionsSmart(QUIZ_CONFIGS.MEDIUM_MIXED);
      setQuizData(data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load quiz:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRetry = async () => {
    setIsRetrying(true);
    await loadQuiz();
  };

  useEffect(() => {
    loadQuiz();
  }, []);

  const handleQuizSubmit = async (submissionData) => {
    console.log('Quiz submitted with data:', submissionData);
    
    // Here you would typically send the data to your backend
    try {
      // Example: Send to your API endpoint
      // const response = await fetch('/api/quiz/submit', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(submissionData)
      // });
      
      alert('Quiz submitted successfully! Check console for submission data.');
    } catch (err) {
      console.error('Failed to submit quiz:', err);
      alert('Failed to submit quiz. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Quiz...</h2>
          <p className="text-gray-600">Fetching questions from Open Trivia Database API</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <APIErrorHandler 
        error={error} 
        onRetry={handleRetry} 
        isRetrying={isRetrying} 
      />
    );
  }

  if (!quizData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">No Quiz Data Available</h2>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <QuizPage 
      quizData={quizData} 
      onQuizSubmit={handleQuizSubmit}
    />
  );
};

export default QuizPageWrapper;
