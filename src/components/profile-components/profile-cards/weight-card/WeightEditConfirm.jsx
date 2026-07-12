import { FiEdit2 } from "react-icons/fi";
import { FaCalendar } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { useFetcher } from "react-router-dom";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { useState, useRef, useEffect } from "react";

export default function WeightEditConfirm({ log, onClose, isOpen }) {
  const editFetcher = useFetcher();
  const datePickerRef = useRef(null);
  const [selectedData, setSelectedData] = useState({
    date: log?.logged_at ? new Date(log.logged_at) : new Date(),
    weight: Number(log?.weight) || "",
    unit: log?.unit || "lbs",
  });
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    if (editFetcher.state === "idle" && editFetcher.data?.success) {
      onClose();
    }
  }, [isOpen, editFetcher.state, editFetcher.data, onClose]);
  return (
    <div className="text-text-primary-paragraph border border-white/10 bg-bg-dark/90 p-4 rounded-2xl flex flex-col gap-5">
      <header className="flex justify-between">
        <div className="flex gap-2">
          <FiEdit2 className="text-accent-dark dark h-9 w-9 bg-cta-dark/10 rounded-md p-2" />
          <div className="">
            <h2 className="text-text-primary-headings font-semibold">
              Edit weight log
            </h2>
            <p className="text-sm text-slate-500">Make changes to your entry</p>
          </div>
        </div>

        <IoMdClose
          onClick={onClose}
          className="h-9 w-9 p-2 border  border-white/10 rounded-full transition cursor-pointer bg-accent-dark/5 hover:bg-accent-dark/8 hover:text-text-primary-headings hover:border-white/20"
        />
      </header>
      <editFetcher.Form
        action={`/profile/weight-logs/${log?.id}/edit`}
        method="PATCH"
      >
        <main className="flex flex-col gap-2">
          <label
            className="text-sm text-text-primary-headings"
            htmlFor="weight-date"
          >
            Date
          </label>
          <div className="relative" ref={datePickerRef}>
            <button
              type="button"
              onClick={() => setShowCalendar((prev) => !prev)}
              className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-black/5 px-4 py-3 text-left transition hover:border-white/20"
            >
              <span>
                {selectedData.date
                  ? format(selectedData.date, "MMM d, yyyy")
                  : "Select date"}
              </span>

              <FaCalendar className="text-slate-300" />
            </button>

            {showCalendar && (
              <div className="absolute left-0 top-full z-50 mt-2 rounded-2xl border border-white/10 bg-bg-dark p-4 shadow-2xl">
                <DayPicker
                  mode="single"
                  selected={selectedData.date}
                  onSelect={(date) => {
                    if (!date) return;
                    setSelectedData((prev) => ({
                      ...prev,
                      date: date,
                    }));
                    setShowCalendar(false);
                  }}
                  classNames={{
                    root: "w-full text-slate-300",
                    month_caption: "mb-5 flex items-center justify-between",
                    caption_label: "text-lg font-semibold text-white",
                    nav: "absolute right-5 top-0 flex gap-2",
                    chevron: "fill-slate-400 h-5.5",
                    button_previous:
                      "flex h-7 w-7 items-center justify-center rounded-full bg-white/8 text-white transition hover:bg-blue-500/20 hover:text-blue-300",
                    button_next:
                      "flex h-7 w-7 items-center justify-center rounded-full bg-white/8 text-white transition hover:bg-blue-500/20 hover:text-blue-300",
                    weekdays: "mb-2 grid grid-cols-7 text-center",
                    weekday: "text-sm font-medium text-slate-500",
                    week: "grid grid-cols-7",
                    day: "flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white",
                    selected:
                      "bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-600",
                    today: "",
                    outside: "text-slate-700",
                    disabled: "text-slate-700/80",
                  }}
                  disabled={{ after: new Date() }}
                />
              </div>
            )}
          </div>
          <input
            type="hidden"
            name="logDate"
            value={format(selectedData.date, "yyyy-MM-dd")}
          />
          <label
            className="text-sm text-text-primary-headings"
            htmlFor="weight-count"
          >
            Weight
          </label>
          <div className="relative">
            <input
              name="weightCount"
              value={selectedData.weight}
              onChange={(event) =>
                setSelectedData((prev) => ({
                  ...prev,
                  weight: event.target.value,
                }))
              }
              id="weight-count"
              className="border p-3 pr-18 border-white/10 rounded-lg bg-black/3 outline-none focus:border-white/30 w-full"
              type="number"
            />
            <select
              className="absolute right-4 top-1/2 transform -translate-y-1/2 outline-none text-slate-300 "
              name="unit"
              id="unit"
              value={selectedData.unit}
              onChange={(event) =>
                setSelectedData((prev) => ({
                  ...prev,
                  unit: event.target.value,
                }))
              }
            >
              <option value="lbs">lbs</option>
              <option value="kg">kg</option>
            </select>
          </div>
        </main>
              <footer className="flex gap-3 mt-5">
        <button
          onClick={onClose}
          className="border border-white/10 bg-white/4 font-medium flex-1 py-3  rounded-lg text-[0.9rem] cursor-pointer"
        >
          Cancel
        </button>
        <button className="border border-blue-700/90 bg-blue-700/90 font-medium flex-1 py-3  rounded-lg text-[0.9rem] cursor-pointer">
          Save changes
        </button>
      </footer>
      </editFetcher.Form>

    </div>
  );
}
