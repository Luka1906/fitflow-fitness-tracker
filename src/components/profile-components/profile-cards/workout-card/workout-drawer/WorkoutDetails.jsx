import { getWorkoutStats } from "../../../../../utils/getWorkoutStats";
import { PiDotOutlineFill } from "react-icons/pi";
import { FiTrash2 } from "react-icons/fi";
import { useRef, useEffect, useState } from "react";
import { Modal } from "../../../../../ui/Modal";
import WorkoutDeleteConfirm from "./WorkoutDeleteConfirm";

export default function WorkoutDetails({
  selectedWorkoutDay = [],
  selectedDate,
  deleteModalIsOpen,
  setDeleteModalIsOpen,
  setUnSelectedDate,
}) {
  const contentRef = useRef(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
    setSelectedWorkout(null);
  };

  const handleDeleteSuccess = () => {
    setDeleteModalIsOpen(false);
    setSelectedWorkout(null);
    setUnSelectedDate();
  };

  useEffect(() => {
    contentRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [selectedDate]);

  return (
    <div className="flex flex-col gap-6 overflow-auto" ref={contentRef}>
      {selectedWorkoutDay.map((workout) => {
        const {
          formattedTime,
          totalExercises,
          totalSets,
          firstExercise,
          totalVolume,
          unit,
        } = getWorkoutStats([workout]);

        return (
          <section
            key={workout.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <header className="mb-4 flex items-start justify-between border-b border-white/10 pb-3">
              <div>
                <h3 className="font-semibold sm:text-lg text-white">
                  {firstExercise}
                  {totalExercises > 1 && (
                    <span className="text-sm sm:text-base font-normal text-slate-300">
                      {" "}
                      + {totalExercises - 1} more
                    </span>
                  )}
                </h3>

                <div className="mt-1 flex items-center text-xs sm:text-sm text-slate-300">
                  <span>{formattedTime}</span>
                  <PiDotOutlineFill className="text-lg" />
                  <span>
                    {totalExercises === 1
                      ? "1 exercise"
                      : `${totalExercises} exercises`}
                  </span>
                  <PiDotOutlineFill className="text-lg" />
                  <span>{totalSets === 1 ? "1 set" : `${totalSets} sets`}</span>
                </div>

                <div className="text-[11px] sm:text-xs mt-1 text-slate-400">
                  {totalVolume.toLocaleString()} {unit} total volume
                </div>

                {workout.note && (
                  <div className="mt-3 rounded-xl border border-white/10 bg-black/10 p-3">
                    <p className="text-xs tracking-wider text-slate-500">
                      Notes
                    </p>
                    <p className="mt-1 text-[0.8rem] text-slate-300">
                      {workout.note}
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  setSelectedWorkout(workout);
                  setDeleteModalIsOpen(true);
                }}
                className="text-red-400 border border-red-400/20 transition hover:text-red-300 hover:border-red-400/40 cursor-pointer bg-red-400/10 p-2 rounded-full"
              >
                <FiTrash2 />
              </button>
            </header>

            <div className="flex flex-col gap-4 mt-6">
              {workout.exercises.map((exercise) => (
                <div key={exercise.id}>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm sm:text-base font-medium text-white">
                      {exercise.workout_name}
                    </p>

                    <span className="rounded-full bg-white/5 px-2 py-1 text-xs text-slate-400">
                      {exercise.sets.length === 1
                        ? "1 set"
                        : `${exercise.sets.length} sets`}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {exercise.sets.map((set) => (
                      <div
                        key={set.id}
                        className="flex justify-between rounded-lg bg-white/4 p-3 text-[13px] sm:text-sm"
                      >
                        <span className="text-slate-400">
                          Set {set.set_order}
                        </span>

                        <span className="font-medium text-slate-100">
                          {set.weight} {set.unit} × {set.reps}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}

      <Modal onClose={closeDeleteModal} isOpen={deleteModalIsOpen}>
        <WorkoutDeleteConfirm
          onClose={closeDeleteModal}
          onDeleteSuccess={handleDeleteSuccess}
          selectedDate={selectedDate}
          selectedWorkout={selectedWorkout}
          deleteModalIsOpen={deleteModalIsOpen}
        />
      </Modal>
    </div>
  );
}