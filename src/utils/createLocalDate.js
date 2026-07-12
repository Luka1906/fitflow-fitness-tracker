//adjust the time difference helper function
export const createLocalDate = (dateString) => {
  if (!dateString) return null;

  const [year, month, day] = dateString.split("T")[0].split("-");

  return new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
  );
};