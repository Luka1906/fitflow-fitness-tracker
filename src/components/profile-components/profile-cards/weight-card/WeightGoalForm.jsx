import { useFetcher } from "react-router-dom";
import { useRef, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

export function WeightGoalForm({ onClose, isOpen, goal, unit }) {
  const weightFetcher = useFetcher();

  const inputRef = useRef();

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const closeModalOnExit = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", closeModalOnExit);

    return () => document.removeEventListener("keydown", closeModalOnExit);
  }, [onClose, isOpen]);

  //   Close modal on succesfully update
  useEffect(() => {
    if (!isOpen) return;
    if (weightFetcher.state === "idle" && weightFetcher.data?.success) {
      onClose();
    }
  }, [isOpen, onClose, weightFetcher.state, weightFetcher.data]);

  return (
    <div
      className={`
        absolute left-1/2 top-full z-50 mt-3
        w-[320px] -translate-x-1/2
        rounded-3xl border border-white/10
        bg-slate-900/70 p-4
        shadow-2xl backdrop-blur-2xl transition-all duration-200 ${isOpen ? "pointer-events-auto opacity-100 translate-y-0" : " pointer-events-none opacity-0 -translate-y-2"}
      `}
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-white">
        Edit goal
      </p>

      <weightFetcher.Form method="PATCH" action="/profile/edit-weight-goal">
        <div className="flex items-center gap-2">
          <input
            name="weightGoal"
            type="number"
            step="0.1"
            defaultValue={goal || ""}
            ref={inputRef}
            className="
              min-w-0 flex-1 rounded-xl
              border border-white/10
              bg-white/5 px-3 py-2
              text-sm text-white
              outline-none
            "
          />

          <div className="relative">
            <select
              name="unit"
              defaultValue={unit}
              className="
                appearance-none rounded-xl
                border border-white/10
                bg-white/5 px-3 py-2 pr-7
                text-sm text-white
                outline-none
              "
            >
              <option value="lbs">lbs</option>
              <option value="kg">kg</option>
            </select>

            <IoMdArrowDropdown className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-500" />
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            className="
              flex-1 rounded-xl bg-white/10
              px-3 py-2 text-sm text-white
              transition hover:bg-white/15
            "
          >
            Save
          </button>

          <button
            type="button"
            onClick={onClose}
            className="
              flex-1 rounded-xl border
              border-white/10 px-3 py-2
              text-sm text-slate-300
              transition hover:bg-white/10
            "
          >
            Cancel
          </button>
        </div>
      </weightFetcher.Form>
    </div>
  );
}
