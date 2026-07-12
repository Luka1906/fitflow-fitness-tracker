import { useEffect, useMemo, useState } from "react";
import useToggle from "../../../../hooks/useToggle";
import { FiDroplet, FiEdit2, FiPlus, FiMinus } from "react-icons/fi";
import { useFetcher, useLoaderData } from "react-router-dom";
import WaterLogsHistory from "./WaterLogsHistory";
import Drawer from "../../../../ui/Drawer";
import confetti from "canvas-confetti";
import { createLocalDate } from "../../../../utils/createLocalDate";
import { getTodayKey } from "../../../../utils/getTodayKey";

export default function WaterCard() {
  const today = getTodayKey();
  const { water } = useLoaderData();

  const addWaterFetcher = useFetcher();
  const goalFetcher = useFetcher();
  const drawerFetcher = useFetcher();

  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [editGoal, setEditGoal] = useState(false);

  const { isOpen, open, close } = useToggle();

  const consumedWater = water.todayLogs.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0,
  );

  const percentage = Math.min((consumedWater / water.goal) * 100, 100);
  const remaining = Math.max(water.goal - consumedWater, 0);

  const progressOffset = useMemo(() => {
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    return circumference - (percentage / 100) * circumference;
  }, [percentage]);

  const handleOpenDrawer = () => {
    open();
    drawerFetcher.load("/profile/water-logs");
  };

  const handlePresetClick = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmount = (event) => {
    setCustomAmount(event.target.value);
    setSelectedAmount(null);
  };

  const handleIncreaseWaterAmount = () => {
    setCustomAmount((prev) => Math.min(Number(prev || 0) + 50, water.goal));
    setSelectedAmount(null);
  };

  const handleDecreaseWaterAmount = () => {
    setCustomAmount((prev) => Math.max(Number(prev || 0) - 50, 0));
  };

  useEffect(() => {
    if (addWaterFetcher.state === "idle" && addWaterFetcher.data?.success) {
      setCustomAmount("");
      setSelectedAmount(null);
    }
  }, [addWaterFetcher.state, addWaterFetcher.data]);

  useEffect(() => {
    if (goalFetcher.state === "idle" && goalFetcher.data?.success) {
      setEditGoal(false);
    }
  }, [goalFetcher.state, goalFetcher.data]);

  useEffect(() => {
    if (!editGoal) return;

    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setEditGoal(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [editGoal]);

  useEffect(() => {
    const celebrationKey = `water-goal-celebrated-${today}`;
    const alreadyCelebrated = localStorage.getItem(celebrationKey);

    if (consumedWater >= water.goal && !alreadyCelebrated) {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.7, x: 0.25 },
      });

      localStorage.setItem(celebrationKey, "true");
    }

    if (consumedWater < water.goal) {
      localStorage.removeItem(celebrationKey);
    }
  }, [consumedWater, water.goal, today]);

  return (
    <div className="flex min-w-0 flex-col rounded-4xl border border-white/10 bg-white/5 p-4 sm:p-5">
      <section className="flex items-start justify-between gap-4 text-white">
        <div className="min-w-0 space-y-1">
          <p className="text-xs font-medium tracking-wide text-slate-400 sm:text-sm">
            Water Intake
          </p>
          <p className="text-lg font-semibold sm:text-2xl">Stay hydrated</p>
        </div>

        <button
          type="button"
          onClick={handleOpenDrawer}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white sm:h-10 sm:w-10 cursor-pointer"
        >
          <FiEdit2 />
        </button>

        <Drawer onClose={close} isOpen={isOpen}>
          <WaterLogsHistory
            logs={drawerFetcher.data?.waterLogs}
            onClose={close}
          />
        </Drawer>
      </section>

      <section className="mt-5 flex min-w-0 items-center gap-3 sm:mt-6 sm:gap-4">
        <div className="relative flex h-32 w-32 shrink-0 items-center justify-center sm:h-40 sm:w-40">
          <svg className="absolute -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="10"
            />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              strokeLinecap="round"
              className="text-sky-400/60 transition-all duration-500"
              strokeDasharray={2 * Math.PI * 54}
              strokeDashoffset={progressOffset}
            />
          </svg>

          <div className="relative flex flex-col items-center">
            <div className="mb-1 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 sm:mb-2 sm:h-10 sm:w-10">
              <FiDroplet className="text-sm text-sky-400/60 sm:text-lg" />
            </div>
            <p className="text-xl font-bold text-white sm:text-2xl">
              {Math.floor(percentage)}%
            </p>
            <p className="text-[11px] tracking-wide text-slate-400 sm:text-xs">
              completed
            </p>
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3 sm:gap-4">
          <div className="min-w-0 space-y-0.5">
            <h2 className="truncate text-2xl font-bold text-white sm:text-3xl">
              {consumedWater} ml
            </h2>
            <p className="text-xs text-slate-400 sm:text-sm">
              of {water.goal} ml daily goal
            </p>
          </div>

          <div className="rounded-2xl bg-bg-dark p-3 sm:p-4 ">
            <p className="text-[11px] uppercase tracking-wide text-slate-400 sm:text-xs">
              Remaining
            </p>
            <p className="mt-1 text-sm font-semibold text-white sm:mt-2 sm:text-lg">
              {remaining === 0 ? "Goal reached 🎉" : `${remaining} ml left`}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-5 flex flex-col sm:mt-6">
        <p className="text-[11px] uppercase tracking-[0.18rem] text-slate-500 sm:text-xs sm:tracking-[0.2rem]">
          Quick add
        </p>

        <addWaterFetcher.Form
          method="POST"
          action="/profile/add-water"
          className="mt-3 grid grid-cols-3 gap-2"
        >
          {[250, 500, 750].map((amount) => (
            <button
              key={amount}
              type="submit"
              onClick={() => handlePresetClick(amount)}
              value={amount}
              name="amount"
              className="group flex min-w-0 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-2 text-center transition hover:bg-white/10 sm:p-3 cursor-pointer"
            >
              <div className="mb-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-slate-300 transition group-hover:text-white sm:mb-2 sm:h-8 sm:w-8">
                <FiPlus />
              </div>
              <p className="text-sm font-semibold text-white sm:text-base">
                {amount}
              </p>
              <p className="text-[11px] text-slate-400 sm:text-xs">ml</p>
            </button>
          ))}

          {selectedAmount && <input hidden name="date" value={today} />}
        </addWaterFetcher.Form>

        <addWaterFetcher.Form
          method="POST"
          action="/profile/add-water"
          className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4"
        >
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.18rem] text-slate-400 sm:text-[0.7rem] sm:tracking-[0.2rem]">
            Custom amount
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex min-w-0 flex-1 gap-2">
              <button
                type="button"
                onClick={handleDecreaseWaterAmount}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 transition hover:bg-white/15 sm:h-11 sm:w-11 cursor-pointer"
              >
                <FiMinus />
              </button>

              <input
                type="number"
                value={customAmount}
                name="amount"
                onChange={handleCustomAmount}
                className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-bg-dark px-3 text-center text-sm text-white outline-none placeholder:text-slate-400 sm:px-4 sm:text-base"
                placeholder="e.g. 300"
              />

              <button
                type="button"
                onClick={handleIncreaseWaterAmount}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 transition hover:bg-white/15 sm:h-11 sm:w-11 cursor-pointer"
              >
                <FiPlus />
              </button>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-1 rounded-xl bg-white/10 px-4 py-2.5 text-sm font-medium text-text-primary-headings transition hover:bg-white/15 hover:text-text-primary-paragraph active:scale-95 sm:w-auto sm:shrink-0 sm:py-3 cursor-pointer"
            >
              <FiPlus />
              Add
            </button>
          </div>

          <input hidden name="date" value={today} />
        </addWaterFetcher.Form>
      </section>

      <section className="mt-5 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 sm:mt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 space-y-1">
          <p className="text-[11px] uppercase tracking-wide text-slate-500 sm:text-xs">
            Daily goal
          </p>

          {editGoal ? (
            <goalFetcher.Form
              method="PATCH"
              action="/profile/edit-water-goal"
              className="flex items-center gap-2"
            >
              <input
                autoFocus
                className="w-full rounded-lg border border-white/10 bg-transparent px-3 py-1 text-sm text-white transition focus:border-white/30 focus:outline-none sm:w-32 sm:text-base"
                type="number"
                defaultValue={water.goal}
                name="waterGoal"
              />

              <button
                type="submit"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white transition hover:bg-white/15 cursor-pointer"
              >
                <FiPlus />
              </button>
            </goalFetcher.Form>
          ) : (
            <p className="text-sm text-white">{water.goal} ml</p>
          )}
        </div>

        {!editGoal && (
          <button
            type="button"
            onClick={() => setEditGoal(true)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 cursor-pointer"
          >
            Edit goal
          </button>
        )}
      </section>
    </div>
  );
}
