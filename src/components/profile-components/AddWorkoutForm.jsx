import { Form } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

import Button from "../../ui/Button";
import { useState } from "react";
import SetRow from "./SetRow";

export default function AddWorkoutForm({ onClose }) {
  const workouts = [
    "Bench Press",
    "Squat",
    "Deadlift",
    "Shoulder Press",
    "Lat Pulldown",
    "Biceps Curl",
  ];

  const sets = [
    { id: 1, set: "Set 1", weight: 100, reps: 12 },
    { id: 2, set: "Set 2", weight: 100, reps: 10 },
    { id: 3, set: "Set 3", weight: 120, reps: 8 },
  ];


  //   Workouts States
  const [allWorkouts, setAllWorkouts] = useState(workouts);
  const [addMode, setAddMode] = useState(false);
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const [enteredWorkout, setEnteredWorkout] = useState({
    value: "",
    error: "",
  });

  //   Sets States

  const [allSets, setAllSets] = useState(sets);

  //   Workout handlers

  const handleSelectedWorkout = (workout) => {
    setSelectedWorkouts((prev) => {
      if (!prev.includes(workout)) {
        return [...prev, workout];
      } else {
        return prev.filter((item) => item !== workout);
      }
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

  const handleDeleteSet = (id) => {
    return setAllSets((prev) => prev.filter((set) => set.id !== id));
  };

  const handleAddSet = () => {
    return setAllSets((prev) => {
      const nextIndex = prev.length + 1;
      const newSet = {
        id: nextIndex,
        set: `Set ${nextIndex}`,
        weight: 0,
        reps: 0,
      };
      return [...prev, newSet];
    });
  };

  return (
    <Form method="POST" className="flex flex-col">
      <div className="flex items-center justify-between bg-bg-dark px-5 py-4">
        <div>
          <h2 className="text-xl font-semibold tracking-wide text-accent-dark">
            Log Workout
          </h2>
          <p className="text-sm text-slate-400">Track your session</p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-600 text-2xl text-white/70 transition hover:bg-white/10 hover:text-white"
          aria-label="Close modal"
        >
          ×
        </button>
      </div>

      <div className="flex flex-col gap-6 px-5 py-5">
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
                className={`rounded-xl border border-accent-dark/20 px-4 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-accent-dark/10 active:scale-95 ${selectedWorkouts.includes(workout) ? "bg-accent-dark border-bg-accent-dark text-text-primary-headings  " : "bg-white hover:bg-slate-50 text-slate-600  "}`}
              >
                {workout}
              </button>
            ))}
            {addMode ? (
              <div className="flex flex-col items-center w-fit gap-1 ">
                <div className="flex items-center gap-0.5">
                  <input
                    autoFocus
                    className="rounded-xl border border-accent-dark/20 px-4 py-2.5 bg-slate-50 text-slate-800 text-sm transition focus:outline-none focus:ring-4 focus:ring-accent-dark/10 active:scale-95 placeholder:text-slate-400 placeholder:font-light"
                    placeholder="Add new exercise..."
                    type="text"
                    value={enteredWorkout.value}
                    onChange={handleEnteredWorkout}
                  />
                  <IoMdAdd
                    onClick={handleAddNewWorkout}
                    className="text-xl  text-accent-dark cursor-pointer "
                  />
                </div>
                <div></div>
                {enteredWorkout.error && (
                  <p className="text-xs text-red-500  w-full ">
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

        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <label className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
              Sets
            </label>

            <button
              type="button"
              onClick={handleAddSet}
              className="text-sm font-semibold text-cta-dark transition hover:opacity-80"
            >
              + Add Set
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {allSets.map((set) => (
              <SetRow key={set.set} set={set} onDelete={handleDeleteSet} />
            ))}
          </div>
        </section>

        <section className="space-y-2">
          <label
            htmlFor="note"
            className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500"
          >
            Notes
          </label>

          <textarea
            id="note"
            className="min-h-[96px] w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-accent-dark focus:ring-4 focus:ring-accent-dark/10"
            placeholder="Add any notes about your workout..."
          />
        </section>
      </div>

      <div className="flex justify-end gap-3 border-t border-black/5 bg-slate-50 px-5 py-4">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </Form>
  );
}
