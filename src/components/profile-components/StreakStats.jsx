import { MdLocalFireDepartment } from "react-icons/md";
import { getWeeklyWorkouts } from "../../utils/getWeeklyWorkouts";
import {FiTrendingUp, FiActivity } from "react-icons/fi";
import { CiDumbbell } from "react-icons/ci";
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
    const totalMinutes = trainingTime % 60;
    if (trainingTime <= 0) return "0min";
    if(trainingTime <= 60) return trainingTime + "min"
    return totalHours + "h" + " " + totalMinutes + "min"

}

export function StreakStats({ workouts }) {
  const weeklyWorkouts = getWeeklyWorkouts(workouts)
  const activeDays = getActiveDays(weeklyWorkouts);

  const activeDaysCount = activeDays.size;
  const weekDays = getLastSevenDays(activeDays);

  const weeklyConsistency = Math.round(activeDaysCount / weekDays.length * 100);

  const trainingTime = weeklyWorkouts.reduce((total, workout) => total + Number(workout.workout_duration) || 0, 0);
  const formattedTrainingTime = getFormattedTrainingTime(trainingTime);
 
  const averageTrainingTime =
    weeklyWorkouts.length > 0
      ? getFormattedTrainingTime(trainingTime / weeklyWorkouts.length)
      : "0min";

return (
    <section className="w-full rounded-2xl border border-white/10 bg-slate-800/10 p-3">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-6 xl:gap-0  justify-center ">
        {/* Active Days */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3">
            <MdLocalFireDepartment className="text-3xl text-orange-400" />

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
        <div className="overflow-x-auto xl:col-span-2">
          <div className="flex min-w-max items-center justify-center gap-3 border-white/10 px-2 py-2 sm:gap-5 xl:border-x">
            {weekDays.map((weekDay) => (
              <div
                key={weekDay.label}
                className="flex flex-col items-center gap-2"
              >
                <p className="text-sm font-semibold text-slate-300">
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
                    className={`h-4 w-4 rounded-full ${
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
      
        {/* Consistency */}
        <div className="flex items-center justify-center gap-4 border-white/10 xl:border-r ml-5 xl:ml-0">
          <FiTrendingUp className="text-xl text-cta-dark" />

          <div>
            <p className="text-lg font-semibold text-white">
              {weeklyConsistency}%
            </p>

            <p className="text-xs text-slate-500 ">
              7-day consistency
            </p>
          </div>
        </div>

        {/* Total Workout Time */}
        <div className="flex items-center justify-center gap-4 border-white/10 xl:border-r">
          <FaRegClock className="text-xl text-cta-dark" />

          <div>
            <p className="text-lg font-semibold text-white">
              {formattedTrainingTime}
            </p>

            <p className="text-xs text-slate-500">
              Total workout
            </p>
          </div>
        </div>

        {/* Average Workout */}
        <div className="flex items-center justify-center gap-4">
          <FiActivity className="text-xl text-cta-dark" />

          <div>
            <p className="text-lg font-semibold text-white">
              {averageTrainingTime}
            </p>

            <p className="text-xs text-slate-500">
              Avg workout
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}