import React from 'react';
import { LabelSheet } from './LabelSheet';

export const LabelPreview = ({ labels, zoom }) => {
  return (
    <div id="preview-area" className="flex-1 bg-slate-200/50 h-full overflow-hidden relative flex flex-col">
      {/* Zoom Controls */}
      <div className="no-print absolute top-4 right-4 z-10 flex gap-2">
        <button 
          onClick={() => window.print()}
          className="bg-white p-2 rounded-lg shadow text-slate-600 hover:text-farm-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
        </button>
      </div>

      <div id="preview-scroll-container" className="flex-1 overflow-auto p-4 md:p-10 flex justify-center items-start">
        <div 
          id="pagesContainer" 
          className="origin-top transition-transform duration-200"
          style={{ transform: `scale(${zoom})` }}
        >
          {labels.map((page) => (
            <LabelSheet 
              key={page.id} 
              labels={page.labels} 
              pageId={page.id} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};