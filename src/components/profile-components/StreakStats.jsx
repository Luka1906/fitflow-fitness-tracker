import { MdLocalFireDepartment } from "react-icons/md";
import { getFilteredData } from "../../utils/getFilteredData";
import { FiTrendingUp, FiActivity } from "react-icons/fi";
import { FaRegClock } from "react-icons/fa6";

// Helper functions

const getLastSevenDays = (activeDays) => {
  const weekDays = [];

  for (let i = 6; i >= 0; i--) {
    const currentDate = new Date();

    currentDate.setDate(currentDate.getDate() - i);
    currentDate.setHours(0, 0, 0, 0);

    weekDays.push({
      label: currentDate.toLocaleDateString("en-US", {
        weekday: "short",
      }),
      active: activeDays.has(currentDate.toISOString()),
    });
  }

  return weekDays;
};

const getActiveDays = (weeklyWorkouts) => {
  const activeDays = new Set();

  weeklyWorkouts.forEach((workout) => {
    activeDays.add(workout.logged_at);
  });

  return activeDays;
};

const getFormattedTrainingTime = (trainingTime) => {
  const totalHours = Math.floor(trainingTime / 60);
  const totalMinutes = Math.round(trainingTime % 60);

  if (trainingTime <= 0) return "0min";
  if (trainingTime < 60) return `${Math.round(trainingTime)}min`;
  if (totalMinutes === 0) return `${totalHours}h`;

  return `${totalHours}h ${String(totalMinutes).padStart(2, "0")}min`;
};

export function StreakStats({ workouts }) {
  const weeklyWorkouts = getFilteredData(workouts, 7);
  const activeDays = getActiveDays(weeklyWorkouts);

  const activeDaysCount = activeDays.size;
  const weekDays = getLastSevenDays(activeDays);

  const weeklyConsistency = Math.round(
    (activeDaysCount / weekDays.length) * 100,
  );

  const trainingTime = weeklyWorkouts.reduce(
    (total, workout) =>
      total + (Number(workout.workout_duration) || 0),
    0,
  );

  const formattedTrainingTime =
    getFormattedTrainingTime(trainingTime);

  const averageTrainingTime =
    weeklyWorkouts.length > 0
      ? getFormattedTrainingTime(
          trainingTime / weeklyWorkouts.length,
        )
      : "0min";

  return (
    <section className="w-full rounded-2xl border border-white/10 bg-slate-800/10 px-3 py-5 sm:px-5">
      <div className="grid gap-5 xl:grid-cols-6 xl:items-center xl:gap-0">
        {/* Active Days */}
        <div className="flex items-center justify-center xl:px-3">
          <div className="flex items-center gap-3">
            <MdLocalFireDepartment className="shrink-0 text-3xl text-orange-400" />

            {activeDaysCount > 0 ? (
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-white">
                  {activeDaysCount} Active{" "}
                  {activeDaysCount === 1 ? "Day" : "Days"}
                </p>

                <p className="text-sm text-slate-400">
                  Last {weekDays.length} days
                </p>
              </div>
            ) : (
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-white">
                  Build Your Streak
                </p>

                <p className="text-sm text-slate-400">
                  Log your first workout
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Weekday circles */}
        <div className="xl:col-span-2">
          <div className="grid grid-cols-7 items-center gap-1 border-y border-white/10 px-1 py-4 min-[400px]:gap-2 sm:gap-4 sm:px-3 xl:border-x xl:border-y-0 xl:py-2">
            {weekDays.map((weekDay, index) => (
              <div
                key={`${weekDay.label}-${index}`}
                className="flex min-w-0 flex-col items-center gap-2"
              >
                <p className="text-[10px] font-semibold text-slate-300 min-[380px]:text-xs sm:text-sm">
                  {weekDay.label}
                </p>

                <div
                  className={`flex items-center justify-center rounded-full border p-1 ${
                    weekDay.active
                      ? "border-orange-400"
                      : "border-white/10"
                  }`}
                >
                  <div
                    className={`h-3 w-3 rounded-full min-[380px]:h-4 min-[380px]:w-4 ${
                      weekDay.active
                        ? "bg-orange-400"
                        : "bg-white/10"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 divide-x divide-white/10 xl:contents">
          {/* Consistency */}
          <div className="flex min-w-0 flex-col items-center justify-center gap-2 px-1 text-center sm:flex-row sm:gap-3 sm:px-3 sm:text-left xl:border-r xl:border-white/10">
            <FiTrendingUp className="shrink-0 text-lg text-cta-dark md:text-xl" />

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white sm:text-base md:text-lg">
                {weeklyConsistency}%
              </p>

              <p className="text-[10px] leading-tight text-slate-500 sm:text-xs">
                <span className="sm:hidden">Consistency</span>
                <span className="hidden sm:inline">
                  7-day consistency
                </span>
              </p>
            </div>
          </div>

          {/* Total Workout Time */}
          <div className="flex min-w-0 flex-col items-center justify-center gap-2 px-1 text-center sm:flex-row sm:gap-3 sm:px-3 sm:text-left xl:border-r xl:border-white/10">
            <FaRegClock className="shrink-0 text-lg text-cta-dark md:text-xl" />

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white sm:text-base md:text-lg">
                {formattedTrainingTime}
              </p>

              <p className="text-[10px] leading-tight text-slate-500 sm:text-xs">
                <span className="sm:hidden">Total</span>
                <span className="hidden sm:inline">
                  Total workout
                </span>
              </p>
            </div>
          </div>

          {/* Average Workout */}
          <div className="flex min-w-0 flex-col items-center justify-center gap-2 px-1 text-center sm:flex-row sm:gap-3 sm:px-3 sm:text-left">
            <FiActivity className="shrink-0 text-lg text-cta-dark md:text-xl" />

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white sm:text-base md:text-lg">
                {averageTrainingTime}
              </p>

              <p className="text-[10px] leading-tight text-slate-500 sm:text-xs">
                <span className="sm:hidden">Average</span>
                <span className="hidden sm:inline">
                  Avg workout
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}