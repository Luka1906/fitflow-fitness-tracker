import { FiTrendingDown, FiPlus, FiEdit2, FiTrendingUp } from "react-icons/fi";
export default function WeightCard1() {
  return (
    <div className="border rounded-4xl   border-white/10 bg-white/5  flex flex-col p-5 text-white">
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
      <section className="bg-bg-dark my-6 p-5 rounded-3xl">
        <div className="flex  items-end justify-between">
          <div>
            <p className="tracking-[0.18rem] uppercase text-slate-500 text-sm ">
              Current
            </p>
            <div className="mt-2 flex items-end gap-2">
              <h3 className="text-5xl font-bold">180.5</h3>
              <span className="pb-2 text-slate-400">lbs</span>
            </div>
          </div>
          <div className="flex flex-col items-center border border-emerald-400/20 bg-emerald-400/10 px-3 py-2 rounded-2xl text-emerald-300">
            <div className="flex items-center gap-1 text-sm font-semibold ">
                <FiTrendingUp/>
                <p>1.6 lbs</p>
            </div>
            <p className="text-xs text-emerald-200/70">this week</p>
          </div>
        </div>
        {/* mini chart */}
      <div className="mt-6 h-24 rounded-2xl border border-white/10 bg-white/5 p-3">
                <p>luka</p>
            </div>
      </section>

     
    </div>
  );
}
