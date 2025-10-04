// Utility functions for quiz persistence and state management

/**
 * Generate a unique quiz ID
 * @returns {string} Unique quiz ID
 */
export const generateQuizId = () => {
  return Math.random().toString(36).substr(2, 7).toUpperCase();
};

/**
 * Save quiz state to localStorage
 * @param {string} quizId - Quiz ID
 * @param {Object} quizState - Quiz state object
 */
export const saveQuizState = (quizId, quizState) => {
  if (typeof window !== 'undefined') {
    const stateKey = `quiz_state_${quizId}`;
    localStorage.setItem(stateKey, JSON.stringify({
      ...quizState,
      timestamp: Date.now()
    }));
  }
};

/**
 * Load quiz state from localStorage
 * @param {string} quizId - Quiz ID
 * @returns {Object|null} Quiz state or null if not found
 */
export const loadQuizState = (quizId) => {
  if (typeof window !== 'undefined') {
    const stateKey = `quiz_state_${quizId}`;
    const savedState = localStorage.getItem(stateKey);
    
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        // Check if state is not too old (24 hours)
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
        if (Date.now() - parsedState.timestamp < maxAge) {
          return parsedState;
        } else {
          // Remove expired state
          localStorage.removeItem(stateKey);
        }
      } catch (error) {
        console.error('Error parsing saved quiz state:', error);
        localStorage.removeItem(stateKey);
      }
    }
  }
  return null;
};

/**
 * Clear quiz state from localStorage
 * @param {string} quizId - Quiz ID
 */
export const clearQuizState = (quizId) => {
  if (typeof window !== 'undefined') {
    const stateKey = `quiz_state_${quizId}`;
    localStorage.removeItem(stateKey);
  }
};

/**
 * Clear all quiz states from localStorage
 */
export const clearAllQuizStates = () => {
  if (typeof window !== 'undefined') {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('quiz_state_')) {
        localStorage.removeItem(key);
      }
    });
  }
};

/**
 * Get all saved quiz IDs
 * @returns {Array} Array of quiz IDs
 */
export const getSavedQuizIds = () => {
  if (typeof window !== 'undefined') {
    const keys = Object.keys(localStorage);
    return keys
      .filter(key => key.startsWith('quiz_state_'))
      .map(key => key.replace('quiz_state_', ''));
  }
  return [];
};
