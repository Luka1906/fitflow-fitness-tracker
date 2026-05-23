//adjust the time difference helper function
export const createLocalDate = (dateString) => {
  const [year, month, day] = dateString.split("T")[0].split("-");
  return new Date(year, month - 1, day);
};
