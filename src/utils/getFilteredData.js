import { createLocalDate } from "./createLocalDate";

export const getFilteredData = (data, days) => {
  if (days === "all") return data;
  
  const currentDate = new Date();
  const cutOffDate = new Date(currentDate);
  cutOffDate.setDate(cutOffDate.getDate() - days);
  cutOffDate.setHours(0, 0, 0, 0);

  const filteredData = data.filter((item) => {
    const dataDate = createLocalDate(item.logged_at)
    return dataDate >= cutOffDate;
  });
  return filteredData;
};