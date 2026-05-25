import { Line } from "react-chartjs-2";
import { weeklyWeightData } from "../mockData/mockDashbordData";
import { FiTrendingDown } from "react-icons/fi";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
);

export default function WeightBannerChart() {
  const currentWeight = weeklyWeightData.data.at(-1);
  const initialWeight = weeklyWeightData.data.at(0);
  const weightDifference = currentWeight - initialWeight;

  const data = {
    labels: weeklyWeightData.labels,
    datasets: [
      {
        label: "Weight",
        data: weeklyWeightData.data,
        borderColor: "#38bdf8",
        backgroundColor: "rgba(56, 189, 248, 0.08)",
        fill: true,
        tension: 0.45,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#38bdf8",
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index",
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.95)",
        titleColor: "#ececec",
        bodyColor: "#ececec",
        borderColor: "rgba(255,255,255,0.1)",
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          label: (context) => `${context.raw} ${weeklyWeightData.unit}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#8c8c8c",
          font: {
            size: 10,
          },
        },
      },
      y: {
        display: false,
      },
    },
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="mt-1 text-2xl font-semibold text-white">
            {currentWeight}
            <span className="ml-1 text-sm font-normal text-slate-400">
              {weeklyWeightData.unit}
            </span>
          </p>

          <p className="mt-1 text-xs text-slate-400">Last 7 entries</p>
        </div>

        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-xs">
          <div className="flex items-center gap-1 font-semibold text-emerald-300">
            <FiTrendingDown className="text-sm" />
            <p>{Math.abs(weightDifference).toFixed(1)} lbs</p>
          </div>

          <p className="text-emerald-200/70">this week</p>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
