import { useEffect } from "react";
import { FiDroplet, FiTrash2, FiX } from "react-icons/fi";
import { useFetcher } from "react-router-dom";

// Get water log date function

const formatLogDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};
// Get Water Log Time function

const formatLogTime = (dateString) => {
  const date = new Date(dateString);

  const time = date.toLocaleDateString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const formattedTime = time.split(",")[1];
  return formattedTime;
};

// Group Water Log by date function

const groupLogsByDay = (logs) => {
  const groups = {};

  for (const log of logs) {
    const key = formatLogDate(log.created_at);

    if (!groups[key]) groups[key] = [];

    groups[key].push(log);
  }

  return groups;
};

export default function EditWaterLogs({ logs = [], onClose }) {
  const groupedLogs = groupLogsByDay(logs);

console.log(logs)


  const todayLogs = logs.filter((log) => {
    const today = new Date().toDateString();
    return new Date(log.logged_at).toDateString() === today;
  });

  const totalWater = todayLogs.reduce((acc, log) => acc + log.amount, 0);

  const deleteFetcher = useFetcher();



  return (
    <div className="flex flex-col text-white h-full gap-3 ">
      {/* Header */}
      <header className="flex items-start justify-between border-b border-white/10 p-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-400">Water history</p>
          <p className="text-2xl font-semibold">Manage your logs</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          <FiX />
        </button>
      </header>

      {/* Summary */}

      <section className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col gap-2">
          <p className="text-xs text-slate-500 uppercase tracking-[0.18rem] ">
            Today
          </p>
          <p className="text-2xl font-semibold">{totalWater} ml</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col gap-2">
          <p className="text-xs text-slate-500 uppercase tracking-[0.18rem] ">
            Entries
          </p>
          <p className="text-2xl font-semibold">{todayLogs.length}</p>
        </div>
      </section>

      {/* Logs */}
      <div className="mt-6 flex-1 overflow-y-auto pr-1">
        {logs.length === 0 ? (
          <main className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 px-6 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
              <FiDroplet className="text-xl text-accent-dark" />
            </div>
            <h3 className="text-lg font-semibold text-white">
              No water logs yet
            </h3>
            <p className="mt-2 max-w-xs text-sm text-slate-400">
              Start logging your water intake and your recent entries will show
              up here.
            </p>
          </main>
        ) : (
          <main className="space-y-6">
            {Object.entries(groupedLogs).map(([groupedLabel, groupedLogs]) => (
              <div key={groupedLabel}>
                <div className="space-y-3">
                  <p className="text-slate-500 text-xs uppercase tracking-[0.18rem]">
                    {groupedLabel}
                  </p>

                  {groupedLogs.map((log) => (
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div className="flex gap-3 items-center">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                            <FiDroplet className="text-accent-dark" />
                          </div>
                          <div className="">
                            <p className="font-semibold">{log.amount} ml</p>
                            <p className="text-slate-400 text-sm">
                              {formatLogTime(log.created_at)}
                            </p>
                          </div>
                        </div>
                        <deleteFetcher.Form
                          method="delete"
                          action={`/profile/water-logs/${log.id}`}
                        >
                          <button
                            type="submit"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition hover:border-red-400/20 hover:bg-red-500/10 hover:text-red-300"
                          >
                            <FiTrash2 />
                          </button>
                        </deleteFetcher.Form>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </main>
        )}
      </div>
      {/* Footer */}
      <div className="mt-6 border-t border-white/10 pt-4">
        <button
          type="submit"
          onClick={onClose}
          className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-medium text-white transition hover:bg-white/10"
        >
          Close
        </button>
      </div>
    </div>
  );
}
