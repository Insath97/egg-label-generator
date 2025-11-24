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

      // Create a new PDF instance
      const pdf = new jsPDF("p", "mm", "a4");

      for (let i = 0; i < sheets.length; i++) {
        // Update progress
        const currentProgress = Math.round(((i + 1) / sheets.length) * 100);
        setProgress(currentProgress);

        const sheet = sheets[i];

        // Convert the sheet to canvas
        const canvas = await html2canvas(sheet, {
          scale: 2, // Higher quality
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/png");

        // Calculate dimensions to fit A4
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Add image to PDF
        if (i > 0) {
          pdf.addPage();
        }

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

        // Small delay to show progress
        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      setProgress(100);

      // Brief delay to show completion
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
