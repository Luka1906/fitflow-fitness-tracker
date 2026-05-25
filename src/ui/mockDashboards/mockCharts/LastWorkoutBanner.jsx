import { HiOutlineClock } from "react-icons/hi2";
import { todaysWorkouts } from "../mockData/mockDashbordData";

export default function LastWorkoutBanner() {
  const lastWorkout = todaysWorkouts.at(-1);

  if (!lastWorkout) return null;

  const setNumber = lastWorkout.exercises.reduce(
    (total, exercise) => total + exercise.sets,
    0,
  );

  const displayedExercises = lastWorkout.exercises.slice(0, 3);

  return (
    <div className="flex  flex-col justify-between">
      <div>
        <div className="mb-4 flex items-start justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22rem] text-slate-500">
              Last workout
            </p>

            <h2 className="mt-2 text-2xl font-semibold  text-white">
              {lastWorkout.exercises.at(-1).name}
            </h2>
          </div>

          <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            <HiOutlineClock className="text-sm" />
            <span>Today</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-400">
          <p>{lastWorkout.exercises.length} exercises</p>

          <div className="h-1 w-1 rounded-full bg-slate-600" />

          <p>{setNumber} sets</p>
        </div>
      </div>

      <ul className="mt-5 flex flex-wrap gap-2">
        {displayedExercises.map((exercise) => (
          <li
            key={exercise.name}
            className="
              rounded-full border border-white/10
              bg-white/[0.04]
              px-3 py-1.5
              text-xs font-medium text-slate-300
              transition hover:bg-white/[0.08]
            "
          >
            {exercise.name}
          </li>
        ))}

        {lastWorkout.exercises.length > 3 && (
          <li
            className="
              rounded-full border border-white/10
              bg-white/[0.03]
              px-3 py-1.5
              text-xs font-medium text-slate-500
            "
          >
            +{lastWorkout.exercises.length - 3}
          </li>
        )}
      </ul>
    </div>
  );
}