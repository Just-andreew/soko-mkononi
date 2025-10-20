import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  shadow?: 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'md',
  hoverable = false
}) => {
  const paddingClasses = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };

  const shadowClasses = {
    sm: 'shadow-sm',
    md: 'shadow-card',
    lg: 'shadow-soft'
  };

  const classes = `
    bg-white rounded-lg border border-gray-100
    ${paddingClasses[padding]}
    ${shadowClasses[shadow]}
    ${hoverable ? 'hover:shadow-lg transition-shadow duration-200' : ''}
    ${className}
  `;

  return (
    <div className={classes}>
      {children}
    </div>
  );
};

export default Card;