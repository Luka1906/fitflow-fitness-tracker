import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { getWaterTrendData } from "../../../../utils/getWaterTrendData";

const statLabelsByFilter = {
  7: {
    average: "Average Daily Intake",
    best: "Best Day",
    goal: "Goal Days Met",
  },
  30: {
    average: "Average Daily Intake",
    best: "Best Day",
    goal: "Goal Days Met",
  },
  90: {
    average: "Average Weekly Intake",
    best: "Best Week",
    goal: "Goal Weeks Met",
  },
  all: {
    average: "Average Monthly Intake",
    best: "Best Month",
    goal: "Total Water Logged",
  },
};

const getGoalValue = (filterCriteria, data, waterGoal, total) => {
  if (filterCriteria === 7 || filterCriteria === 30) {
    const goalDaysMet = data.filter((d) => d >= waterGoal).length;
    return `${goalDaysMet}/${data.length} days`;
  }

  if (filterCriteria === 90) {
    const goalWeekMet = data.filter((d) => d >= waterGoal * 7).length;
    return `${goalWeekMet}/${data.length} weeks`;
  }

  return `${total.toLocaleString()} ml`;
};

export default function WaterChartStats({
  filterCriteria,
  waterLogs,
  waterGoal,
}) {
  const { chartData } = getWaterTrendData(waterLogs, filterCriteria);
  const total = chartData.reduce((sum, amount) => sum + amount, 0);
  const average = Math.round(total / chartData.length);
  const best = Math.max(...chartData);

  const labels = statLabelsByFilter[filterCriteria];

  const stats = [
    {
      label: labels.average,
      value: `${average.toLocaleString()} ml`,
    },
    {
      label: labels.best,
      value: `${best.toLocaleString()} ml`,
    },
    {
      label: labels.goal,
      value: getGoalValue(filterCriteria, chartData, waterGoal, total),
    },
  ];
  return (
    <div className="grid grid-cols-3 bg-accent-dark/10 py-3 rounded-xl">
      {stats.map((stat) => (
        <div className="flex flex-col items-center border-r border-white/15">
          <p className="text-sm font-semibold text-text-primary-paragraph">
            {" "}
            <span className="">{stat.value}</span>
          </p>
          <p className="text-xs text-slate-400">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
