import { FiX } from "react-icons/fi";
import { FaCloudscale } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaArrowUp, FaArrowDown } from "react-icons/fa6";
import { useState } from "react";

import formatWeight from "../../../../utils/formatWeight";
import WeightEditModal from "./WeightEditModal";
import WeightDeleteConfirm from "./WeightDeleteConfirm";
import { Modal } from "../../../../ui/Modal";
import WeightEditConfirm from "./WeightEditConfirm";

const formattedDate = (date) => {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export default function WeightLogsHistory({
  logs,
  onClose,
  modalState,
  setModalState,
}) {
  const [activeMenuLog, setActiveMenuLog] = useState(null);

  const closeModal = () => {
    setModalState({
      type: null,
      log: null,
    });
  };

  return (
    <div className="flex h-full flex-col gap-6">
      <header className="flex justify-between border-b border-white/10 p-4">
        <div className="flex flex-col gap-1 text-sm">
          <h2 className="text-slate-400">Weight logs history</h2>
          <h1 className="text-xl sm:text-2xl">Manage your logs</h1>
        </div>

        <button
          onClick={onClose}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          <FiX />
        </button>
      </header>

      <div className="w-full space-y-3 overflow-y-auto">
        {logs.length === 0 ? (
          <main className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 p-6 text-center">
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
                className="relative flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-[13px] sm:text-sm">{formattedDate(log.logged_at)}</p>

                <p className="text-lg sm:text-xl font-semibold">
                  {formatWeight(log.weight)}
                  <span className="ml-2 text-[13px] sm:text-sm font-normal text-slate-400">
                    {log.unit}
                  </span>
                </p>

                <div
                  className={`flex items-center gap-1 rounded-lg px-2 py-1 text-xs sm:text-sm font-semibold ${
                    change > 0
                      ? "bg-red-500/10 text-red-300/90"
                      : change < 0
                        ? "bg-emerald-500/10 text-emerald-300/90"
                        : "text-slate-300"
                  }`}
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
                  className="cursor-pointer text-slate-300 hover:text-white"
                />

                {activeMenuLog?.id === log.id && (
                  <WeightEditModal
                    onClose={() => setActiveMenuLog(null)}
                    onDelete={() => {
                      setModalState({
                        type: "delete",
                        log,
                      });

                      setActiveMenuLog(null);
                    }}
                    onEdit={() => {
                      setModalState({
                        type: "edit",
                        log,
                      });

                      setActiveMenuLog(null);
                    }}
                  />
                )}
              </div>
            );
          })
        )}
      </div>

      <Modal isOpen={modalState.type === "delete"} onClose={closeModal}>
        <WeightDeleteConfirm
          key={modalState.log?.id}
          log={modalState.log}
          logDate={formattedDate(modalState.log?.logged_at)}
          onClose={closeModal}
          isOpen={modalState.type === "delete"}
        />
      </Modal>

         <Modal isOpen={modalState.type === "edit"} onClose={closeModal}>
        <WeightEditConfirm
          key={modalState.log?.id}
          log={modalState.log}
          onClose={closeModal}
          isOpen={modalState.type === "edit"}
        />
      </Modal>

      <footer className="border-t border-white/10 pt-4">
        <button
          onClick={onClose}
          type="button"
          className="w-full cursor-pointer rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-medium text-white transition hover:bg-white/10"
        >
          Close
        </button>
      </footer>
    </div>
  );
}
