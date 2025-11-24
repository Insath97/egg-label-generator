import React from 'react';

export const Button = ({ 
  children, 
  onClick, 
  className = '',
  variant = 'primary',
  ...props 
}) => {
  const baseClasses = 'w-full py-3.5 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2';
  
  const variants = {
    primary: 'bg-farm-700 hover:bg-farm-800 text-white',
    secondary: 'bg-slate-200 hover:bg-slate-300 text-slate-800'
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};