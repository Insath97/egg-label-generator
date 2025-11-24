import React from 'react';
import { Input, Checkbox, Button } from '../UI';

export const ControlPanel = ({ 
  formData, 
  updateFormData, 
  pageCountInfo, 
  onExportPDF,
  isGeneratingPDF = false,
  pdfProgress = 0 
}) => {
  const handleInputChange = (field) => (e) => {
    updateFormData(field, e.target.value);
  };

  const handleCheckboxChange = (field) => (e) => {
    updateFormData(field, e.target.checked);
  };

  return (
    <div 
      id="sidebar-controls"
      className="w-full lg:w-[450px] bg-white h-full overflow-y-auto border-r border-slate-200 shadow-xl z-20 flex-shrink-0"
    >
      <div className="p-6 md:p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-farm-800 mb-2 tracking-tight">
            🥚 Label Studio
          </h1>
          <p className="text-slate-500 font-medium text-sm md:text-base">
            Create & Print Professional Labels
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 mb-8">
          <Input
            label="Company Name"
            value={formData.companyName}
            onChange={handleInputChange('companyName')}
            className="font-bold text-farm-800"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Egg Type"
              value={formData.eggType}
              onChange={handleInputChange('eggType')}
            />
            <Input
              label="Price"
              value={formData.itemPrice}
              onChange={handleInputChange('itemPrice')}
              placeholder="e.g. $5.00"
              className="font-bold text-green-700"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Quantity"
              type="number"
              value={formData.itemQty}
              onChange={handleInputChange('itemQty')}
            />
            <Input
              label="Label Count"
              type="number"
              value={formData.labelCount}
              onChange={handleInputChange('labelCount')}
              min="1"
              max="1000"
              className="font-bold text-farm-700"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Pack Date"
              type="date"
              value={formData.packDate}
              onChange={handleInputChange('packDate')}
            />
            <Input
              label="Expiry Date"
              type="date"
              value={formData.expiryDate}
              onChange={handleInputChange('expiryDate')}
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="flex flex-col gap-4 mb-8 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <Checkbox
            label="Handwriting Mode"
            checked={formData.handwritingMode}
            onChange={handleCheckboxChange('handwritingMode')}
          />
          <Checkbox
            label="Show Cutting Lines"
            checked={formData.showCuttingLines}
            onChange={handleCheckboxChange('showCuttingLines')}
          />
        </div>

        {/* Simple PDF Export Button */}
        <Button 
          onClick={onExportPDF}
          loading={isGeneratingPDF}
          progress={pdfProgress}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Save as PDF
        </Button>
        
        <p className="text-center text-xs text-slate-400 mt-3">
          {pageCountInfo}
        </p>

        {/* Quality Info */}
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 text-green-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-xs font-medium">Ultra High Quality PDF (Print Ready)</span>
          </div>
        </div>
      </div>
    </div>
  );
};