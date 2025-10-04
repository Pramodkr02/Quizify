import { useState, useEffect, useCallback } from 'react';
import { fetchQuizQuestionsSmart, DEFAULT_QUIZ_CONFIG } from './api';

/**
 * Custom hook for managing quiz data fetching and state
 * @param {Object} config - Quiz configuration options
 * @returns {Object} Quiz data state and functions
 */
export const useQuizData = (config = DEFAULT_QUIZ_CONFIG) => {
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const loadQuiz = useCallback(async (quizConfig = config) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchQuizQuestionsSmart(quizConfig);
      setQuizData(data);
      setRetryCount(0);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load quiz:', err);
    } finally {
      setLoading(false);
    }
  }, [config]);

  const retry = useCallback(() => {
    setRetryCount(prev => prev + 1);
    loadQuiz();
  }, [loadQuiz]);

  const reset = useCallback(() => {
    setQuizData(null);
    setError(null);
    setRetryCount(0);
  }, []);

  // Load quiz data on mount
  useEffect(() => {
    loadQuiz();
  }, [loadQuiz]);

  return {
    quizData,
    loading,
    error,
    retryCount,
    loadQuiz,
    retry,
    reset,
    hasData: !!quizData?.results?.length
  };
};
