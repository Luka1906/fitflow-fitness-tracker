import { useState, useEffect } from "react";
import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";

export function AddWaterForm({ onClose }) {
  const presets = [250, 500, 750, 1000];
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const fetcher = useFetcher();

  const handlePresetClick = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.success) {
      onClose();
    }
  }, [fetcher.state, fetcher.data, onClose]);

  return (
    <fetcher.Form method="POST" action="/profile/add-water" className="flex flex-col">
      <div className="flex items-center justify-between bg-bg-dark px-5 py-4">
        <h2 className="text-xl font-semibold tracking-wide text-accent-dark">
          Log Water
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

      <div className="flex flex-col gap-5 px-5 py-6">
        <div className="space-y-3">
          <p className="text-sm font-medium tracking-wide text-slate-500">
            Quick add
          </p>

          <div className="grid grid-cols-2 gap-3">
            {presets.map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => handlePresetClick(amount)}
                className={`rounded-xl border px-4 py-3 text-sm font-medium transition active:scale-95 focus:outline-none focus:ring-4 focus:ring-accent-dark/10 ${
                  selectedAmount === amount
                    ? "border-accent-dark bg-accent-dark text-white"
                    : "border-accent-dark/20 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                +{amount} ml
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label
            htmlFor="amount"
            className="text-sm font-medium tracking-wide text-slate-500"
          >
            Or enter a custom amount
          </label>

          <input
            type="number"
            id="amount"
            name= {`${selectedAmount ? undefined : "amount"}`}
            min="0"
            step="1"
            placeholder="e.g. 300"
            value={customAmount}
            onChange={handleCustomChange}
            className="w-full rounded-xl border border-accent-dark/20 bg-white px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-accent-dark focus:ring-4 focus:ring-accent-dark/10"
          />
        </div>

        {selectedAmount && (
          <input hidden name="amount" value={selectedAmount} />
        )}
        {/* Hidden date */}
        <input hidden name="date" value={today} />
      </div>

      <div className="flex justify-end gap-3 border-t border-black/5 bg-slate-50 px-5 py-4">
        <Button type="button" variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={!selectedAmount && !customAmount}>
          Save
        </Button>
      </div>
    </fetcher.Form>
  );
}
