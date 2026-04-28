import { Form } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

import Button from "../../ui/Button";
import { useState } from "react";
import SetRow from "./SetRow";

export default function AddWorkoutForm({ onClose }) {
  const today = new Date().toLocaleDateString()
  const workouts = [
    "Bench Press",
    "Squat",
    "Deadlift",
    "Shoulder Press",
    "Lat Pulldown",
    "Biceps Curl",
  ];

  //   Workouts States
  const [allWorkouts, setAllWorkouts] = useState(workouts);
  const [addMode, setAddMode] = useState(false);
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const [enteredWorkout, setEnteredWorkout] = useState({
    value: "",
    error: "",
  });

  const createDefaultSet = (index = 1) => ({
    id: crypto.randomUUID(),
    set_order: ` ${index}`,
    weight: 0,
    reps: 0,
  });

  //   Workout handlers

  const handleSelectedWorkout = (workoutName) => {
    setSelectedWorkouts((prev) => {
      const exist = prev.some((workout) => workout.name === workoutName);

      if (exist) {
        return prev.filter((workout) => workout.name !== workoutName);
      }

      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          name: workoutName,
          sets: [createDefaultSet(1)],
        },
      ];
    });
  };

  const handleAddNewWorkout = () => {
    const value = enteredWorkout.value.trim();
    console.log(value);

    if (!value) {
      setEnteredWorkout((prev) => ({
        ...prev,
        error: "Please enter an exercise",
      }));
      return;
    }
    const exist = allWorkouts.some(
      (workout) => workout.toLowerCase() === value.toLowerCase(),
    );

    if (exist) {
      setEnteredWorkout((prev) => ({
        ...prev,
        error: "Exercise already exists, please enter the new one",
      }));
      return;
    }

    setAllWorkouts((prev) => [...prev, value]);

    setEnteredWorkout({
      value: "",
      error: "",
    });
    setAddMode((prev) => !prev);
  };

  const handleEnteredWorkout = (event) => {
    const enteredWorkout = event.target.value;
    setEnteredWorkout((prev) => ({
      ...prev,
      value: enteredWorkout,
      error: "",
    }));
  };

  //   Sets handlers

  const handleAddSet = (workoutId) => {
    setSelectedWorkouts((prev) =>
      prev.map((workout) => {
        if (workout.id !== workoutId) return workout;

        const nextIndex = workout.sets.length + 1;
        return {
          ...workout,
          sets: [...workout.sets, createDefaultSet(nextIndex)],
        };
      }),
    );
  };

  const handleDeleteSet = (workoutId, setId) => {
    setSelectedWorkouts((prev) =>
      prev
        .map((workout) => {
          if (workout.id !== workoutId) return workout;
          const filteredSets = workout.sets.filter((set) => set.id !== setId);
          // ["Set1", "Set3]

          // Re-label set names after delete
          const normalizedSets = filteredSets.map((set, index) => ({
            ...set,
            set_order: `${index + 1}`,
          }));

          return {
            ...workout,
            sets: normalizedSets,
          };
        })
        .filter((workout) => workout.sets.length > 0),
    );
  };

  const handleSetChange = (workoutId, setId, field, value) => {
    setSelectedWorkouts((prev) =>
      prev.map((workout) => {
        if (workout.id !== workoutId) return workout;

        return {
          ...workout,
          sets: workout.sets.map((set) =>
            set.id === setId ? { ...set, [field]: value } : set,
          ),
        };
      }),
    );
  };

  return (
    <Form
      method="POST"
      action="/profile/add-workout"
      className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl bg-white"
    >
      <div className="flex items-center justify-between bg-bg-dark px-5 py-4 shrink-0">
        <div>
          <h2 className="text-xl font-semibold tracking-wide text-accent-dark">
            Log Workout
          </h2>
          <p className="text-sm text-slate-400">Track your session</p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9 justify-center rounded-full border border-slate-600 text-2xl text-white/70 transition hover:bg-white/10 hover:text-white"
          aria-label="Close modal"
        >
          ×
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5">
        <div className="flex flex-col gap-6">
          <section className="space-y-4">
            <label className="inline-block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
              Exercise
            </label>

            <div className="grid grid-cols-2 gap-3">
              {allWorkouts.map((workout) => (
                <button
                  key={workout}
                  value={workout}
                  onClick={() => handleSelectedWorkout(workout)}
                  type="button"
                  className={`rounded-xl border border-accent-dark/20 px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-accent-dark/10 active:scale-95 ${
                    selectedWorkouts.some(
                      (selectedWorkout) => selectedWorkout.name === workout,
                    )
                      ? "border-bg-accent-dark bg-accent-dark text-text-primary-headings"
                      : "bg-white text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {workout}
                </button>
              ))}

              {addMode ? (
                <div className="flex w-fit flex-col items-center gap-1">
                  <div className="flex items-center gap-0.5">
                    <input
                      autoFocus
                      className="rounded-xl border border-accent-dark/20 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 transition placeholder:font-light placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-accent-dark/10 active:scale-95"
                      placeholder="Add new exercise..."
                      type="text"
                      value={enteredWorkout.value}
                      onChange={handleEnteredWorkout}
                    />
                    <IoMdAdd
                      onClick={handleAddNewWorkout}
                      className="cursor-pointer text-xl text-accent-dark"
                    />
                  </div>

                  {enteredWorkout.error && (
                    <p className="w-full text-xs text-red-500">
                      {enteredWorkout.error}
                    </p>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setAddMode((prev) => !prev)}
                  className="rounded-xl border border-dashed border-accent-dark/30 px-4 py-2.5 text-sm font-semibold text-cta-dark transition hover:bg-accent-dark/5"
                >
                  + Add Exercise
                </button>
              )}
            </div>
          </section>

          {selectedWorkouts.length > 0 && (
            <section className="space-y-5">
              {selectedWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <div>
                      <h3 className="text-sm font-semibold text-slate-800">
                        {workout.name}
                      </h3>
                      <p className="text-xs text-slate-400">
                        Add sets for this exercise
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddSet(workout.id)}
                      className="text-sm font-semibold text-cta-dark transition hover:opacity-80"
                    >
                      + Add Set
                    </button>
                  </div>

                  <div className="flex flex-col gap-3 items-center">
                    {workout.sets.map((set) => (
                      <SetRow
                        key={set.id}
                        set={set}
                        onDelete={() => handleDeleteSet(workout.id, set.id)}
                        onChange={(field, value) =>
                          handleSetChange(workout.id, set.id, field, value)
                        }
                      />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          <section className="space-y-2">
            <label
              htmlFor="note"
              className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500"
            >
              Notes
            </label>

            <textarea
              id="note"
              name="note"
              className="min-h-[96px] w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-accent-dark focus:ring-4 focus:ring-accent-dark/10"
              placeholder="Add any notes about your workout..."
            />
          </section>
        </div>
      </div>
      <input
        type="hidden"
        name="workoutData"
        value={JSON.stringify(selectedWorkouts)}
      />
      <input type="hidden" name="date" value={today} />

      <div className="flex shrink-0 justify-end gap-3 border-t border-black/5 bg-slate-50 px-5 py-4">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </Form>
  );
}
