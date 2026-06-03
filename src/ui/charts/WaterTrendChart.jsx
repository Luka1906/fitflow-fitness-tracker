import { getTrendDays, getTrendMonths } from "../../utils/getTrendDates";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const formatWaterChartLabel = (date, filterCriteria, waterGoal) => {
  if (filterCriteria === 7)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
    });

  if (filterCriteria === 30 || filterCriteria === 90) {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
  });
};

export default function WaterTrendChart({
  waterLogs,
  filterCriteria,
  waterGoal,
}) {
  const trendDates =
    filterCriteria === "all"
      ? getTrendMonths(waterLogs)
      : getTrendDays(filterCriteria);

  const waterByDay = {};
  const waterByMonth = {};

  waterLogs.forEach((log) => {
    const date = new Date(log.logged_at);
    console.log(date);
    const dayKey = log.logged_at.slice(0, 10);
    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
    if (!waterByDay[dayKey]) {
      waterByDay[dayKey] = 0;
    }

    if (!waterByMonth[monthKey]) {
      waterByMonth[monthKey] = 0;
    }

    waterByDay[dayKey] += log.amount;
    waterByMonth[monthKey] += log.amount;
  });
  console.log(waterByMonth);
  console.log(trendDates);

  const labels = trendDates.map((date) =>
    formatWaterChartLabel(date, filterCriteria),
  );

  const chartData = trendDates.map((date) => {
    if (filterCriteria === "all") {
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      return waterByMonth[monthKey] ?? 0;
    }
    const dayKey = date.toLocaleDateString("en-CA");
    return waterByDay[dayKey] ?? 0;
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Water Log",
        data: chartData,
        backgroundColor: "#2563eb",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
         ticks: {
          color: "#94a3b8",
           maxTicksLimit: 8
        },
      },
      y: {
        grid: {
          color: "rgba(148, 163, 184, 0.12)",
        },
        ticks: {
          color: "#94a3b8",
          padding: 10,
        },
      },
    },
  };

  return <Bar data={data} options={options}></Bar>;
}
