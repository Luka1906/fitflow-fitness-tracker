import { FiEdit2 } from "react-icons/fi";
import { useLoaderData } from "react-router-dom";
import getTodayLogs from "../../../../utils/getTodayLogs";
import WorkoutBarChart from "../../../../ui/charts/WorkoutBarChart";
import { createLocalDate } from "../../../../utils/createLocalDate";
import { Modal } from "../../../../ui/Modal";
import { useState } from "react";
import AddWorkoutForm from "../workout-card/AddWorkoutForm";
import { getWeeklyWorkouts } from "../../../../utils/getWeeklyWorkouts";


export function WorkoutCard() {
  const { workouts } = useLoaderData();
  
  const [activeModal, setActiveModal] = useState(false);



  const weeklyWorkouts = getWeeklyWorkouts(workouts);


// Get weekly workout sets 

  const weeklySetNumber = weeklyWorkouts.reduce(
  (total, workout) =>
    total +
    workout.exercises.reduce(
      (exerciseTotal, exercise) =>
        exerciseTotal + exercise.sets.length,
      0
    ),
  0
);

//   Get last workouut and workout set

  const lastWorkout = workouts?.[0];
  const lastWorkoutName = lastWorkout?.exercises?.at(-1).workout_name;
  const lastSetsNumber = lastWorkout.exercises.reduce(
    (total, exercise) => total + exercise.sets.length,
    0,
  );

  return (
    <div className="flex flex-col space-y-6 rounded-4xl border border-white/10 bg-white/5 p-5 text-white">
      {/* Header */}
      <section className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium tracking-wide text-slate-400">
            Workout activity
          </p>

          <h2 className="text-2xl font-semibold">Track your training</h2>
        </div>

        <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white cursor-pointer">
          <FiEdit2 />
        </button>
      </section>

      {/* Weekly Stats */}
      <section className="grid grid-cols-2 gap-4 rounded-3xl bg-bg-dark p-5">
        {/* Workouts */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-3xl font-bold text-white">
            {weeklyWorkouts.length}
          </p>

          <p className="mt-1 text-sm text-slate-400">workouts this week</p>
        </div>

        {/* Sets */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-3xl font-bold text-white">{weeklySetNumber}</p>

          <p className="mt-1 text-sm text-slate-400">total sets</p>
        </div>

        {/* Graph */}
        <div className="col-span-2 mt-2 flex h-40 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
          <WorkoutBarChart weeklyLogs={weeklyWorkouts}/>
        </div>
      </section>

      {/* Last Workout */}
      <section className="rounded-3xl border border-white/10 bg-bg-dark p-5">
        <p className="text-xs uppercase tracking-[0.2rem] text-slate-500">
          Last workout
        </p>

        <div className="mt-3">
          <h3 className="text-xl font-semibold text-white">
            {lastWorkoutName}
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            {lastWorkout.exercises.length}{" "}
            {lastWorkout.exercises.length <= 1 ? "exercise" : "exercises"} •{" "}
            {lastSetsNumber} sets • Today
          </p>
        </div>

        {/* Exercise tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {lastWorkout.exercises.map((exercise) => (
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">
              {exercise.workout_name}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <button onClick={() => setActiveModal(true)} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10">
        + Log workout
      </button>
      <Modal onClose={() => setActiveModal(false)} isOpen={activeModal}>
          <AddWorkoutForm onClose={() => setActiveModal(false)}/>
      </Modal>
    </div>
  );
}
