import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Title,
  Tooltip,
} from "chart.js";

import { getTrendDays, getTrendMonths } from "../../utils/getTrendDates";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Title,
  Tooltip,

);


const formatWeightChartLabel = (date, filterCriteria) => {
  if (filterCriteria === 7) {
    return date.toLocaleDateString("en-CA", {
      weekday: "short",
            day: "numeric"
    });
  }

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

export default function WeightTrendChart({ weightLogs = [], filterCriteria }) {

  const trendDates =
    filterCriteria === "all"
      ? getTrendMonths(weightLogs)
      : getTrendDays(filterCriteria);

  const weightsByDay = {};
  const weightsByMonth = {};

  weightLogs.forEach((log) => {
    const date = new Date(log.logged_at);

    const dayKey = log.logged_at.slice(0, 10);
    weightsByDay[dayKey] = Number(log.weight);
    

    const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
    weightsByMonth[monthKey] = Number(log.weight);
  });

  const labels = trendDates.map((date) =>
    formatWeightChartLabel(date, filterCriteria),
  );

  const chartData = trendDates.map((date) => {
    if (filterCriteria === "all") {
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      return weightsByMonth[monthKey] ?? null;
    }

    const dayKey = date.toLocaleDateString("en-CA");
    return weightsByDay[dayKey] ?? null;
  });

  const lastDataIndex = chartData.findLastIndex((value) => value !==null)

  const data = {
    labels,
    datasets: [
      {
        label: "Weight log",
        data: chartData,
        borderColor: "#38bdf8",
        backgroundColor: "rgba(56, 189, 248, 0.05)",
        fill: true,
        tension: 0.4,
        spanGaps: true,
        pointRadius: 3,
        hoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
    padding: {
      right: 70,
    },
  },

    plugins: {
      legend: {
        display: false,
      },
       datalabels: {
    display: (context) => context.dataIndex === lastDataIndex,
    align: "right",

    anchor: "end",
    offset: 0,
color: "#cbd5e1",
    font: {
      weight: "600",
      size: 12,
    },
    formatter: (value, context) => {
        const latestDate = labels[context.dataIndex];
        return `${value} lbs\n ${latestDate} `

    }
    }
},
    scales: {
      y: {
        grid: {
        color: "rgba(148, 163, 184, 0.12)",
        },
        grace: "10%",
        ticks: {
          color: "#94a3b8",
           padding: 10,
           callback: (value) => `${value} lbs`
        },
      },
      x: {
        grid: {
            display: false
        },
        ticks: {
          color: "#94a3b8",
            maxTicksLimit: 8,
          
          
     
        },
      },
    },
  };

  return (
    
      <Line data={data} options={options} plugins={[ChartDataLabels]} />

  );
}
