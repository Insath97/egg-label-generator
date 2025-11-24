export const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-GB");
};

export const getDefaultDates = () => {
  const today = new Date();
  const future = new Date();
  future.setDate(today.getDate() + 14);

  return {
    packDate: today.toISOString().split("T")[0],
    expiryDate: future.toISOString().split("T")[0],
  };
};
