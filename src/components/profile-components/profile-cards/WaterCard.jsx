import { useEffect, useMemo, useState } from "react";
import { FiDroplet, FiEdit2, FiPlus, FiMinus } from "react-icons/fi";
import { useFetcher, useLoaderData } from "react-router-dom";
import { Modal } from "../../../ui/Modal";
import EditWaterLogs from "./EditWaterLogs";
export default function WaterCard() {
  const today = new Date().toISOString().split("T")[0];
  const data = useLoaderData();
  const addWaterFetcher = useFetcher();
  const goalFetcher = useFetcher();

  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState(null);
  const [editGoal, setEditGoal] = useState(false);
  const [activeModal, setActiveModal] = useState(false);

  const consumedWater = data.waterLogs.reduce(
    (accumulator, currentValue) => accumulator + currentValue.amount,
    0,
  );

  const percentage = Math.min(
    (consumedWater / data.selectedWaterGoal) * 100,
    100,
  );
  const remaining = Math.max(data.selectedWaterGoal - consumedWater, 0);

  //   progress ofset function

  const progressOffset = useMemo(() => {
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    return circumference - (percentage / 100) * circumference;
  }, [percentage]);

  //   function handlers

  const handlePresetClick = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  //   adding custom water amount function
  const handleCustomAmount = (event) => {
    setCustomAmount(event.target.value);
    setSelectedAmount("");
  };

  //   incresing custom water amount function

  const handleIncreaseWaterAmount = () => {
    setCustomAmount((prev) => Math.min(Number(prev || 0) + 50, goal));
    setSelectedAmount("");
  };

  //   decreasing custom water amount function

  const handleDecreaseWaterAmount = () => {
    setCustomAmount((prev) => Math.max(prev - 50, 0));
    setSelectedAmount("");
  };

  //   Clean custom amount input when submit effect
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

  // Exiting edit mode for updating water goal

  useEffect(() => {
    if (!editGoal) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setEditGoal(false);
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);
  }, [editGoal]);

  return (
    <div className="min-h-screen p-6">
      <div className="border rounded-4xl   border-white/10 bg-white/5  flex flex-col p-5  ">
        {/* top row */}

        <section className="flex items-start justify-between text-white ">
          <div className="space-y-1">
            <p className="text-sm font-medium tracking-wide text-slate-400">
              Water Intake
            </p>
            <p className="text-2xl font-semibold ">Stay hydrated</p>
          </div>
          <button
            onClick={() => setActiveModal(true)}
            className="h-10 w-10  border border-white/10 bg-white/5 text-slate-300 flex items-center justify-center rounded-full hover:bg-white/10  hover:text-white transition"
          >
            <FiEdit2 />
          </button>
          {activeModal && (
            <Modal onClose={() => setActiveModal(false)}>
              <EditWaterLogs />
            </Modal>
          )}
        </section>

        {/* central content */}

        <section className="mt-6 flex  gap-5">
          <div className="relative flex h-40 w-40 items-center justify-center">
            <svg className="absolute  -rotate-90" viewBox="0 0 120 120">
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
                className="text-accent-dark transition-all duration-500"
                strokeDasharray={2 * Math.PI * 54}
                strokeDashoffset={progressOffset}
              />
            </svg>

            <div className="relative flex flex-col items-center">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <FiDroplet className="text-lg text-accent-dark" />
              </div>
              <p className="text-2xl font-bold text-white">
                {Math.round(percentage)}%
              </p>
              <p className="text-xs tracking-wide text-slate-400">completed</p>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex-1 space-y-0.5">
              <h2 className="text-3xl text-white font-bold">
                {consumedWater} ml
              </h2>
              <p className="text-slate-400 text-sm">
                of {data.selectedWaterGoal} ml daily goal
              </p>
            </div>

            <div className="flex flex-col bg-bg-dark p-4 rounded-2xl space-y-2">
              <p className="uppercase text-xs tracking-wide text-slate-400 ">
                Remaining
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                {remaining === 0 ? "Goal reached 🎉" : `${remaining} ml left`}
              </p>
            </div>
          </div>
        </section>
        {/* quick actions */}
        <section className="flex flex-col mt-6">
          <p className="uppercase text-slate-500 text-xs tracking-[0.2rem]">
            Quick add
          </p>
          <addWaterFetcher.Form
            method="POST"
            action="/profile/add-water"
            className="grid grid-cols-3 gap-3"
          >
            {[250, 500, 750].map((amount) => (
              <button
                key={amount}
                type="submit"
                onClick={() => handlePresetClick(amount)}
                value={amount}
                name="amount"
                className=" group border border-white/10 bg-white/5 p-3 text-left  rounded-2xl mt-3 hover:bg-white/10 transition"
              >
                <div className="bg-white/10 h-8 w-8 mb-2 flex items-center justify-center rounded-full text-slate-300 group-hover:text-white transition ">
                  {" "}
                  <FiPlus />
                </div>
                <p className="text-white font-semibold">{amount}</p>
                <p className="text-xs text-slate-400">ml</p>
              </button>
            ))}
            {/* Hidden date */}
            {selectedAmount && <input hidden name="date" value={today} />}
          </addWaterFetcher.Form>
          <addWaterFetcher.Form
            method="POST"
            action="/profile/add-water"
            className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3"
          >
            <p className="text-[0.7rem] font-medium tracking-[0.2rem] text-slate-400 uppercase">
              Custom amount
            </p>

            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleDecreaseWaterAmount}
                  className="h-11 w-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/15 transition"
                >
                  <FiMinus />
                </button>

                <input
                  type="number"
                  value={customAmount}
                  name="amount"
                  onChange={handleCustomAmount}
                  className="w-48 h-11 rounded-2xl bg-bg-dark border border-white/10 px-4 text-white placeholder:text-slate-500 outline-none"
                  placeholder="e.g. 300"
                />

                <button
                  type="button"
                  onClick={handleIncreaseWaterAmount}
                  className="h-11 w-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center hover:bg-white/15 transition"
                >
                  <FiPlus />
                </button>
              </div>

              <button className="flex items-center text-sm font-medium cursor-pointer text-text-primary-headings active:scale-115 transition hover:text-text-primary-paragraph">
                <FiPlus />
                Add
              </button>
            </div>
            <input hidden name="date" value={today} />
          </addWaterFetcher.Form>
        </section>
        {/* bottom bar */}
        <section className="flex justify-between mt-6 border border-white/10 bg-white/5 p-3 rounded-2xl">
          <div className="space-y-1  ">
            <p className="text-slate-500 uppercase text-xs tracking-wide">
              Daily goal
            </p>

            {editGoal ? (
              <goalFetcher.Form
                method="PATCH"
                action="/profile/edit-water-goal"
                className="relative top-1"
              >
                {" "}
                <input
                  autoFocus
                  className=" border border-white/10 py-1 px-3  focus:outline-none  focus:border-white/30 active:scale-95 transition rounded-lg"
                  type="number"
                  defaultValue={data.selectedWaterGoal}
                  name="waterGoal"
                />{" "}
                <button type="submit">
                  <FiPlus className="absolute -right-5 top-1/2 -translate-y-1/2 text-lg font-semibold" />
                </button>
              </goalFetcher.Form>
            ) : (
              <p className="text-white text-sm">{data.selectedWaterGoal}ml</p>
            )}
          </div>
          {!editGoal && (
            <button
              onClick={() => setEditGoal(true)}
              className="border border-white/10 bg-white/5 py-2 px-4 font-medium text-sm text-white rounded-xl hover:bg-white/10 transition"
            >
              Edit goal
            </button>
          )}
        </section>
      </div>
    </div>
  );
}
