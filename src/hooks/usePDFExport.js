import { useCallback, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const usePDFExport = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const exportToPDF = useCallback(async () => {
    try {
      setIsGenerating(true);
      setProgress(0);

      // Get all A4 sheets
      const sheets = document.querySelectorAll(".a4-sheet");

      if (sheets.length === 0) {
        alert("No labels to export!");
        setIsGenerating(false);
        return;
      }

      // Create a new PDF instance with high quality settings
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: false // Disable compression for better quality
      });

      const totalSheets = sheets.length;
      
      for (let i = 0; i < totalSheets; i++) {
        // Update progress
        const currentProgress = Math.round(((i + 1) / totalSheets) * 100);
        setProgress(currentProgress);

        const sheet = sheets[i];

        // Detect device and set appropriate scale
        const isMobile = window.innerWidth < 768;
        const scale = isMobile ? 4 : 3; // Higher scale for mobile

        // Store original transform for restoration
        const originalTransform = sheet.style.transform;
        sheet.style.transform = 'scale(1)'; // Reset any zoom

        // High quality canvas rendering with device-optimized settings
        const canvas = await html2canvas(sheet, {
          scale: scale, // Dynamic scale based on device
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
          logging: false,
          removeContainer: true,
          width: sheet.scrollWidth,
          height: sheet.scrollHeight,
          onclone: (clonedDoc) => {
            // Force high-quality rendering
            const style = document.createElement('style');
            style.textContent = `
              * {
                image-rendering: -webkit-optimize-contrast !important;
                image-rendering: crisp-edges !important;
                shape-rendering: crispEdges !important;
              }
            `;
            clonedDoc.head.appendChild(style);
          }
        });

        // Restore original transform
        sheet.style.transform = originalTransform;

        // Use PNG with maximum quality
        const imgData = canvas.toDataURL("image/png", 1.0);

        // Calculate dimensions to fit A4 perfectly
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Add image to PDF
        if (i > 0) {
          pdf.addPage();
        }

        pdf.addImage(
          imgData, 
          "PNG", 
          0, 
          0, 
          imgWidth, 
          imgHeight,
          undefined,
          'FAST' // Better for high-res images
        );

        // Small delay to show progress
        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      setProgress(100);
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      const companyName =
        document.getElementById("companyName")?.value || "egg-labels";
      const sanitizedName = companyName
        .replace(/[^a-zA-Z0-9]/g, "-")
        .toLowerCase();
      const filename = `egg-labels-${sanitizedName}-${timestamp}.pdf`;

      // Save the PDF
      pdf.save(filename);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  }, []);

  return {
    exportToPDF,
    isGenerating,
    progress,
  };
};