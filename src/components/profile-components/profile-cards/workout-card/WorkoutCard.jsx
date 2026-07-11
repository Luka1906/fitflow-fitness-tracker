import { FiEdit2 } from "react-icons/fi";
import { useLoaderData } from "react-router-dom";
import WorkoutBarChart from "../../../../ui/charts/WorkoutBarChart";
import { Modal } from "../../../../ui/Modal";
import { useState } from "react";
import AddWorkoutForm from "../workout-card/AddWorkoutForm";
import { getFilteredData } from "../../../../utils/getFilteredData";
import Drawer from "../../../../ui/Drawer";
import WorkoutLogsHistory from "./workout-drawer/WorkoutLogsHistory";
import useToggle from "../../../../hooks/useToggle";

export function WorkoutCard() {
  const { workouts, weight } = useLoaderData();

  const [activeModal, setActiveModal] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const { open: handleOpen, close: handleClose, isOpen } = useToggle();

  const weeklyWorkouts = getFilteredData(workouts, 7);

  const weeklySetNumber = weeklyWorkouts.reduce(
    (total, workout) =>
      total +
      workout.exercises.reduce(
        (exerciseTotal, exercise) => exerciseTotal + exercise.sets.length,
        0,
      ),
    0,
  );

  const lastWorkout = workouts?.[0];
  const lastWorkoutName = lastWorkout?.exercises?.at(-1)?.workout_name;
  const lastSetsNumber =
    lastWorkout?.exercises?.reduce(
      (total, exercise) => total + exercise.sets.length,
      0,
    ) || 0;

  return (
    <div className="flex flex-col space-y-6 rounded-4xl border border-white/10 bg-white/5 p-4 text-white sm:p-5">
      {/* Header */}
      <section className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-1">
          <p className="text-xs sm:text-sm font-medium tracking-wide text-slate-400">
            Workout activity
          </p>

          <h2 className="text-lg font-semibold sm:text-2xl">
            Track your training
          </h2>
        </div>

        <button
          type="button"
          onClick={handleOpen}
          className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          <FiEdit2 />
        </button>
      </section>

      {/* Manage workouts Drawer */}
      <Drawer
        disableEscClose={deleteModalIsOpen}
        isOpen={isOpen}
        onClose={handleClose}
      >
        <WorkoutLogsHistory
          drawerIsOpen={isOpen}
          deleteModalIsOpen={deleteModalIsOpen}
          setDeleteModalIsOpen={setDeleteModalIsOpen}
          workouts={workouts}
          weightLogs={weight}
          onClose={handleClose}
        />
      </Drawer>

      {/* Weekly Stats */}
      <section className="grid grid-cols-1 gap-3 rounded-3xl bg-bg-dark p-4 sm:grid-cols-2 sm:gap-4 sm:p-5">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-2xl sm:text-3xl font-bold text-white">
            {weeklyWorkouts.length}
          </p>

          <p className="mt-1 text-sm text-slate-400">workouts this week</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p className="text-2xl sm:text-3xl font-bold text-white">
            {weeklySetNumber}
          </p>

          <p className="mt-1 text-sm text-slate-400">total sets</p>
        </div>

        <div className="mt-2 flex h-40 items-center justify-center rounded-2xl border border-white/10 bg-white/5 sm:col-span-2">
          <WorkoutBarChart weeklyLogs={weeklyWorkouts} />
        </div>
      </section>

      {/* Last Workout */}
      <section className="rounded-3xl border border-white/10 bg-bg-dark p-4 sm:p-5">
        <p className="text-xs uppercase tracking-[0.2rem] text-slate-500">
          Last workout
        </p>

        <div className="mt-3">
          <h3 className="text-lg font-semibold text-white sm:text-xl">
            {lastWorkoutName || "No workout yet"}
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            {lastWorkout
              ? `${lastWorkout.exercises.length} ${
                  lastWorkout.exercises.length <= 1 ? "exercise" : "exercises"
                } • ${lastSetsNumber} sets • Today`
              : "Log your first workout to see it here"}
          </p>
        </div>

        {lastWorkout && (
          <div className="mt-4 flex flex-wrap gap-2">
            {lastWorkout.exercises.map((exercise) => (
              <span
                key={exercise.id}
                className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300"
              >
                {exercise.workout_name}
              </span>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <button
        type="button"
        onClick={() => setActiveModal(true)}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10"
      >
        + Log workout
      </button>

      <Modal onClose={() => setActiveModal(false)} isOpen={activeModal}>
        {activeModal && (
          <AddWorkoutForm
            modalIsOpen={activeModal}
            onClose={() => setActiveModal(false)}
          />
        )}
      </Modal>
    </div>
  );
}
