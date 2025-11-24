import React from 'react';
import { Input, Checkbox, Button } from '../UI';

export const ControlPanel = ({ formData, updateFormData, pageCountInfo }) => {
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
              placeholder="e.g. LKR 25.00"
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

        <Button onClick={() => window.print()}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Print / Save as PDF
        </Button>
        
        <p className="text-center text-xs text-slate-400 mt-3">
          {pageCountInfo}
        </p>
      </div>
    </div>
  );
};