
import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface AnimatedContentProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({ children, className }) => {
  const { ref, isInView } = useScrollAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className || ''}`}
    >
      {children}
    </div>
  );
};

export default AnimatedContent;
