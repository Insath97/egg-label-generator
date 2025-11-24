import React from 'react';

export const Label = ({ 
  company, 
  type, 
  qty, 
  price, 
  packDate, 
  expiryDate, 
  showCuttingLines,
  handwritingMode 
}) => {
  return (
    <div className={`relative ${showCuttingLines ? 'border border-dashed border-slate-300 rounded-lg p-1' : ''}`}>
      {showCuttingLines && (
        <div className="absolute -top-2 -left-2 bg-white text-slate-400 p-0.5 rounded-full z-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
          </svg>
        </div>
      )}
      
      <div className="bg-white border-2 border-farm-100 rounded-xl p-3 h-full flex flex-col shadow-sm relative overflow-hidden">
        <div className="bg-cream -mx-3 -mt-3 mb-2 py-1.5 px-3 text-center border-b border-farm-200">
          <h3 className="text-farm-800 font-extrabold text-[10px] uppercase tracking-widest">
            {company}
          </h3>
        </div>
        
        <div className="flex-1 flex flex-col justify-between text-[10px]">
          <div className="flex justify-between items-start border-b border-dashed border-slate-100 pb-0.5">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px] mt-0.5">Type</span>
            {handwritingMode ? (
              <div className="h-px w-16 bg-slate-300 mt-3"></div>
            ) : (
              <span className="font-bold text-slate-700 text-right w-2/3 leading-tight">{type}</span>
            )}
          </div>
          
          <div className="flex justify-between items-baseline border-b border-dashed border-slate-100 pb-0.5">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px]">Qty</span>
            {handwritingMode ? (
              <div className="h-px w-8 bg-slate-300 mt-3"></div>
            ) : (
              <span className="font-bold text-slate-700 text-right">{qty}</span>
            )}
          </div>
          
          <div className="flex justify-between items-baseline border-b border-dashed border-slate-100 pb-0.5">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px]">Price</span>
            {handwritingMode ? (
              <div className="h-px w-10 bg-slate-300 mt-3"></div>
            ) : (
              <span className="font-bold text-green-600 text-right">{price}</span>
            )}
          </div>
          
          <div className="flex justify-between items-baseline border-b border-dashed border-slate-100 pb-0.5">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px]">Packed</span>
            {handwritingMode ? (
              <div className="h-px w-16 bg-slate-300 mt-3"></div>
            ) : (
              <span className="font-bold text-slate-700 text-right">{packDate}</span>
            )}
          </div>
          
          <div className="flex justify-between items-baseline">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[8px]">Best Before</span>
            {handwritingMode ? (
              <div className="h-px w-16 bg-slate-300 mt-3"></div>
            ) : (
              <span className="font-bold text-red-500 text-right">{expiryDate}</span>
            )}
          </div>
        </div>
        
        <div className="absolute -bottom-1 -right-1 opacity-5 pointer-events-none">
          <span className="text-5xl">🥚</span>
        </div>
      </div>
    </div>
  );
};