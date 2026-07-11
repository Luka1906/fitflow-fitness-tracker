import { FaTrophy, FaRegCalendarCheck } from "react-icons/fa6";
import { createLocalDate } from "../../../../utils/createLocalDate";
import { MdLocalFireDepartment } from "react-icons/md";

// Returning workouts amounts per month

const getMonthActivity = (logs) => {
  const workoutsByMonth = {};
  Object.entries(logs).forEach(([date, activity]) => {
    const monthKey = date.slice(0, 7);
    workoutsByMonth[monthKey] = (workoutsByMonth[monthKey] || 0) + activity;
  });
  return workoutsByMonth;
};

// Get current workout streak

const getCurrentStreak = (logs) => {
  const dates = Object.keys(logs);

  if (dates.length === 0) return 0;
  const lastWorkout = dates.at(-1);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastDate = createLocalDate(lastWorkout);
  lastDate.setHours(0, 0, 0, 0);

  const difference = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

  if (difference > 1) return 0;

  let streak = 1;

  for (let i = dates.length - 1; i > 0; i--) {
    const current = createLocalDate(dates[i]);
    const previous = createLocalDate(dates[i - 1]);
    const diffDays = (current - previous) / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

export default function HeatmapStats({ logs }) {
  const workoutsByMonth = getMonthActivity(logs);
  const currentStreak = getCurrentStreak(logs);
  const monthEntries = Object.entries(workoutsByMonth);

  //    Get Most Active Month
  const mostActiveEntry =
    monthEntries.length > 0
      ? monthEntries.reduce((max, curr) => (curr[1] > max[1] ? curr : max))
      : null;

  const mostActiveMonth = mostActiveEntry
    ? new Date(
        Number(mostActiveEntry[0].split("-")[0]),
        Number(mostActiveEntry[0].split("-")[1]) - 1,
        1,
      ).toLocaleDateString("en-US", {
        month: "long",
      })
    : null;

  const mostActiveCount = mostActiveEntry?.[1] ?? 0;

  return (
    <>
      <div className="xl:border-l mt-6 md:mt-10 xl:mt-0 border-slate-700/60 xl:pl-6 xl:w-[25%]">
        <h3 className="text font-semibold text-white">Activity Insights</h3>

        {/* Most Active Month */}

        <div className="mt-4  grid md:grid-cols-3 gap-4 xl:flex xl:flex-col">
          <div className="rounded-lg bg-white/5 p-3 space-y-1">
            <div className="flex items-center gap-2">
              <div className="bg-amber-400/15 p-2.5 rounded-md">
                <FaTrophy className="text-amber-400 sm:text-lg " />
              </div>

              <p className="text-xs md:text-sm text-slate-400 tracking-widest">
                Most Active Month
              </p>
            </div>

            <p className="text-sm font-semibold text-white md:text-base">
              {mostActiveMonth
                ? `${mostActiveMonth} (${mostActiveCount} ${
                    mostActiveCount === 1 ? "workout" : "workouts"
                  })`
                : "No workouts yet"}
            </p>
          </div>

          {/* Current Streak */}

          <div className="rounded-lg bg-white/5 p-3 space-y-1">
            <div className="flex items-center gap-2">
              <div className="bg-orange-400/15 p-2 rounded-md">
                <MdLocalFireDepartment className="text-orange-400 text-xl  " />
              </div>

              <p className="text-xs md:text-sm text-slate-400 tracking-widest">
                Current Streak
              </p>
            </div>

            <p className="font-semibold text-sm md:text-base text-white">
              {`${currentStreak < 1 ? "No current streak" : `${currentStreak === 1 ? `${currentStreak} day` : `${currentStreak} days`}`}`}
            </p>
          </div>

          {/* Total Workouts */}

          <div className="rounded-lg bg-white/5 p-3 space-y-1 ">
            <div className="flex items-center gap-2">
              <div className="bg-sky-400/15 p-2.5 rounded-md">
                <FaRegCalendarCheck className="text-sky-400 sm:text-lg " />
              </div>
              <p className="text-xs md:text-sm text-slate-400 tracking-widest">
                Total Active Days
              </p>
            </div>

            <p className="font-semibold text-white text-sm md:text-base">
              {Object.keys(logs).length < 1
                ? "No active day"
                : Object.keys(logs).length === 1
                  ? `${Object.keys(logs).length} day`
                  : `${Object.keys(logs).length} days`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
