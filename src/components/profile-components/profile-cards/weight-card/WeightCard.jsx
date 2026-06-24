import { FiPlus, FiEdit2, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import { IoMdArrowDropdown } from "react-icons/io";
import { useLoaderData, useFetcher } from "react-router-dom";
import { useState, useEffect } from "react";
import useToggle from "../../../../hooks/useToggle";
import WeightLineChart from "../../../../ui/charts/WeightLineChart";
import formatWeight from "../../../../utils/formatWeight";
import Drawer from "../../../../ui/Drawer";
import WeightLogsHistory from "./WeightLogsHistory";
import { WeightGoalForm } from "./WeightGoalForm";

// Helper functions

const formatDate = (dateString) => {
  if (!dateString) return "No data";

  const date = new Date(dateString);
  const today = new Date();

  const diffTime = today - date;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};
// Get Latest Logs

const getLatestLogs = (logs) => {
    const latestByDay = {};
    logs.forEach((log) => {
        const day = log.logged_at.slice(0,10);
        const existingLog = latestByDay[day];


        if(!existingLog || log.id > existingLog.id) {
            latestByDay[day] = log
        }
    })
    return Object.values(latestByDay)
}



export default function WeightCard() {
  const { weight } = useLoaderData();
  const latestWeightLogs = getLatestLogs(weight.logs);
  const weightLogFetcher = useFetcher();
  const today = new Date().toLocaleDateString();


  // Toggling log weight button
  const [isLogging, setIsLogging] = useState(false);
  const [weightLog, setWeightLog] = useState("");

  // Extracting weight logs, current weight, and weight goal

  const currentWeightLog = latestWeightLogs?.[0];


  const currentWeight = currentWeightLog?.weight;

  const currentWeightUnit = currentWeightLog?.unit;

  const weightGoal = weight?.goal;
  const weightGoalAmount = weightGoal?.weightGoal;
  const weightGoalUnit = weightGoal?.unit;

  // Convertring weight data from string to number
  const weightRemaining =
    currentWeight && weightGoalAmount
      ? formatWeight(currentWeight) - formatWeight(weightGoalAmount)
      : null;

  const formattedWeightLog = formatWeight(currentWeight);
  const formattedWeightGoal = formatWeight(weightGoalAmount);
  const formattedWeightRemaining = formatWeight(weightRemaining);
  const lastUpdated = formatDate(currentWeightLog?.logged_at);

  //   Clean custom amount input when submit effect
  useEffect(() => {
    if (weightLogFetcher.state === "idle" && weightLogFetcher.data?.success) {
      setWeightLog("");
      setIsLogging(false);
    }
  }, [weightLogFetcher.state, weightLogFetcher.data]);

  //Toggling weight log trend
 const lastSevenWeightLogs = latestWeightLogs?.slice(0,7);
  const latestWeightLog = lastSevenWeightLogs?.[0]?.weight;
  const oldestWeightLog = lastSevenWeightLogs?.at(-1)?.weight;
  const weightDifference = latestWeightLog - oldestWeightLog;

  const isLosing = weightDifference < 0;
  const isGaining = weightDifference > 0;

  // Toggling edit weight logs drawer
  const { open: openLogs, close: closeLogs, isOpen: isLogsOpen } = useToggle();

  //Toggling edit weight goal form
  const { open: openGoal, close: closeGoal, isOpen: isGoalOpen } = useToggle();

  //Delete  and edit weight log confirmation modal
  const [modalState, setModalState] = useState({
    type: null,
    log: null
  });


  return (
    <div className="flex flex-col space-y-6 rounded-4xl border border-white/10 bg-white/5 p-5 text-white">
      {/* top row */}
      <section className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium tracking-wide text-slate-400">
            Weight Progress
          </p>
          <h2 className="text-2xl font-semibold">Your journey</h2>
        </div>

        <button
          onClick={() => openLogs()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white cursor-pointer"
        >
          <FiEdit2 />
        </button>
      </section>

      <Drawer disableEscClose={modalState.type !==null} onClose={closeLogs} isOpen={isLogsOpen}>
        <WeightLogsHistory modalState={modalState} setModalState={setModalState} logs={weight.logs} onClose={closeLogs}/>
      </Drawer>

      {/* main content */}
      <section className=" rounded-3xl bg-bg-dark p-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.18rem] text-slate-500">
              Current
            </p>

            <div className="mt-2 flex items-end gap-2">
              <h3 className="text-5xl font-bold">
                {currentWeight ? formattedWeightLog : "--"}
              </h3>

              <span className="pb-2 text-slate-400">
                {currentWeightUnit || ""}
              </span>
            </div>
          </div>

          <div
            className={`flex flex-col items-center rounded-2xl border px-3 py-2
    ${
      isLosing
        ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
        : isGaining
          ? "border-red-500/20 bg-red-500/20 text-red-300"
          : "border-slate-500/20 bg-slate-500/10 text-slate-300"
    }
  `}
          >
            <div className="flex items-center gap-1 text-sm font-semibold">
              {isLosing ? (
                <FiTrendingDown />
              ) : isGaining ? (
                <FiTrendingUp />
              ) : (
                weightDifference !== 0 && <span>--</span>
              )}

              <p>
                {isGaining && "+"}
                {weight.logs.length > 0 && formatWeight(weightDifference)} {currentWeightUnit}
              </p>
            </div>
            <p
              className={`text-xs ${isLosing ? "text-emerald-200/70" : isGaining ? "text-red-300/70" : "text-slate-400"} `}
            >
              this week
            </p>
          </div>
        </div>

        {/* chart area */}
        <div className="  mt-6 flex  items-center justify-center rounded-2xl border border-white/10 bg-white/5  text-sm text-slate-500">
          <WeightLineChart logs={[...latestWeightLogs].reverse()} />
        </div>
      </section>

      {/* action button */}
      <section className="flex flex-col gap-6">
        <button
          onClick={() => setIsLogging((prev) => !prev)}
          className="w-full flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-text-primary-headings transition hover:bg-white/10 hover:text-text-primary-paragraph active:scale-[0.98] cursor-pointer"
        >
          <FiPlus />
          Log weight
        </button>

        {/* Log Weight form */}

        {isLogging && (
          <weightLogFetcher.Form
            method="POST"
            action="/profile/add-weight"
            className=" rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <p className="mb-3 text-[0.7rem] font-medium uppercase tracking-[0.2rem] text-slate-400">
              Log weight
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <input
                onChange={(e) => setWeightLog(e.target.value)}
                value={weightLog}
                type="number"
                step="0.1"
                name="weight"
                placeholder="e.g. 150.5"
                className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-bg-dark px-4 py-3 text-white placeholder:text-slate-500 outline-none"
              />

              <div className="relative">
                <select
                  className="appearance-none rounded-2xl border border-white/10 bg-bg-dark px-8 py-3 text-white outline-none"
                  name="unit"
                  defaultValue="lbs"
                >
                  <option value="lbs">lbs</option>
                  <option value="kg">kg</option>
                </select>

                <IoMdArrowDropdown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-lg text-slate-500" />
              </div>
              <input hidden name="date" value={today} />

              <button className="shrink-0 rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/15">
                Save
              </button>
            </div>
          </weightLogFetcher.Form>
        )}
      </section>

      {/* bottom stats */}
      <section className="grid grid-cols-3 gap-3 relative">
        <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="flex justify-between">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Goal
            </p>
            <button className="text-slate-400 transition hover:text-white cursor-pointer">
              <FiEdit2 onClick={openGoal} className="text-sm" />
            </button>
          </div>

          <p className="font-semibold">
            {weightGoalAmount ? formattedWeightGoal : "No data"}{" "}
            {weightGoalUnit || ""}
          </p>
          <WeightGoalForm
            key={isGoalOpen}
            goal={formattedWeightGoal}
            unit={weightGoal.unit}
            onClose={closeGoal}
            isOpen={isGoalOpen}
          />
        </div>

        <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/5 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Left</p>
          <p className="font-semibold">
            <p className="font-semibold">
              {weightRemaining === null
                ? "No data"
                : weightRemaining <= 0
                  ? "Reached 🎉"
                  : `${formattedWeightRemaining} ${weightGoalUnit || ""}`}
            </p>
          </p>
        </div>

        <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/5 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Updated
          </p>
          <p className="font-semibold">{lastUpdated}</p>
        </div>
      </section>
    </div>
  );
}
