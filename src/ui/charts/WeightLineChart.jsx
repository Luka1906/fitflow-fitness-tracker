import { Line } from "react-chartjs-2";

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

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Title,
  Tooltip,
);

const WeightLineChart = ({ logs }) => {

  const chartLogs = logs.slice(-7)
    .map((log) => ({
      label: new Date(log.logged_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      value: Number(log.weight),
      unit: log.unit,
    }));
  console.log(logs);

   const data = {
    labels: chartLogs.map((log) => log.label),
    datasets: [
      {
        label: "Weight log",
        data: chartLogs.map((log) => log.value),
        borderColor: "#38bdf8",
        tension: 0.4,
        pointRadius: 3,
        hoverRadius:5
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
        callbacks: {
          label: (context) => `${context.raw} lbs`,
        },
      },
      title: {
        display: true,
        text: "Last 7 entries",
        color: "white",
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#64748b",
        },
      },

      y: {
        display: false,
      },
    },

  };
 

  return <Line options={options} data={data} />;
};

export default WeightLineChart;
