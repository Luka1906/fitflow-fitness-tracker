import { FiX } from "react-icons/fi";
import WorkoutLogCard from "./WorkoutLogCard";

export default function WorkoutLogsHistory({onClose, workouts, weightLogs}) {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Header */}
      <header className="flex justify-between border-b p-4 border-white/10">
          <div className="flex flex-col text-sm gap-1">
          <h2 className="text-slate-400">Workout logs history</h2>
          <h1 className=" text-2xl">Manage your logs</h1>
        </div>
        <button
          onClick={onClose}
          className="border h-10 w-10 flex items-center justify-center border-white/10 bg-white/5 rounded-full text-slate-300 transition hover:bg-white/10 hover:text-white cursor-pointer"
        >
          <FiX />
        </button>
      </header>
      <WorkoutLogCard workouts={workouts} weightLogs={weightLogs}/>
    </div>
  );
}
