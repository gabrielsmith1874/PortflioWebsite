import React, { useState, useEffect } from 'react';

const TypingAnimation = ({ 
  text, 
  speed = 50, 
  delay = 0, 
  showCursor = true,
  isActive = true,
  onComplete = () => {},
  className = ""
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Reset when text changes or when component becomes active
  useEffect(() => {
    if (isActive) {
      setDisplayedText('');
      setCurrentIndex(0);
      setIsComplete(false);
    }
  }, [text, isActive]);

  useEffect(() => {
    if (!isActive) return;

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
  }, [currentIndex, text, speed, isComplete, onComplete, isActive]);

  useEffect(() => {
    if (delay > 0 && isActive) {
      const timeout = setTimeout(() => {
        setCurrentIndex(0);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (isActive) {
      setCurrentIndex(0);
    }
  }, [delay, isActive]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && isActive && !isComplete && <span className="animate-terminal-blink">█</span>}
    </span>
  );
};

export default TypingAnimation;
