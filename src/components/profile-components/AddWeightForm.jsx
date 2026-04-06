import { Form } from "react-router-dom";
import Button from "../../ui/Button";

export function AddWeightForm({ onClose }) {
  return (
    <Form method="POST" className="flex flex-col ">
      <div className="flex items-center justify-between  bg-bg-dark px-5 py-4">
        <h2 className="text-xl font-semibold tracking-wide text-accent-dark">
          Log Weight
        </h2>

        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9  items-center justify-center border border-slate-600 rounded-full text-2xl text-white/70 transition hover:bg-white/10 hover:text-white"
          aria-label="Close modal"
        >
          ×
        </button>
      </div>

      <div className="flex flex-col gap-3 px-5 py-6">
        <label
          htmlFor="weight"
          className="text-sm font-medium tracking-wide text-slate-500"
        >
          Enter your current weight
        </label>

        <input
          className="w-full rounded-xl border border-accent-dark/20 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-accent-dark focus:ring-4 focus:ring-accent-dark/10"
          type="number"
          name="weight"
          id="weight"
          min="0"
          step="1"
          placeholder="e.g. 175"
          autoFocus
        />
      </div>

      <div className="flex justify-end gap-3 border-t border-black/5 bg-slate-50 px-5 py-4">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </Form>
  );
}