import React from "react";

const QuestionCard = ({
  question,
  options,
  selectedAnswer,
  onAnswerSelect,
  questionNumber,
  totalQuestions,
  category,
  difficulty,
  type,
  isMarkedForReview,
  onMarkForReview,
}) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category) => {
    // Simple category icons based on common categories
    if (category?.toLowerCase().includes("science")) return "🔬";
    if (category?.toLowerCase().includes("entertainment")) return "🎬";
    if (category?.toLowerCase().includes("history")) return "📚";
    if (category?.toLowerCase().includes("sports")) return "⚽";
    return "📝";
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{getCategoryIcon(category)}</span>
            <span className="text-sm text-gray-600">Category: {category}</span>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
              difficulty
            )}`}
          >
            Difficulty: {difficulty}
          </span>
        </div>
        <div className="text-sm text-gray-500">
          {type === "boolean" ? "True/False" : "Multiple Choice"}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-1 mb-6">
        <div
          className="bg-gradient-to-r from-purple-500 to-blue-500 h-1 rounded-full transition-all duration-300"
          style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question */}
      <h4 className="text-xs font-semibold text-gray-800 mb-6 leading-relaxed">
        {question}
      </h4>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {options.map((option, index) => (
          <label
            key={index}
            className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedAnswer === option
                ? "border-blue-500 bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <input
              type={type === "boolean" ? "radio" : "radio"}
              name={`question-${questionNumber}`}
              value={option}
              checked={selectedAnswer === option}
              onChange={() => onAnswerSelect(option)}
              className="sr-only"
            />
            <div
              className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                selectedAnswer === option
                  ? "border-white bg-white"
                  : "border-gray-300"
              }`}
            >
              {selectedAnswer === option && (
                <div className="w-2 h-2 rounded-full bg-blue-500" />
              )}
            </div>
            <span className="text-sm font-medium">{option}</span>
          </label>
        ))}
      </div>

      {/* Mark for Review Button */}
      <button
        onClick={onMarkForReview}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
          isMarkedForReview
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        {isMarkedForReview ? "✓ Marked for Review" : "Mark for Review"}
      </button>
    </div>
  );
};

export default QuestionCard;
