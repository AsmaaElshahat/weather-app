export const getDateAndDay = (epochTime) => {
  const date = new Date(epochTime * 1000); // Convert seconds to milliseconds

  const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }); // e.g., Monday

  return { date: formattedDate, day: dayName };
};
