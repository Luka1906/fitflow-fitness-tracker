import { Bar } from "react-chartjs-2";
import { createLocalDate } from "../../utils/createLocalDate";
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

const WorkoutBarChart = ({ weeklyLogs }) => {
    console.log(weeklyLogs)

  const lastSevenDays = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    lastSevenDays.push(date);
  }
  console.log(lastSevenDays);

  // Create default chart structure
  const chartData = lastSevenDays.map((date) => ({
    label: date.toLocaleDateString("en-US", {
      day: "numeric",
      weekday: "short",
    }),
    dateKey: date.toLocaleDateString("en-CA"),
    sets: 0,
  }));

  // Fill chart with workout data
  weeklyLogs.forEach((log) => {
   const logDateKey = createLocalDate(log.logged_at).toLocaleDateString("en-CA")

    // Count total sets for this workout
    const totalSets = log.exercises.reduce(
      (total, exercise) => total + exercise.sets.length,
      0,
    );

    // Find matching weekday in chartData
    const existingDay = chartData.find((item) => item.dateKey === logDateKey);

    // Add sets to that day
    if (existingDay) {
      existingDay.sets += totalSets;
    }
  });

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

  const data = {
    labels: chartData.map((item) => item.label),

    datasets: [
      {
        label: "Weekly Sets",
        data: chartData.map((item) => item.sets),
        backgroundColor: "#2563eb",
        borderRadius: "3",
      },
    ],
  };

  return <Bar data={data} options={options} />;
};

export default WorkoutBarChart;
