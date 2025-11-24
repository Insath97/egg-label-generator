import { useState, useCallback } from "react";
import { formatDate, getDefaultDates } from "../utils/dateUtils";

const LABELS_PER_PAGE = 18;

export const useLabelGenerator = () => {
  const [formData, setFormData] = useState({
    companyName: "Sunny Side Farms",
    eggType: "Organic Free-Range",
    itemQty: "12",
    itemPrice: "LKR 18.00",
    labelCount: "18",
    packDate: getDefaultDates().packDate,
    expiryDate: getDefaultDates().expiryDate,
    handwritingMode: false,
    showCuttingLines: true,
  });

  const updateFormData = useCallback((field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const generateLabels = useCallback(() => {
    const {
      companyName,
      eggType,
      itemQty,
      itemPrice,
      labelCount,
      packDate,
      expiryDate,
      handwritingMode,
      showCuttingLines,
    } = formData;

    const count = parseInt(labelCount) || 0;
    const totalPages = Math.ceil(count / LABELS_PER_PAGE);

    const labels = [];
    let labelsCreated = 0;

    for (let p = 0; p < totalPages; p++) {
      const pageLabels = [];

      for (let i = 0; i < LABELS_PER_PAGE; i++) {
        if (labelsCreated >= count) {
          pageLabels.push(null); // Placeholder
          continue;
        }

        const valType = handwritingMode ? null : eggType;
        const valQty = handwritingMode ? null : `${itemQty} Eggs`;
        const valPrice = handwritingMode ? null : itemPrice;
        const valPack = handwritingMode ? null : formatDate(packDate);
        const valExp = handwritingMode ? null : formatDate(expiryDate);

        pageLabels.push({
          id: `label-${labelsCreated}`,
          company: companyName || "Sunny Side Farms",
          type: valType,
          qty: valQty,
          price: valPrice,
          packDate: valPack,
          expiryDate: valExp,
          showCuttingLines,
          handwritingMode,
        });

        labelsCreated++;
      }

      labels.push({
        id: `page-${p}`,
        labels: pageLabels,
      });
    }

    return {
      labels,
      totalPages,
      pageCountInfo: `Requires ${totalPages} Page${
        totalPages !== 1 ? "s" : ""
      }`,
    };
  }, [formData]);

  return {
    formData,
    updateFormData,
    generateLabels,
  };
};
