import { useState, useEffect, useRef } from 'react';

export const useTimer = (initialTime = 30 * 60, onTimeUp) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            if (onTimeUp) onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, timeLeft, onTimeUp]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const pause = () => setIsRunning(false);
  const resume = () => setIsRunning(true);
  const reset = () => {
    setTimeLeft(initialTime);
    setIsRunning(true);
  };

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    isRunning,
    pause,
    resume,
    reset
  };
};
