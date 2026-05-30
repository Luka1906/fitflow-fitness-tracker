export const getTrendDays = (filterCriteria) => {
  const filterDays = [];

  for (let i = filterCriteria - 1; i >= 0; i--) {
    const date = new Date();

    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);

    filterDays.push(date);
  }

  return filterDays;
}

export const getTrendMonths = (logs = []) => {
  if (!logs.length) return [];

  const firstLogDate = new Date(logs[0].logged_at);
  const today = new Date();

  const months = [];

  const date = new Date(
    firstLogDate.getFullYear(),
    firstLogDate.getMonth(),
  );
  
  while (date <= today) {
    months.push(new Date(date));
    date.setMonth(date.getMonth() + 1);
  }

  return months;
};