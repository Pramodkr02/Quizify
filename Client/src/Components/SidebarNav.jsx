import React from 'react';

const SidebarNav = ({ 
  questions, 
  currentQuestionIndex, 
  answers, 
  markedForReview, 
  onQuestionSelect 
}) => {
  const getQuestionStatus = (index) => {
    if (index === currentQuestionIndex) return 'current';
    if (markedForReview.includes(index)) return 'marked';
    if (answers[index] !== null && answers[index] !== undefined) return 'answered';
    return 'unvisited';
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'current':
        return 'bg-white border-2 border-blue-500 text-blue-600 font-semibold';
      case 'answered':
        return 'bg-orange-500 text-white';
      case 'marked':
        return 'bg-blue-500 text-white';
      case 'unvisited':
      default:
        return 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Questions</h3>
      <div className="grid grid-cols-5 gap-2 max-h-96 overflow-y-auto">
        {questions.map((_, index) => {
          const status = getQuestionStatus(index);
          return (
            <button
              key={index}
              onClick={() => onQuestionSelect(index)}
              className={`w-10 h-10 rounded-lg text-sm font-medium transition-all duration-200 ${getStatusStyles(status)}`}
              aria-label={`Question ${index + 1} - ${status}`}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
      
      {/* Legend */}
      <div className="mt-4 space-y-2 text-xs">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded"></div>
          <span>Answered</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span>Marked for Review</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 border-2 border-blue-500 rounded"></div>
          <span>Current</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-white border border-gray-300 rounded"></div>
          <span>Unvisited</span>
        </div>
      </div>
    </div>
  );
};

export default SidebarNav;
