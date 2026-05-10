import {FiX } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";

import formatWeight from "../../../../utils/formatWeight";
const formattedDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function WeightLogsHistory({ logs, onClose }) {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Header */}
      <header className="flex justify-between border-b p-4 border-white/10">
        <div className="flex flex-col text-sm gap-1">
          <h2 className="text-slate-400">Weight logs history</h2>
          <h1 className=" text-2xl">Manage your logs</h1>
        </div>
        <button onClick={onClose} className="border h-10 w-10 flex items-center justify-center border-white/10 bg-white/5 rounded-full text-slate-300 transition hover:bg-white/10 hover:text-white">
          <FiX />
        </button>
      </header>
      {/* Main section */}
      <section className="w-full space-y-3  overflow-y-auto ">
        {logs.map((log, index) => {
          const previousWeightLog = logs[index + 1];
          const change = previousWeightLog
            ? log.weight - previousWeightLog.weight
            : 0;

          return (
            <div key={log.id} className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm">{formattedDate(log.logged_at)}</p>
              <p className="text-xl font-semibold">
                {formatWeight(log.weight)}
                <span className="ml-2 text-sm font-normal text-slate-400">
                  {log.unit}
                </span>
              </p>
              <div className={`flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-lg ${change > 0 ? "text-red-300/90 bg-red-500/10" : change < 0 ? "text-emerald-300/90 bg-emerald-500/10" : "text-slate-300"}`}>
                {change > 0 ? <FaArrowUp  /> : change < 0 ? <FaArrowDown/> : null}
                <p >
                  {change > 0 && <span>+</span>} {formatWeight(change)} <span className="text-sm">{log.unit}</span>
                </p>
              </div>

              <BsThreeDotsVertical className="text-slate-300 hover:text-white" />
            </div>
          );
        })}
      </section>

      {/* Footer */}
      <footer className=" border-t border-white/10 pt-4">
        <button
        onClick={onClose}
          type="button"
    
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-medium text-white transition hover:bg-white/10"
        >
          Close
        </button>
      </footer>

    
    </div>
  );
}
