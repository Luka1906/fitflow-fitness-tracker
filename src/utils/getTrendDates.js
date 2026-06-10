export const getTrendDays = (filterCriteria) => {
  const filterDays = [];

  for (let i = filterCriteria - 1; i >= 0; i--) {
    const date = new Date();

    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);

    filterDays.push(date);
  }

  return filterDays;
};

export const getTrendWeeks = (weekCount) => {
  const weeks = [];
  for (let i = weekCount - 1; i >= 0; i--) {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - i * 7);
    weekStart.setHours(0, 0, 0, 0);
    weeks.push(weekStart);
  }
  return weeks;
};

export const getTrendMonths = (logs = []) => {
  console.log(logs.length);
  if (!logs.length) return [];

  const firstLogDate = new Date(logs[0].logged_at);
  const today = new Date();

  const months = [];

  const date = new Date(firstLogDate.getFullYear(), firstLogDate.getMonth(), 1);

  while (date <= today) {
    months.push(new Date(date));
    date.setMonth(date.getMonth() + 1);
  }

  return months;
};
export const getYearDates = (year) => {
  const dates = [];
  const beginning = new Date(year, 0, 1);
  const end = new Date (year, 11, 31);

  while (beginning <= end) {
    dates.push(new Date(beginning));
    beginning.setDate(beginning.getDate() +1);
  }
  return dates;
}
