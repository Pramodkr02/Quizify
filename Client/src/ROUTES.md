# Quizify Application Routes

This document outlines all available routes in the Quizify application.

## Main Application Routes

### Core Pages
- **`/`** - Home page
- **`/login`** - User login page
- **`/register`** - User registration page
- **`/dashboard`** - User dashboard (after login)

### Quiz Routes
- **`/quiz`** - Main quiz page with API integration (QuizPageWrapper)
- **`/quiz-demo`** - Interactive quiz demo with configuration options
- **`/quiz-api`** - Simple API integration example
- **`/quiz-examples`** - Comprehensive integration examples and documentation

### Error Handling
- **`*`** - 404 Error page (catches all unmatched routes)

## Route Components

### QuizPageWrapper (`/quiz`)
- **Purpose**: Main quiz experience with live API data
- **Features**: 
  - Fetches questions from Open Trivia Database API
  - 30-minute timer
  - Full quiz functionality
  - Error handling and loading states
- **Data Source**: Live API data (QUIZ_CONFIGS.MEDIUM_MIXED)

### QuizDemo (`/quiz-demo`)
- **Purpose**: Interactive demo with multiple quiz configurations
- **Features**:
  - Quiz configuration selection
  - Loading and error states
  - Real-time API integration
  - Multiple difficulty levels and categories
- **Data Source**: Live API data with user-selected configuration

### QuizWithAPI (`/quiz-api`)
- **Purpose**: Simple example of API integration
- **Features**:
  - Basic API integration
  - Loading states
  - Error handling
- **Data Source**: Live API data (QUIZ_CONFIGS.MEDIUM_MIXED)

### QuizIntegrationExample (`/quiz-examples`)
- **Purpose**: Comprehensive examples and documentation
- **Features**:
  - Multiple integration methods
  - Code examples
  - API configuration options
  - Usage patterns
- **Data Source**: Live API data with various configurations

## Navigation

The application includes a responsive navigation bar with:
- **Desktop**: Horizontal navigation with all routes
- **Mobile**: Collapsible menu
- **Active State**: Current route highlighting
- **Icons**: Visual indicators for each route

## Usage Examples

### Direct Navigation
```jsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

// Navigate to quiz
navigate('/quiz');

// Navigate to demo
navigate('/quiz-demo');
```

### Link Components
```jsx
import { Link } from 'react-router-dom';

<Link to="/quiz">Start Quiz</Link>
<Link to="/quiz-demo">Quiz Demo</Link>
```

### Programmatic Navigation
```jsx
// In a component
const handleStartQuiz = () => {
  window.location.href = '/quiz';
};
```

## API Integration

All quiz routes use the Open Trivia Database API:
- **Base URL**: `https://opentdb.com/api.php`
- **Configuration**: Customizable amount, difficulty, type, and category
- **Error Handling**: Comprehensive error handling with retry functionality
- **Loading States**: User-friendly loading indicators

## Route Protection

Currently, all routes are public. To add authentication protection:

```jsx
// Example protected route
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```

## Development

To add new routes:
1. Create the component in the appropriate directory
2. Import the component in `App.jsx`
3. Add the route to the Routes component
4. Update the Navigation component if needed
5. Update this documentation

## File Structure

```
Client/src/
├── App.jsx                    # Main app with routes
├── Components/
│   ├── Navigation.jsx         # Navigation component
│   ├── QuizPageWrapper.jsx   # Quiz wrapper with API
│   ├── QuizDemo.jsx          # Interactive demo
│   ├── QuizWithAPI.jsx       # Simple API example
│   └── ...
├── Pages/
│   ├── Home.jsx              # Home page
│   ├── LoginPage.jsx         # Login page
│   ├── Register.jsx          # Registration page
│   ├── Dashboard.jsx         # Dashboard page
│   ├── QuizPage.jsx          # Core quiz component
│   └── ...
└── Examples/
    └── QuizIntegrationExample.jsx  # Integration examples
```
