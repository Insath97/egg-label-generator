import React from 'react';
import { Label } from './Label';

export const LabelSheet = ({ labels, pageId }) => {
  return (
    <div className="a4-sheet">
      <div className="labels-grid">
        {labels.map((label, index) => 
          label ? (
            <Label key={`${pageId}-${index}`} {...label} />
          ) : (
            <div key={`placeholder-${pageId}-${index}`} className="opacity-0"></div>
          )
        )}
      </div>
    </div>
  );
};