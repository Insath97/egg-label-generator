import React from 'react';

export const Button = ({ 
  children, 
  onClick, 
  className = '',
  variant = 'primary',
  loading = false,
  progress = 0,
  ...props 
}) => {
  const baseClasses = 'w-full py-3.5 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 relative overflow-hidden';
  
  const variants = {
    primary: 'bg-farm-700 hover:bg-farm-800 text-white',
    secondary: 'bg-slate-200 hover:bg-slate-300 text-slate-800'
  };

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`${baseClasses} ${variants[variant]} ${className} ${
        loading ? 'opacity-90 cursor-not-allowed' : ''
      }`}
      {...props}
    >
      {/* Animated Progress Bar */}
      {loading && (
        <div 
          className="absolute bottom-0 left-0 h-1 bg-farm-400 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      )}
      
      {/* Loading Spinner */}
      {loading ? (
        <div className="flex items-center gap-3 z-10">
          <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent"></div>
          <div className="text-left">
            <div className="text-sm font-semibold">Generating PDF...</div>
            <div className="text-xs opacity-90">{progress}% Complete</div>
          </div>
        </div>
      ) : (
        children
      )}
    </button>
  );
};