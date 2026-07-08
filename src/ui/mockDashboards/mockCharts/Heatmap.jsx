import { heatmapData } from "../mockData/mockHeatMapData";
import { FaTrophy, FaFire, FaRegCalendarCheck } from "react-icons/fa6";
import { useState } from "react";
import Tooltip from "../../Tooltip";
import { createLocalDate } from "../../../utils/createLocalDate";

export default function HeatMap() {
  const [tooltip, setTooltip] = useState(null);
  const weeklySquares = [];

  for (let i = 0; i < heatmapData.length; i += 7) {
    weeklySquares.push(heatmapData.slice(i, i + 7));
  }

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const days = ["Mon", "Wed", "Fri"];

  const getSquareColor = (activity) => {
    if (activity === 0) return "bg-slate-700";
    if (activity === 1) return "bg-sky-950";
    if (activity === 2) return "bg-sky-800";
    if (activity === 3) return "bg-sky-600";
    return "bg-sky-400";
  };

  const stats = [
    {
      title: "March",
      label: "Most Active Month",
      description: "35 workouts",
      icon: <FaTrophy className="text-amber-400" size={22} />,
    },
    {
      title: "12",
      label: "Day Streak",
      description: "Keep the fire going",
      icon: <FaFire className="text-orange-400" size={22} />,
    },
    {
      title: "156",
      label: "Workouts Logged",
      description: "Total this year",
      icon: <FaRegCalendarCheck className="text-accent-dark" size={22} />,
    },
  ];

  return (
   <section className="mx-auto w-[95%] rounded-3xl border border-accent-dark/30 bg-accent-dark/5 px-4 py-8 shadow-[0_20px_80px_rgba(56,189,248,0.08)] sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-5 lg:mb-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-dark sm:text-sm sm:tracking-[0.25em]">
              Progress Overview
            </p>

            <h2 className="text-xl font-bold text-text-primary-headings sm:text-2xl lg:text-3xl">
              365 Day Activity Heatmap
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-text-primary-paragraph sm:text-sm">
            <span>Less</span>
            <div className="h-3.5 w-3.5 rounded-sm bg-slate-700 sm:h-4 sm:w-4" />
            <div className="h-3.5 w-3.5 rounded-sm bg-sky-950 sm:h-4 sm:w-4" />
            <div className="h-3.5 w-3.5 rounded-sm bg-sky-800 sm:h-4 sm:w-4" />
            <div className="h-3.5 w-3.5 rounded-sm bg-sky-600 sm:h-4 sm:w-4" />
            <div className="h-3.5 w-3.5 rounded-sm bg-sky-400 sm:h-4 sm:w-4" />
            <span>More</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-background-dark/40 p-3 sm:p-5">
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[620px] sm:min-w-[760px] lg:min-w-0">
              <ul className="mb-3 ml-8 grid grid-cols-12 text-xs text-text-primary-paragraph sm:mb-4 sm:ml-10 sm:text-sm">
                {months.map((month) => (
                  <li key={month}>{month}</li>
                ))}
              </ul>

              <div className="flex gap-2 sm:gap-3">
                <ul className="flex flex-col gap-[18px] pt-1 text-xs text-text-primary-paragraph sm:gap-8 sm:text-sm">
                  {days.map((day) => (
                    <li key={day}>{day}</li>
                  ))}
                </ul>

                <div className="flex gap-[2px] sm:gap-[3px]">
                  {weeklySquares.map((week, index) => (
                    <div className="flex flex-col gap-[2px] sm:gap-[3px]" key={index}>
                      {week.map((day) => {
                        const squareColor = getSquareColor(day.count);

                        return (
                          <div
                            key={day.date}
                            onMouseEnter={(e) => {
                              setTooltip({
                                x: e.clientX,
                                y: e.clientY,
                                activity: day.count,
                                day: createLocalDate(day.date),
                              });
                            }}
                            onMouseLeave={() => setTooltip(null)}
                            className={`h-2.5 w-2.5 rounded-sm ${squareColor} transition hover:scale-110 hover:ring-2 hover:ring-sky-300/60 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4 xl:h-5 xl:w-5`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>

                {tooltip && <Tooltip tooltip={tooltip} />}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/3 p-4 sm:p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 sm:h-12 sm:w-12">
                {stat.icon}
              </div>

              <div>
                <h3 className="text-xl font-bold text-text-primary-headings sm:text-2xl">
                  {stat.title}
                </h3>

                <p className="text-sm font-semibold text-text-primary-headings sm:text-base">
                  {stat.label}
                </p>

                <p className="text-xs text-text-primary-paragraph sm:text-sm">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
