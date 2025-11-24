import React from 'react';
import { ControlPanel } from './components/ControlPanel';
import { LabelPreview } from './components/LabelPreview';
import { useLabelGenerator } from './hooks/useLabelGenerator';
import { useZoom } from './hooks/useZoom';
import { usePDFExport } from './hooks/usePDFExport';

function App() {
  const { formData, updateFormData, generateLabels } = useLabelGenerator();
  const { zoom, adjustZoom, fitToScreen } = useZoom();
  const { exportToPDF, isGenerating, progress } = usePDFExport();
  
  const { labels, pageCountInfo } = generateLabels();

  return (
    <div className="bg-slate-100 h-screen flex flex-col lg:flex-row overflow-hidden text-slate-800">
      <ControlPanel 
        formData={formData}
        updateFormData={updateFormData}
        pageCountInfo={pageCountInfo}
        onExportPDF={exportToPDF}
        isGeneratingPDF={isGenerating}
        pdfProgress={progress}
      />
      
      <LabelPreview 
        labels={labels}
        zoom={zoom}
      />

      {/* Zoom Controls */}
      <div className="no-print absolute top-4 right-4 z-10 flex gap-2">
        <button 
          onClick={() => adjustZoom(-0.1)}
          disabled={isGenerating}
          className="bg-white p-2 rounded-lg shadow text-slate-600 hover:text-farm-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </button>
        <button 
          onClick={fitToScreen}
          disabled={isGenerating}
          className="bg-white px-3 py-2 rounded-lg shadow text-xs font-bold text-slate-600 hover:text-farm-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Fit
        </button>
        <button 
          onClick={() => adjustZoom(0.1)}
          disabled={isGenerating}
          className="bg-white p-2 rounded-lg shadow text-slate-600 hover:text-farm-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Global Loading Overlay */}
      {isGenerating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl border border-slate-200">
            <div className="flex flex-col items-center gap-6">
              {/* Animated Spinner */}
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-farm-200 border-t-farm-600"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-farm-700">{progress}%</span>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-800 mb-2">Generating High-Quality PDF</h3>
                <p className="text-slate-600 mb-4">Creating print-ready labels with optimal quality...</p>
                
                {/* Progress Bar */}
                <div className="w-full bg-slate-200 rounded-full h-3 mb-3">
                  <div 
                    className="bg-gradient-to-r from-farm-500 to-farm-600 h-3 rounded-full transition-all duration-300 ease-out shadow-inner"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-slate-500 font-medium">{progress}% Complete</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;