import { FaRegClock } from "react-icons/fa6";

export function DurationRow() {
  return (
    <section className="flex flex-col gap-1 border p-3 border-black/10 rounded-xl bg-slate-50" >
      <label
        htmlFor="duration"
        className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-600"
      >
        Duration
      </label>
      <div className="flex items-center gap-4 mt-1">
        <div className="border p-2 rounded-lg border-slate-300 text-slate-600">
        <FaRegClock />
        </div>

        <div className="border border-slate-300 bg-slate-50 rounded-lg flex items-center h-full overflow-hidden text-slate-700">
          <input
            className="outline-none text-center  border-none w-14 placeholder:text-slate-500"
            type="number"
            name="hours"
            min="0"
            max="23"
            id="hours"
            placeholder="0"
          />

          <p className="border-l py-2 w-12 text-center border-slate-300 bg-slate-100 text-sm">hr</p>
        </div>

         <div className="border border-slate-300 bg-slate-50 rounded-lg flex items-center h-full overflow-hidden text-slate-700">
          <input
            className="outline-none text-center border-none w-14 placeholder:text-slate-500"
            type="number"
            name="minutes"
            id="minutes"
            placeholder="45"
            min="0"
            max="59"
          />

          <p className="border-l py-2 w-11 text-center border-slate-300 bg-slate-100 text-sm">min</p>
        </div>
      </div>
      <p className="text-xs font-semibold text-slate-500">How long was your workout?</p>
    </section>
  );
}
