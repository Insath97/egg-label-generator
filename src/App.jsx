import React from 'react';
import { ControlPanel } from './components/ControlPanel';
import { LabelPreview } from './components/LabelPreview';
import { useLabelGenerator } from './hooks/useLabelGenerator';
import { useZoom } from './hooks/useZoom';

function App() {
  const { formData, updateFormData, generateLabels } = useLabelGenerator();
  const { zoom, adjustZoom, fitToScreen } = useZoom();
  
  const { labels, pageCountInfo } = generateLabels();

  return (
    <div className="bg-slate-100 h-screen flex flex-col lg:flex-row overflow-hidden text-slate-800">
      <ControlPanel 
        formData={formData}
        updateFormData={updateFormData}
        pageCountInfo={pageCountInfo}
      />
      
      <LabelPreview 
        labels={labels}
        zoom={zoom}
      />

      {/* Zoom Controls */}
      <div className="no-print absolute top-4 right-4 z-10 flex gap-2">
        <button 
          onClick={() => adjustZoom(-0.1)}
          className="bg-white p-2 rounded-lg shadow text-slate-600 hover:text-farm-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
        <button 
          onClick={fitToScreen}
          className="bg-white px-3 py-2 rounded-lg shadow text-xs font-bold text-slate-600 hover:text-farm-600"
        >
          Fit
        </button>
        <button 
          onClick={() => adjustZoom(0.1)}
          className="bg-white p-2 rounded-lg shadow text-slate-600 hover:text-farm-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default App;