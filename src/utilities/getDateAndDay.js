export const getDateAndDay = (epochTime) => {
  const date = new Date(epochTime * 1000); // Convert seconds to milliseconds
  console.log(date.toISOString())

  const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
  const currtime = date.toISOString().split('T')[1].split('.')[0].split(":", 2).join(":"); // HH:00

  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }); // e.g., Monday

  return { date: formattedDate, day: dayName,  time: currtime};
};
