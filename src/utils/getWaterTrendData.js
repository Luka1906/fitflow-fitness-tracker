import { getTrendDays, getTrendWeeks, getTrendMonths } from "./getTrendDates";

const getWeekKey = (weekStart) => {
  const date = new Date(weekStart);
  const weekEnd = new Date(date);
  weekEnd.setDate(weekEnd.getDate() + 6);
  const weekKey = `${weekStart.getMonth() + 1}/${weekStart.getDate()}-${weekEnd.getMonth() + 1}/${weekEnd.getDate()}`;
  return weekKey;
};

export function getWaterTrendData(waterLogs, filterCriteria) {
  const trendDates =
    filterCriteria === "all"
      ? getTrendMonths(waterLogs)
      : filterCriteria === 90
        ? getTrendWeeks(Math.ceil(filterCriteria / 7))
        : getTrendDays(filterCriteria);

  const waterByDay = {};
  const waterByWeek = {};
  const waterByMonth = {};

  //Create weekly empty buckets first
  if (filterCriteria === 90) {
    trendDates.forEach((weekStart) => {
      const weekKey = getWeekKey(weekStart);
      waterByWeek[weekKey] = 0;
    });
  }

  waterLogs.forEach((log) => {
    const logDate = new Date(log.logged_at);
    const dayKey = log.logged_at.slice(0, 10);
    const monthKey = `${logDate.getFullYear()}-${logDate.getMonth()}`;
    if (!waterByDay[dayKey]) {
      waterByDay[dayKey] = 0;
    }

    if (!waterByMonth[monthKey]) {
      waterByMonth[monthKey] = 0;
    }

    waterByDay[dayKey] += log.amount;

    waterByMonth[monthKey] += log.amount;

    if (filterCriteria === 90) {
      trendDates.forEach((weekStart) => {
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        if (logDate >= weekStart && logDate <= weekEnd) {
          waterByWeek[getWeekKey(weekStart)] += log.amount;
        }
      });
    }
  });

  const chartData = trendDates.map((date) => {
    if (filterCriteria === "all") {
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      return waterByMonth[monthKey] ?? 0;
    }
    if (filterCriteria === 90) {
      return waterByWeek[getWeekKey(date)] ?? 0;
    }
    const dayKey = date.toLocaleDateString("en-CA");
    return waterByDay[dayKey] ?? 0;
  });

  return {
    trendDates,
    chartData,
    waterByDay,
    waterByWeek,
    waterByMonth,
  };
}