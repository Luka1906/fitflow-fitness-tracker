import { useLoaderData } from "react-router-dom";
import { getYearDates } from "../../../../utils/getTrendDates";

const weeks = [
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
const datesObj = {};
allDates.forEach((date) => {
  const transformedDate = date.toLocaleDateString("en-CA");
  datesObj[transformedDate] = 0;
});

const getWorkoutLogs = (logs) => {
  const workoutLogs = {};
  logs.forEach((log) => {
    const logDate = log.logged_at.slice(0, 10);
    if (workoutLogs[logDate]) {
      workoutLogs[logDate] += 1;
    } else {
      workoutLogs[logDate] = 1;
    }
  });

  return workoutLogs;
};

const weekSquares = [];
for (let i = 0; i < Object.keys(datesObj).length; i += 7) {
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
  const workoutLogs = getWorkoutLogs(workouts);

  return (
    // Header Section

    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-white font-semibold">Activity Heatmap</h2>
        <p className="text-sm text-slate-500">
          Your workout activity over the last 365 days
        </p>
      </div>

      {/* Heatmap Section */}

      <div>
        <ul className="flex text-xs gap-12.5 ml-8">
          {weeks.map((week) => (
            <li key={week}>{week}</li>
          ))}
        </ul>

        <div className="flex">
          <ul className="flex flex-col text-xs gap-5">
            {days.map((day) => (
              <li key={day}>{day}</li>
            ))}
          </ul>
          {/* Heatmap */}
          <div className="flex px-2 py-1 gap-1">
            {weekSquares.map((week, index) => (
              <div key={index} className="flex flex-col gap-1">
                {week.map((day) => {
                  const dateKey = day.toLocaleDateString("en-CA");
                  const activity = workoutLogs[dateKey] || 0;

                  return (
                    <div
                      key={dateKey}
                      className={`h-3 w-3 rounded-sm ${getSquareColor(activity)}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-1 text-xs items-center">
        <span className="mr-1">Less</span>
        <div className="h-3 w-3 bg-slate-700 rounded-xs " />
        <div className="h-3 w-3 bg-sky-950 rounded-xs" />
        <div className="h-3 w-3 bg-sky-800 rounded-xs" />
        <div className="h-3 w-3 bg-sky-600 rounded-xs" />
        <div className="h-3 w-3 bg-sky-400 rounded-xs" />
        <span className="ml-1">More</span>
      </div>
    </div>
  );
}
