import { FiTrendingDown, FiPlus, FiEdit2 } from "react-icons/fi";

export default function WeightCard() {
  const currentWeight = 182.4;
  const goalWeight = 175;
  const changeThisWeek = -1.6;
  const remaining = Math.abs(currentWeight - goalWeight).toFixed(1);

  return (
    <div className="rounded-4xl border border-white/10 bg-white/5 p-5 text-white">
      {/* top row */}
      <section className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium tracking-wide text-slate-400">
            Weight Progress
          </p>
          <h2 className="text-2xl font-semibold">Your journey</h2>
        </div>

        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white">
          <FiEdit2 />
        </button>
      </section>

      {/* main weight */}
      <section className="mt-6 rounded-3xl bg-bg-dark p-5">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2rem] text-slate-500">
              Current
            </p>

            <div className="mt-2 flex items-end gap-2">
              <h3 className="text-5xl font-bold">{currentWeight}</h3>
              <span className="pb-2 text-slate-400">lbs</span>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 text-emerald-300">
            <div className="flex items-center gap-1 text-sm font-semibold">
              <FiTrendingDown />
              {Math.abs(changeThisWeek)} lbs
            </div>
            <p className="text-xs text-emerald-200/70">this week</p>
          </div>
        </div>

        {/* fake mini chart */}
        <div className="mt-6 h-24 rounded-2xl border border-white/10 bg-white/5 p-3">
          <svg viewBox="0 0 300 80" className="h-full w-full">
            <path
              d="M0 55 C40 45, 45 60, 80 50 C120 35, 130 45, 165 30 C205 15, 230 35, 300 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              className="text-accent-dark"
            />

            <circle cx="300" cy="20" r="5" className="fill-accent-dark" />
          </svg>
        </div>
      </section>

      {/* bottom stats */}
      <section className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Goal</p>
          <p className="mt-1 font-semibold">{goalWeight} lbs</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">Left</p>
          <p className="mt-1 font-semibold">{remaining} lbs</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Updated
          </p>
          <p className="mt-1 font-semibold">Today</p>
        </div>
      </section>

      {/* action */}
      <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-white/10 py-3 font-medium transition hover:bg-white/15 active:scale-[0.98]">
        <FiPlus />
        Log weight
      </button>
    </div>
  );
}