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

      // Add PDF capture class to body
      document.body.classList.add('pdf-capture-mode');

      // Create a new PDF instance
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: false
      });

      const totalSheets = sheets.length;
      
      for (let i = 0; i < totalSheets; i++) {
        const currentProgress = Math.round(((i + 1) / totalSheets) * 100);
        setProgress(currentProgress);

        const sheet = sheets[i];

        // Store original styles
        const originalTransform = sheet.style.transform;
        const originalPosition = sheet.style.position;
        const originalTop = sheet.style.top;
        const originalLeft = sheet.style.left;

        // Reset styles for clean capture (especially important for mobile)
        sheet.style.transform = 'none';
        sheet.style.position = 'absolute';
        sheet.style.top = '0';
        sheet.style.left = '0';
        sheet.style.width = '210mm';
        sheet.style.height = '297mm';

        // Use higher scale for mobile to prevent blurriness
        const isMobile = window.innerWidth < 768;
        const scale = isMobile ? 3 : 3;

        const canvas = await html2canvas(sheet, {
          scale: scale,
          useCORS: true,
          allowTaint: false, // Better for mobile
          backgroundColor: "#ffffff",
          logging: false,
          removeContainer: true,
          width: sheet.scrollWidth,
          height: sheet.scrollHeight,
          scrollX: 0,
          scrollY: -window.scrollY, // Account for mobile scroll
          onclone: (clonedDoc, element) => {
            // Force mobile-optimized rendering
            const clonedSheet = clonedDoc.querySelector('.a4-sheet');
            if (clonedSheet) {
              clonedSheet.style.transform = 'none';
              clonedSheet.style.position = 'absolute';
              clonedSheet.style.top = '0';
              clonedSheet.style.left = '0';
              clonedSheet.style.width = '210mm';
              clonedSheet.style.height = '297mm';
            }

            // Add high-quality rendering styles
            const style = document.createElement('style');
            style.textContent = `
              * {
                image-rendering: -webkit-optimize-contrast !important;
                image-rendering: crisp-edges !important;
                shape-rendering: crispEdges !important;
                -webkit-font-smoothing: antialiased !important;
                -moz-osx-font-smoothing: grayscale !important;
              }
              body {
                overflow: visible !important;
                position: relative !important;
              }
            `;
            clonedDoc.head.appendChild(style);
          }
        });

        // Restore original styles
        sheet.style.transform = originalTransform;
        sheet.style.position = originalPosition;
        sheet.style.top = originalTop;
        sheet.style.left = originalLeft;

        const imgData = canvas.toDataURL("image/png", 1.0);

        // Calculate dimensions
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (i > 0) {
          pdf.addPage();
        }

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

        await new Promise((resolve) => setTimeout(resolve, 200));
      }

      // Remove PDF capture class
      document.body.classList.remove('pdf-capture-mode');

      setProgress(100);
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Generate filename
      const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      const companyName = document.getElementById("companyName")?.value || "egg-labels";
      const sanitizedName = companyName.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
      const filename = `egg-labels-${sanitizedName}-${timestamp}.pdf`;

      pdf.save(filename);
      
    } catch (error) {
      console.error("PDF Generation Error:", error);
      // Remove PDF capture class on error
      document.body.classList.remove('pdf-capture-mode');
      alert("Failed to generate PDF. Please try again.");
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