import { FiX, FiCalendar } from "react-icons/fi";
import { PiDotOutlineFill } from "react-icons/pi";
import { FaArrowLeft, FaRegClock } from "react-icons/fa6";
import WorkoutLogCard from "./WorkoutLogCard";
import WorkoutDetails from "./WorkoutDetails";
import { useEffect, useMemo, useState } from "react";
import { createLocalDate } from "../../../../../utils/createLocalDate";
import { getWorkoutStats } from "../../../../../utils/getWorkoutStats";

const groupWorkoutLogs = (logs) => {
  const groupedLogs = {};
  logs.forEach((log) => {
    const key = log.logged_at.slice(0, 10);
    if (!groupedLogs[key]) groupedLogs[key] = [];
    groupedLogs[key].push(log);
  });

  return groupedLogs;
};

export default function WorkoutLogsHistory({
  onClose,
  workouts,
  weightLogs,
  deleteModalIsOpen,
  setDeleteModalIsOpen,
  drawerIsOpen,
}) {
  const [viewDetails, setViewDetails] = useState({
    selectedDate: null,
  });

  const setSelectedDate = (date) => {
    setViewDetails({
      selectedDate: date,
    });
  };

  const setUnSelectedDate = () => {
    setViewDetails({
      selectedDate: null,
    });
  };
  useEffect(() => {
    if (!drawerIsOpen) {
      setViewDetails({
        selectedDate: null,
      });
    }
  }, [drawerIsOpen]);

  const groupedWorkouts = useMemo(() => groupWorkoutLogs(workouts), [workouts]);
  const selectedWorkoutDay = viewDetails.selectedDate
    ? (groupedWorkouts[viewDetails.selectedDate] ?? [])
    : [];

  const formattedSelectedDate = viewDetails.selectedDate
    ? createLocalDate(viewDetails.selectedDate).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    : null;

  const { formattedTime = "0min" } = selectedWorkoutDay
    ? getWorkoutStats(selectedWorkoutDay)
    : {};

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Header */}
      <header className="flex justify-between border-b p-4 border-white/10">
        <div className="flex flex-col text-sm gap-1">
          {viewDetails.selectedDate ? (
            <>
              <button
                onClick={setUnSelectedDate}
                className="cursor-pointer flex items-center gap-2 text-slate-300 mb-2"
              >
                <FaArrowLeft />
                <span>Back</span>
              </button>

              <h2 className="text-2xl">Workout Details</h2>
              <div className="flex text-slate-400 text-sm">
                <div className="flex gap-1 items-center">
                  <FiCalendar />
                  <p>{formattedSelectedDate}</p>
                </div>
                <PiDotOutlineFill className="text-lg" />
                <div className="flex gap-1 items-center">
                  <FaRegClock className="text-[0.80rem]" />
                  <p>{formattedTime}</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-slate-400">Workout logs history</h2>
              <h1 className=" text-2xl">Manage your logs</h1>
            </>
          )}
        </div>
        <button
          onClick={onClose}
          className="border h-10 w-10 flex items-center justify-center border-white/10 bg-white/5 rounded-full text-slate-300 transition hover:bg-white/10 hover:text-white cursor-pointer"
        >
          <FiX />
        </button>
      </header>
      <div className="flex flex-col gap-6 overflow-auto">
        {viewDetails.selectedDate ? (
          <WorkoutDetails
            selectedWorkoutDay={selectedWorkoutDay}
            setUnSelectedDate={setUnSelectedDate}
            selectedDate={viewDetails.selectedDate}
            groupedLogs={groupedWorkouts}
            deleteModalIsOpen={deleteModalIsOpen}
            setDeleteModalIsOpen={setDeleteModalIsOpen}
          />
        ) : (
          <WorkoutLogCard
            handleDetailView={setSelectedDate}
            groupedLogs={groupedWorkouts}
            weightLogs={weightLogs}
          />
        )}
      </div>
      {/* Footer */}
      <footer className=" border-t border-white/10 pt-4">
        <button
          onClick={onClose}
          type="button"
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-medium text-white transition hover:bg-white/10 cursor-pointer"
        >
          Close
        </button>
      </footer>
    </div>
  );
}
