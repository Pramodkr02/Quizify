import React, { useState, useEffect } from 'react';

const RateLimitIndicator = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    // Check for rate limit status from localStorage or API
    const checkRateLimit = () => {
      const lastRequest = localStorage.getItem('lastAPIRequest');
      const requestCount = parseInt(localStorage.getItem('requestCount') || '0');
      const now = Date.now();
      
      if (lastRequest) {
        const timeSinceLastRequest = now - parseInt(lastRequest);
        const isLimited = requestCount >= 5 && timeSinceLastRequest < 60000; // 1 minute
        
        setIsRateLimited(isLimited);
        
        if (isLimited) {
          const remaining = Math.max(0, 60000 - timeSinceLastRequest);
          setTimeRemaining(remaining);
        }
      }
    };

    checkRateLimit();
    const interval = setInterval(checkRateLimit, 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (!isRateLimited) return null;

  const minutes = Math.floor(timeRemaining / 60000);
  const seconds = Math.floor((timeRemaining % 60000) / 1000);

  return (
    <div className="fixed top-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 rounded-lg shadow-lg z-50">
      <div className="flex items-center space-x-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <span className="text-sm font-medium">
          Rate Limited: {minutes}:{seconds.toString().padStart(2, '0')} remaining
        </span>
      </div>
    </div>
  );
};

export default RateLimitIndicator;
