import { IoMdArrowDropdown } from "react-icons/io";
import { TiDelete } from "react-icons/ti";

export default function SetRow({ set, onDelete, onChange }) {
  return (
    <div className="flex items-center rounded-xl border border-slate-200 bg-white p-3 px-2">
      <span className="b min-w-[52px] text-sm font-semibold text-slate-600">
        {` Set ${set.set_order}`}
      </span>

      <div className="flex items-center gap-3">
        <div className="flex overflow-hidden rounded-lg border border-slate-300 bg-slate-50">
          <input
            className="w-14 border-none bg-transparent px-0.5 py-2 text-center text-sm text-slate-700 outline-none"
            type="number"
            value={set.weight}
            onChange={(e) => onChange("weight", e.target.value)}
          />

          <div className="relative border-l border-slate-300">
            <select
              className="appearance-none bg-transparent px-3 py-2 pr-8 text-sm text-slate-600 outline-none"
              name="unit"
              defaultValue="lbs"
            >
              <option value="lbs">lbs</option>
              <option value="kg">kg</option>
            </select>

            <IoMdArrowDropdown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-lg text-slate-500" />
          </div>
        </div>

        <span className="text-sm font-semibold text-slate-400">×</span>

        <div className="flex overflow-hidden rounded-lg border border-slate-300 bg-slate-50">
          <input
            className="w-14 border-none bg-transparent px-0.5 py-2 text-center text-sm text-slate-800 outline-none"
            type="number"
            value={set.reps}
            onChange={(e) => onChange("reps", e.target.value)}
          />
          <span className="border-l border-slate-300 px-3 py-2 text-sm text-slate-600">
            reps
          </span>
        </div>
      </div>

   <button
        type="button"
        onClick={onDelete}
        className=" ml-3 flex h-10 w-10 items-center justify-center rounded-full border border-transparent text-slate-400 transition hover:border-red-100 hover:bg-red-50 hover:text-red-500"
        aria-label={`Delete ${set.set}`}
      >
        <TiDelete className="text-2xl" />
      </button>
    </div>
  );
}
