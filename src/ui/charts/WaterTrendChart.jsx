import {
  getTrendDays,
  getTrendMonths,
  getTrendWeeks,
} from "../../utils/getTrendDates";
import { Bar } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { callback } from "chart.js/helpers";
import { getWaterTrendData } from "../../utils/getWaterTrendData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin,
);

const formatWaterChartLabel = (date, filterCriteria, waterGoal) => {
  if (filterCriteria === 7)
    return date.toLocaleDateString("en-CA", {
      weekday: "short",
      day: "numeric",
    });

  if (filterCriteria === 30) {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }

  if (filterCriteria === 90) {
    const weekEndDate = new Date(date);
    weekEndDate.setDate(weekEndDate.getDate() + 6);
    return `${date.getMonth() + 1}/${date.getDate()}-${weekEndDate.getMonth() + 1}/${weekEndDate.getDate()}`;
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
  const { trendDates, chartData } = getWaterTrendData(
    waterLogs,
    filterCriteria,
  );
  const labels = trendDates.map((date) =>
    formatWaterChartLabel(date, filterCriteria),
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Water Log",
        data: chartData,
        backgroundColor: "#2563eb",
        borderRadius: 5,
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
        tooltip: {
      displayColors: false,
      backgroundColor: "#1E293B",
      borderColor: "#334155",
      borderWidth: 1,

      titleColor: "#F8FAFC",
      bodyColor: "#CBD5E1",

      padding: 12,
      cornerRadius: 10,
    },
      annotation:
        filterCriteria !== "all" && filterCriteria !== 90
          ? {
              annotations: {
                waterGoalLine: {
                  type: "line",
                  yMin: waterGoal,
                  yMax: waterGoal,
                  borderColor: "#38bdf8",
                  borderDash: [6, 6],
                  borderWidth: 2,
                },
              },
            }
          : {},
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#94a3b8",
          maxTicksLimit: 8,
        },
      },
      y: {
        grid: {
          color: "rgba(148, 163, 184, 0.12)",
        },
        grace: "10%",
        ticks: {
          callback: (value) => `${value} ml`,
          color: "#94a3b8",
          padding: 10,
        },
      },
    },
  };

  return <Bar data={data} options={options}></Bar>;
}
