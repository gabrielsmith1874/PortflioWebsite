import React, { useState, useEffect } from 'react';

const TypingAnimation = ({ 
  text, 
  speed = 50, 
  delay = 0, 
  showCursor = true,
  onComplete = () => {},
  className = ""
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete();
    }
  }, [currentIndex, text, speed, isComplete, onComplete]);

  useEffect(() => {
    if (delay > 0) {
      const timeout = setTimeout(() => {
        setCurrentIndex(0);
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      setCurrentIndex(0);
    }
  }, [delay]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && <span className="animate-terminal-blink">█</span>}
    </span>
  );
};

export default TypingAnimation;
