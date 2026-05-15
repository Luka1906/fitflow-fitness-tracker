import { FiX } from "react-icons/fi";
import { FaCloudscale } from "react-icons/fa";


import { BsThreeDotsVertical } from "react-icons/bs";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import useToggle from "../../../../hooks/useToggle";
import { useState } from "react";

import formatWeight from "../../../../utils/formatWeight";
import WeightEditModal from "./WeightEditModal";
import WeightDeleteConfirm from "./WeightDeleteConfirm";
import { Modal } from "../../../../ui/Modal";
const formattedDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function WeightLogsHistory({ logs, onClose }) {
  const [activeMenuLog, setActiveMenuLog] = useState(null);
  const [deleteLog, setDeleteLog] = useState(null);

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Header */}
      <header className="flex justify-between border-b p-4 border-white/10">
        <div className="flex flex-col text-sm gap-1">
          <h2 className="text-slate-400">Weight logs history</h2>
          <h1 className=" text-2xl">Manage your logs</h1>
        </div>
        <button
          onClick={onClose}
          className="border h-10 w-10 flex items-center justify-center border-white/10 bg-white/5 rounded-full text-slate-300 transition hover:bg-white/10 hover:text-white cursor-pointer"
        >
          <FiX />
        </button>
      </header>
      {/* Logs*/}

      <div className="w-full space-y-3  overflow-y-auto  ">
        {logs.length === 0 ? (
          <main className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 px-6 text-center p-6">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
              <FaCloudscale className="text-2xl text-accent-dark" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              No weight logs yet
            </h3>
            <p className="mt-2 max-w-xs text-sm text-slate-400">
              Start logging your weight logs and your recent entries will show
              up here.
            </p>
          </main>
        ) : (
          logs.map((log, index) => {
            const previousWeightLog = logs[index + 1];
            const change = previousWeightLog
              ? log.weight - previousWeightLog.weight
              : 0;

            return (
              <div
                key={log.id}
                className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 relative"
              >
                <p className="text-sm">{formattedDate(log.logged_at)}</p>
                <p className="text-xl font-semibold">
                  {formatWeight(log.weight)}
                  <span className="ml-2 text-sm font-normal text-slate-400">
                    {log.unit}
                  </span>
                </p>
                <div
                  className={`flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-lg ${change > 0 ? "text-red-300/90 bg-red-500/10" : change < 0 ? "text-emerald-300/90 bg-emerald-500/10" : "text-slate-300"}`}
                >
                  {change > 0 ? (
                    <FaArrowUp />
                  ) : change < 0 ? (
                    <FaArrowDown />
                  ) : null}
                  <p>
                    {change > 0 && <span>+</span>} {formatWeight(change)}{" "}
                    <span className="text-sm">{log.unit}</span>
                  </p>
                </div>

                <BsThreeDotsVertical
                  onClick={() => setActiveMenuLog(log)}
                  className="text-slate-300 hover:text-white cursor-pointer"
                />
                {activeMenuLog?.id === log.id && (
                  <WeightEditModal
                    onClose={() => setActiveMenuLog(null)}
                    onDelete={() => {
                      setDeleteLog(log);
                      setActiveMenuLog(null);
                    }}
                  />
                )}
              </div>
            );
          })
        )}
      </div>

      <Modal isOpen={deleteLog}>
        <WeightDeleteConfirm
          key={deleteLog?.id}
          isOpen={deleteLog}
          log={deleteLog}
          logDate={formattedDate(deleteLog?.logged_at)}
          onClose={() => setDeleteLog(null)}
        />
      </Modal>

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
