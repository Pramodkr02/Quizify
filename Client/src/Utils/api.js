import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

// const apiUrl = "http://localhost:5000";

export const postData = async (url, formData) => {
  try {
    const response = await fetch(apiUrl + url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`, //Include your API key here
        "Content-Type": "application/json", //Set the Content-type and application/json
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      return errorData;
    }
  } catch (error) {
    console.log("Error", error);
  }
};

export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get(apiUrl + url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// Quizify backend helpers

export const submitQuizSummary = async (summary) => {
  return postData("/api/quiz/submit", summary);
};

export const fetchDashboard = async () => {
  return fetchDataFromApi("/api/quiz/dashboard");
};

export const fetchPerformanceHistory = async (page = 1, limit = 10) => {
  return fetchDataFromApi(`/api/quiz/performance?page=${page}&limit=${limit}`);
};

// Open Trivia Database API utility functions

const BASE_URL = "https://opentdb.com/api.php";

// Rate limiting to prevent 429 errors
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 4000; // 2 seconds between requests
let requestCount = 0;
const MAX_REQUESTS_PER_MINUTE = 5; // Conservative limit

// Initialize from localStorage if available
if (typeof window !== "undefined") {
  const storedLastRequest = localStorage.getItem("lastAPIRequest");
  const storedRequestCount = localStorage.getItem("requestCount");

  if (storedLastRequest) {
    lastRequestTime = parseInt(storedLastRequest);
    const timeSinceLastRequest = Date.now() - lastRequestTime;

    // Reset request count if more than a minute has passed
    if (timeSinceLastRequest > 60000) {
      requestCount = 0;
    } else if (storedRequestCount) {
      requestCount = parseInt(storedRequestCount);
    }
  }
}

/**
 * Fetch quiz questions from Open Trivia Database API
 * @param {Object} options - API parameters
 * @param {number} options.amount - Number of questions (1-50)
 * @param {string} options.difficulty - Difficulty level: 'easy', 'medium', 'hard', or 'any'
 * @param {string} options.type - Question type: 'multiple', 'boolean', or 'any'
 * @param {string} options.category - Category ID or 'any'
 * @returns {Promise<Object>} Quiz data in the expected format
 */
export const fetchQuizQuestions = async (options = {}) => {
  const {
    amount = 15,
    difficulty = "any",
    type = "any",
    category = "any",
  } = options;

  // Enhanced rate limiting to prevent 429 errors
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  // Reset request count every minute
  if (timeSinceLastRequest > 60000) {
    requestCount = 0;
  }

  // Check if we've exceeded the rate limit
  if (requestCount >= MAX_REQUESTS_PER_MINUTE) {
    const waitTime = 60000 - timeSinceLastRequest;
    console.log(
      `Rate limit exceeded: waiting ${waitTime}ms before next request`
    );
    await new Promise((resolve) => setTimeout(resolve, Math.max(waitTime, 0)));
    requestCount = 0;
  }

  // Ensure minimum interval between requests
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
    console.log(`Rate limiting: waiting ${waitTime}ms before next request`);
    await new Promise((resolve) => setTimeout(resolve, waitTime));
  }

  lastRequestTime = Date.now();
  requestCount++;

  // Store in localStorage for persistence across page reloads
  if (typeof window !== "undefined") {
    localStorage.setItem("lastAPIRequest", lastRequestTime.toString());
    localStorage.setItem("requestCount", requestCount.toString());
  }

  // Build query parameters
  const params = new URLSearchParams({
    amount: amount.toString(),
    ...(difficulty !== "any" && { difficulty }),
    ...(type !== "any" && { type }),
    ...(category !== "any" && { category }),
  });

  try {
    const response = await fetch(`${BASE_URL}?${params}`);

    if (!response.ok) {
      if (response.status === 429) {
        // Implement exponential backoff for 429 errors
        const retryAfter = response.headers.get("Retry-After");
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : 5000; // Default 5 seconds

        console.log(`Rate limited (429): waiting ${waitTime}ms before retry`);
        await new Promise((resolve) => setTimeout(resolve, waitTime));

        // Retry once with exponential backoff
        const retryResponse = await fetch(`${BASE_URL}?${params}`);
        if (!retryResponse.ok) {
          throw new Error(
            "Too many requests. Please wait a moment and try again."
          );
        }

        const retryData = await retryResponse.json();
        return processQuizData(retryData);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return processQuizData(data);
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    throw new Error(`Failed to fetch quiz questions: ${error.message}`);
  }
};

/**
 * Get available categories from the API
 * @returns {Promise<Array>} Array of category objects
 */
export const fetchCategories = async () => {
  try {
    const response = await fetch("https://opentdb.com/api_category.php");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.trivia_categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error(`Failed to fetch categories: ${error.message}`);
  }
};

/**
 * Get category count for a specific category
 * @param {number} categoryId - Category ID
 * @returns {Promise<Object>} Category count data
 */
export const fetchCategoryCount = async (categoryId) => {
  try {
    const response = await fetch(
      `https://opentdb.com/api_count.php?category=${categoryId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.category_question_count || {};
  } catch (error) {
    console.error("Error fetching category count:", error);
    throw new Error(`Failed to fetch category count: ${error.message}`);
  }
};

/**
 * Decode HTML entities in text
 * @param {string} text - Text with HTML entities
 * @returns {string} Decoded text
 */
const decodeHtmlEntities = (text) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
};

/**
 * Process quiz data from API response
 * @param {Object} data - Raw API response data
 * @returns {Object} Processed quiz data
 */
const processQuizData = (data) => {
  // Check if API returned an error
  if (data.response_code !== 0) {
    const errorMessages = {
      1: "No results found for the specified parameters",
      2: "Invalid parameter",
      3: "Token not found",
      4: "Token empty",
    };

    const errorMessage =
      errorMessages[data.response_code] ||
      `API error! Response code: ${data.response_code}`;
    throw new Error(errorMessage);
  }

  // Decode HTML entities in questions and answers
  const decodedData = {
    ...data,
    results: data.results.map((question) => ({
      ...question,
      question: decodeHtmlEntities(question.question),
      correct_answer: decodeHtmlEntities(question.correct_answer),
      incorrect_answers: question.incorrect_answers.map((answer) =>
        decodeHtmlEntities(answer)
      ),
    })),
  };

  return decodedData;
};

/**
 * Predefined quiz configurations for easy use
 */
export const QUIZ_CONFIGS = {
  EASY_MIXED: {
    amount: 10,
    difficulty: "easy",
    type: "any",
  },
  MEDIUM_MIXED: {
    amount: 15,
    difficulty: "medium",
    type: "any",
  },
  HARD_MIXED: {
    amount: 20,
    difficulty: "hard",
    type: "any",
  },
  SCIENCE_FOCUS: {
    amount: 15,
    difficulty: "any",
    type: "any",
    category: "17", // Science & Nature
  },
  ENTERTAINMENT_FOCUS: {
    amount: 15,
    difficulty: "any",
    type: "any",
    category: "10", // Entertainment
  },
  BOOLEAN_ONLY: {
    amount: 15,
    difficulty: "any",
    type: "boolean",
  },
  MULTIPLE_CHOICE_ONLY: {
    amount: 15,
    difficulty: "any",
    type: "multiple",
  },
};

/**
 * Default quiz configuration
 */
export const DEFAULT_QUIZ_CONFIG = {
  amount: 15,
  difficulty: "any",
  type: "any",
  category: "any",
};

/**
 * Fallback sample data when API is unavailable
 */
export const FALLBACK_QUIZ_DATA = {
  response_code: 0,
  results: [
    {
      type: "boolean",
      difficulty: "easy",
      category: "General Knowledge",
      question:
        "The Great Wall of China is visible from space with the naked eye.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      type: "multiple",
      difficulty: "medium",
      category: "Science & Nature",
      question: "What is the chemical symbol for gold?",
      correct_answer: "Au",
      incorrect_answers: ["Go", "Gd", "Ag"],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "Entertainment: Music",
      question: "Who wrote the song 'Imagine'?",
      correct_answer: "John Lennon",
      incorrect_answers: ["Paul McCartney", "George Harrison", "Ringo Starr"],
    },
    {
      type: "boolean",
      difficulty: "medium",
      category: "History",
      question:
        "The United States declared independence from Great Britain on July 4th, 1776.",
      correct_answer: "True",
      incorrect_answers: ["False"],
    },
    {
      type: "multiple",
      difficulty: "hard",
      category: "Science & Nature",
      question: "What is the speed of light in a vacuum?",
      correct_answer: "299,792,458 meters per second",
      incorrect_answers: [
        "300,000,000 meters per second",
        "299,000,000 meters per second",
        "301,000,000 meters per second",
      ],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "Sports",
      question: "Which country won the 2018 FIFA World Cup?",
      correct_answer: "France",
      incorrect_answers: ["Brazil", "Germany", "Argentina"],
    },
    {
      type: "boolean",
      difficulty: "medium",
      category: "Geography",
      question: "The Amazon River is the longest river in the world.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      type: "multiple",
      difficulty: "hard",
      category: "Entertainment: Film",
      question: "Which film won the Academy Award for Best Picture in 1994?",
      correct_answer: "Forrest Gump",
      incorrect_answers: [
        "The Shawshank Redemption",
        "Pulp Fiction",
        "The Lion King",
      ],
    },
    {
      type: "multiple",
      difficulty: "easy",
      category: "General Knowledge",
      question: "What is the capital of France?",
      correct_answer: "Paris",
      incorrect_answers: ["London", "Berlin", "Madrid"],
    },
    {
      type: "boolean",
      difficulty: "medium",
      category: "Science & Nature",
      question: "The human brain contains approximately 100 billion neurons.",
      correct_answer: "True",
      incorrect_answers: ["False"],
    },
  ],
};

//  Fetch quiz questions with fallback to sample data

export const fetchQuizQuestionsWithFallback = async (options = {}) => {
  const { amount = 15 } = options;

  try {
    return await fetchQuizQuestions(options);
  } catch (error) {
    console.warn("API request failed, using fallback data:", error.message);

    // If it's a rate limit error, immediately use fallback
    if (
      error.message.includes("Too many requests") ||
      error.message.includes("429")
    ) {
      console.log("Rate limit detected, using fallback data immediately");
    }

    // Return a subset of fallback data based on requested amount
    const fallbackData = {
      ...FALLBACK_QUIZ_DATA,
      results: FALLBACK_QUIZ_DATA.results.slice(
        0,
        Math.min(amount, FALLBACK_QUIZ_DATA.results.length)
      ),
    };

    return fallbackData;
  }
};

/**
 * Fetch quiz questions with smart fallback strategy
 * Uses fallback data immediately if rate limits are detected
 */
export const fetchQuizQuestionsSmart = async (options = {}) => {
  const { amount = 15 } = options;

  // Check if we've been rate limited recently
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;

  // If we've made requests recently and might be rate limited, use fallback
  if (requestCount >= 3 && timeSinceLastRequest < 30000) {
    // 30 seconds
    console.log("Using smart fallback due to recent API activity");
    const fallbackData = {
      ...FALLBACK_QUIZ_DATA,
      results: FALLBACK_QUIZ_DATA.results.slice(
        0,
        Math.min(amount, FALLBACK_QUIZ_DATA.results.length)
      ),
    };
    return fallbackData;
  }

  try {
    return await fetchQuizQuestions(options);
  } catch (error) {
    console.warn("API request failed, using fallback data:", error.message);

    const fallbackData = {
      ...FALLBACK_QUIZ_DATA,
      results: FALLBACK_QUIZ_DATA.results.slice(
        0,
        Math.min(amount, FALLBACK_QUIZ_DATA.results.length)
      ),
    };

    return fallbackData;
  }
};
