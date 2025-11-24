import React from 'react';

export const Input = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  className = '',
  ...props 
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-farm-500 focus:ring-2 focus:ring-farm-200 outline-none transition-all ${className}`}
        {...props}
      />
    </div>
  );
};