import { weeklyWorkouts } from "../mockData/mockDashbordData";

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

export default function WorkoutBannerChart() {
  const data = {
    labels: weeklyWorkouts.label,
    datasets: [
      {
        label: "Weekly Sets",
        data: weeklyWorkouts.data,
        backgroundColor: "#2563eb",
        borderRadius: "3",
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
        },
      },
      y: {
        grid: {
          color: "rgba(255,255,255,0.05)",
        },

        ticks: {
          color: "rgba(148, 163, 184, 0.7)",
        },
      },
    },
  };



  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <div className="flex flex-col py-2 px-3 rounded-xl bg-white/5">
          <p className="text-lg text-white font-semibold">
            {weeklyWorkouts.data.length}
          </p>
          <p className="text-xs text-slate-400">workouts this week</p>
        </div>
        <div className="flex flex-col  py-2 px-3 rounded-xl bg-white/5">
          <p className=" text-lg text-white font-semibold">
            {weeklyWorkouts.data.reduce((total, set) => total + set, 0)}
          </p>
          <p className="text-xs text-slate-400">total sets</p>
        </div>
      </div>

      <div className="mt-5 bg-white/5 rounded-xl p-2 ">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
