import { Line } from "react-chartjs-2";
import { weeklyWeightData } from "../mockData/mockDashbordData";
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

export default function WeightBannerChart() {
  const data = {
    labels: weeklyWeightData.labels,
    datasets: [
      {
        label: "Weight Log",
        data: weeklyWeightData.data,
        borderColor: "#38bdf8",
        tension: 0.4,
        pointRadius: 3,
        hoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Last 7 entries",
        color: "white",
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw} lbs`,
        },
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
  return <Line data={data} options={options} />;
}
