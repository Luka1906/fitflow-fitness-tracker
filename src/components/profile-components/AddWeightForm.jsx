import { Form } from "react-router-dom";
import Button from "../../ui/Button";
import { IoMdArrowDropdown } from "react-icons/io";
import { useFetcher } from "react-router-dom";
import { useEffect } from "react";

export function AddWeightForm({ onClose }) {
  const today = new Date().toISOString().split("T")[0];

  const fetcher = useFetcher();

useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.success) {
      onClose();
    }
  }, [fetcher.state, fetcher.data, onClose]);


  return (
    <fetcher.Form method="POST" action="/profile/add-weight" className="flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between bg-bg-dark px-5 py-4">
        <h2 className="text-xl font-semibold tracking-wide text-accent-dark">
          Log Weight
        </h2>

        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-600 text-2xl text-white/70 transition hover:bg-white/10 hover:text-white"
          aria-label="Close modal"
        >
          ×
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 px-5 py-6">
        <label
          htmlFor="weight"
          className="text-sm font-medium tracking-wide text-slate-500"
        >
          Enter your current weight
        </label>

        <div className="flex overflow-hidden rounded-lg border border-slate-300 bg-slate-50">
          <input
            className="w-full border-none bg-transparent px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:ring-4 focus:ring-accent-dark/10"
            type="number"
            name="weight"
            id="weight"
            min="0"
            step="0.1"
            placeholder="e.g. 175.5"
            required
            autoFocus
          />

          <div className="relative flex border-l border-slate-300">
            <select
              className="appearance-none bg-transparent px-3 py-2 pr-8 text-base text-slate-600 outline-none"
              name="unit"
              defaultValue="lbs"
            >
              <option value="lbs">lbs</option>
              <option value="kg">kg</option>
            </select>

            <IoMdArrowDropdown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-lg text-slate-500" />
          </div>
        </div>

        {/* Hidden date */}
        <input type="hidden" name="date" value={today} />
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 border-t border-black/5 bg-slate-50 px-5 py-4">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </fetcher.Form>
  );
}