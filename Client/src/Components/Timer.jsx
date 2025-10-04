import React from 'react';

const Timer = ({ formattedTime, timeLeft, totalTime = 30 * 60 }) => {
  const percentage = ((totalTime - timeLeft) / totalTime) * 100;
  const isLowTime = timeLeft < 5 * 60; // Less than 5 minutes

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800">Time Remaining</h3>
        <div className={`text-2xl font-bold ${isLowTime ? 'text-red-600' : 'text-gray-800'}`}>
          {formattedTime}
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-1000 ${
            isLowTime ? 'bg-red-500' : 'bg-blue-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default Timer;
