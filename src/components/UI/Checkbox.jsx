import React from 'react';

export const Checkbox = ({ 
  label, 
  checked, 
  onChange, 
  className = '' 
}) => {
  return (
    <label className={`flex items-center gap-3 cursor-pointer select-none ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 text-farm-600 rounded focus:ring-farm-500 border-gray-300"
      />
      <span className="font-semibold text-slate-700 text-sm">{label}</span>
    </label>
  );
};