import { useLoaderData } from "react-router-dom";
import { getYearDates } from "../../../../utils/getTrendDates";
import { useState } from "react";
import Tooltip from "../../../../ui/Tooltip";
import HeatmapStats from "./HeatmapStats";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const days = ["Mon", "Wed", "Fri"];

const allDates = getYearDates(new Date().getFullYear());

const getWorkoutLogs = (logs) => {
  const workoutLogs = {};

  logs.forEach((log) => {
    const logDate = log.logged_at.slice(0, 10);
    workoutLogs[logDate] = (workoutLogs[logDate] || 0) + 1;
  });

  return workoutLogs;
};

const weekSquares = [];

for (let i = 0; i < allDates.length; i += 7) {
  weekSquares.push(allDates.slice(i, i + 7));
}

const getSquareColor = (activity) => {
  if (activity === 0) return "bg-slate-700";
  if (activity === 1) return "bg-sky-950";
  if (activity === 2) return "bg-sky-800";
  if (activity === 3) return "bg-sky-600";
  return "bg-sky-400";
};

export default function WorkoutHeatMap() {
  const { workouts } = useLoaderData();
  console.log(workouts);
  const workoutLogs = getWorkoutLogs(workouts);

  const [tooltip, setTooltip] = useState(null);

  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-white">Activity Heatmap</h2>
          <p className="text-sm text-slate-500">
            Your workout activity over the last 365 days
          </p>
        </div>

        {/* Heatmap + Side Panel */}

        <div>
          <ul className="ml-8 flex gap-14 text-[0.8rem]">
            {months.map((month) => (
              <li key={month}>{month}</li>
            ))}
          </ul>

          <div className="flex">
            <ul className="flex flex-col gap-5 text-[0.8rem]">
              {days.map((day) => (
                <li key={day}>{day}</li>
              ))}
            </ul>

            <div className="flex gap-1 px-2 py-1">
              {weekSquares.map((week, index) => (
                <div key={index} className="flex flex-col gap-1">
                  {week.map((day) => {
                    const dateKey = day.toLocaleDateString("en-CA");
                    const activity = workoutLogs[dateKey] || 0;

                    return (
                      <div
                        key={dateKey}
                        onMouseEnter={(e) => {
                          setTooltip({
                            x: e.clientX,
                            y: e.clientY,
                            day,
                            activity,
                          });
                        }}
                        onMouseLeave={() => setTooltip(null)}
                        className={`h-3.5 w-3.5 rounded-sm ${getSquareColor(
                          activity,
                        )}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {tooltip && <Tooltip tooltip={tooltip} />}
          </div>

          {/* Legend */}
          <div className="mt-5 flex items-center gap-1 text-[0.8rem]">
            <span className="mr-1">Less</span>
            <div className="h-3 w-3 rounded-xs bg-slate-700" />
            <div className="h-3 w-3 rounded-xs bg-sky-950" />
            <div className="h-3 w-3 rounded-xs bg-sky-800" />
            <div className="h-3 w-3 rounded-xs bg-sky-600" />
            <div className="h-3 w-3 rounded-xs bg-sky-400" />
            <span className="ml-1">More</span>
          </div>
        </div>
      </div>
      {/* Side Insights */}
      <HeatmapStats logs={workoutLogs} />
    </div>
  );
}
