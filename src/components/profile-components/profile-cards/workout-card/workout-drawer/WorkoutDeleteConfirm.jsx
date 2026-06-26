import { IoWarning } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useFetcher } from "react-router-dom";
import { createLocalDate } from "../../../../../utils/createLocalDate";
import { format } from "date-fns";

import { useEffect } from "react";

const WorkoutDeleteConfirm = ({
  selectedWorkout,
  onClose,
  deleteModalIsOpen,
  onDeleteSuccess
}) => {
const selectedDate = selectedWorkout?.logged_at? new Date(selectedWorkout.logged_at) : new Date()
  const deleteFetcher = useFetcher();
 
  useEffect(() => {
    if (!deleteModalIsOpen) return;

    if (deleteFetcher.state === "idle" && deleteFetcher.data?.success) {
      onDeleteSuccess();
    }
  }, [deleteModalIsOpen, deleteFetcher.state, deleteFetcher.data, onDeleteSuccess]);

    

  return (
     <div className="flex flex-col gap-5 rounded-2xl border border-red-400/20 bg-bg-dark/90 p-4 text-text-primary-paragraph">
      <header className="flex justify-between">
        <div className="flex gap-2">
          <IoWarning className="h-9 w-9 rounded-md bg-red-500/10 p-2 text-red-400" />

          <div>
            <h2 className="font-semibold text-red-300">Delete workout log</h2>
            <p className="text-sm text-slate-500">
              This action cannot be undone
            </p>
          </div>
        </div>

        <IoMdClose
          onClick={onClose}
          className="h-9 w-9 cursor-pointer rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
        />
      </header>

      <main className="rounded-xl border border-white/10 bg-black/10 p-4">
        <p className="text-sm leading-6 text-slate-300">
          Are you sure you want to delete your log from{" "}
          <span className="font-semibold text-white">
            {format(selectedDate, "MMM dd, yyyy")}
          </span>
          ?
        </p>
      </main>

      <footer className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 cursor-pointer rounded-lg border border-white/10 bg-white/4 py-3 text-[0.9rem] font-medium transition hover:bg-white/10"
        >
          Cancel
        </button>

        <deleteFetcher.Form
          className="flex-1"
          method="DELETE"
          action={`/profile/workout-logs/${selectedWorkout?.id}`}
        >
          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg border border-red-500/70 bg-red-500/90 py-3 text-[0.9rem] font-medium text-white transition hover:bg-red-500"
          >
            Delete log
          </button>
        </deleteFetcher.Form>
      </footer>
    </div>
  );
};

export default WorkoutDeleteConfirm;
