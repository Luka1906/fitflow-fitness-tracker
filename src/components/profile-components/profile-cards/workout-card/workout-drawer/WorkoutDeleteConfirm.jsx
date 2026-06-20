import { IoWarning } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useFetcher } from "react-router-dom";
import { createLocalDate } from "../../../../../utils/createLocalDate";

import { useEffect } from "react";

const WorkoutDeleteConfirm = ({ selectedDate, onClose }) => {
  const deleteFetcher = useFetcher();
  const formatedDate = createLocalDate(selectedDate).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "2-digit",
      year: "numeric",
    },
  );

  //   useEffect(() => {
  //     if (!isOpen) return;

  //     if (deleteFetcher.state === "idle" && deleteFetcher.data?.success)
  //       onClose();
  //   }, [isOpen, deleteFetcher.state, deleteFetcher.data, onClose]);

  return (
    <div className=" bg-bg-dark/90 border brightness-125 border-red-400/20 rounded-2xl  backdrop-blur-2xl flex flex-col items-center gap-4  text-white px-6 py-7 relative">
      <div className="flex flex-col items-center gap-2">
        <IoWarning className="text-red-400 bg-red-500/15 border border-red-400/20 w-10 h-10 p-2.5 rounded-full" />
        <h2 className="font-semibold text-red-300/90">Delete Workout Log</h2>
      </div>
      <IoMdClose
     onClick={onClose} 
        className="absolute right-4 w-8 h-8 transition p-2 bg-white/10 rounded-full text-slate-300 border border-white/10  hover:text-white hover:border-white/5 cursor-pointer"
      />

      <div className="px-10 text-center">
        <p className="text-sm text-slate-300">
          Are you sure you want to delete your
          <span className="text-white font-medium">
            {" "}
            {/* {formatWeight(log?.weight)} {log?.unit} */}
          </span>{" "}
          log from
          <span className="text-white font-medium"> {formatedDate}</span>?
        </p>
      </div>
      <div className="flex gap-3  w-full font-semibold">
        <button
            onClick={onClose}
          className="flex-1 bg-white/10 hover:bg-white/15 py-2 rounded-lg"
        >
          Cancel
        </button>
        <deleteFetcher.Form
          className="flex-1"
          method="DELETE"
          //   action={`/profile/weight-logs/${log?.id}`}
        >
          <button
            type="submit"
            className=" bg-red-500/80 w-full hover:bg-red-500 py-2 rounded-lg"
          >
            Delete
          </button>
        </deleteFetcher.Form>
      </div>
    </div>
  );
};

export default WorkoutDeleteConfirm;
