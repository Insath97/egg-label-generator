import { useState, useEffect } from "react";

export const useZoom = () => {
  const [zoom, setZoom] = useState(1);

  const fitToScreen = () => {
    const sheetWidth = 794; // A4 width in px at 96dpi (210mm)
    const padding = 40;
    const availableWidth = window.innerWidth - 450 - padding; // Subtract sidebar width

    let scale = availableWidth / sheetWidth;
    scale = Math.min(Math.max(scale, 0.3), 1.2);

    setZoom(scale);
  };

  const adjustZoom = (delta) => {
    setZoom((prev) => {
      const newZoom = prev + delta;
      return Math.min(Math.max(newZoom, 0.3), 2);
    });
  };

  useEffect(() => {
    fitToScreen();
    window.addEventListener("resize", fitToScreen);

    return () => window.removeEventListener("resize", fitToScreen);
  }, []);

  return { zoom, adjustZoom, fitToScreen };
};
