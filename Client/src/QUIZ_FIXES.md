# Quiz Persistence Fixes

## Issues Fixed

### 1. Quiz ID Changing Every Second
**Problem**: Quiz ID was being regenerated on every render because `generateQuizId()` was called directly in JSX.

**Solution**:
- Added `quizId` state variable to store the ID persistently
- Generate quiz ID only once when quiz starts
- Use the stored `quizId` in submission data and display

### 2. Answers Being Reset Frequently
**Problem**: Answers were being reset every time `quizData` changed, even if it was the same quiz.

**Solution**:
- Only initialize answers if they haven't been set yet (`Object.keys(answers).length === 0`)
- Separate useEffect for quiz ID and answers initialization
- Added proper dependency arrays to prevent unnecessary re-renders

### 3. Options Shuffling on Every Render
**Problem**: Question options were being shuffled on every render, causing confusion.

**Solution**:
- Pre-shuffle all options once when quiz starts
- Store shuffled options in `shuffledOptions` state
- Use pre-shuffled options for consistent display

### 4. Quiz State Not Resetting for New Quizzes
**Problem**: When starting a new quiz, old state persisted.

**Solution**:
- Added `resetQuizState()` function to clear all quiz state
- Reset state when quiz data changes (new quiz)
- Use `useCallback` to prevent unnecessary re-renders

## Code Changes

### QuizPage.jsx
```javascript
// Added persistent state
const [quizId, setQuizId] = useState(null);
const [shuffledOptions, setShuffledOptions] = useState({});

// Generate quiz ID only once
useEffect(() => {
  if (quizData?.results && !quizId) {
    setQuizId(generateQuizId());
  }
}, [quizData, quizId]);

// Pre-shuffle options once
useEffect(() => {
  if (quizData?.results && Object.keys(answers).length === 0) {
    // Shuffle and store options
    const optionsMap = {};
    quizData.results.forEach((question, index) => {
      if (question.type === "boolean") {
        optionsMap[index] = ["True", "False"];
      } else {
        const allOptions = [question.correct_answer, ...question.incorrect_answers];
        optionsMap[index] = shuffleArray([...allOptions]);
      }
    });
    setShuffledOptions(optionsMap);
  }
}, [quizData, answers]);

// Use persistent quiz ID
const submissionData = {
  quizId: quizId, // Instead of generateQuizId()
  // ... other data
};
```

### QuizPageWrapper.jsx
```javascript
// Added useCallback to prevent unnecessary re-renders
const loadQuiz = useCallback(async () => {
  // ... load quiz logic
}, []);
```

## Benefits

1. **Stable Quiz ID**: Quiz ID remains the same throughout the entire quiz session
2. **Persistent Answers**: User answers are preserved and not reset unexpectedly
3. **Consistent Options**: Question options maintain their order throughout the quiz
4. **Better Performance**: Reduced unnecessary re-renders and state updates
5. **Clean State Management**: Proper reset when starting new quizzes

## Testing

To test the fixes:
1. Start a quiz and note the Quiz ID
2. Navigate between questions - Quiz ID should remain the same
3. Answer some questions and navigate away/back - answers should persist
4. Check that question options don't change order when navigating
5. Start a new quiz - old state should be cleared

## Additional Utilities

Created `quizPersistence.js` with utilities for:
- Saving/loading quiz state to localStorage
- Managing quiz state across browser sessions
- Clearing old quiz states
- Getting saved quiz IDs

These utilities can be used for future features like:
- Resume quiz functionality
- Quiz history
- Offline quiz support
