import { heatmapData } from "../mockData/mockHeatMapData";
import { FaTrophy, FaFire, FaRegCalendarCheck } from "react-icons/fa6";
import { useState } from "react";

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
    <section className="mx-auto w-[95%] rounded-3xl border border-accent-dark/30 bg-accent-dark/5 px-6 py-10 shadow-[0_20px_80px_rgba(56,189,248,0.08)]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent-dark">
              Progress Overview
            </p>

            <h2 className="text-2xl font-bold text-text-primary-headings sm:text-3xl">
              365 Day Activity Heatmap
            </h2>
          </div>

          <div className="flex items-center gap-2 text-sm text-text-primary-paragraph">
            <span>Less</span>
            <div className="h-4 w-4 rounded-sm bg-slate-700" />
            <div className="h-4 w-4 rounded-sm bg-sky-950" />
            <div className="h-4 w-4 rounded-sm bg-sky-800" />
            <div className="h-4 w-4 rounded-sm bg-sky-600" />
            <div className="h-4 w-4 rounded-sm bg-sky-400" />
            <span>More</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-background-dark/40 p-5">
          <div className="overflow-x-auto pb-2">
            <div className="min-w-[900px]">
              <ul className="mb-4 ml-10 grid grid-cols-12 text-sm text-text-primary-paragraph">
                {months.map((month) => (
                  <li key={month}>{month}</li>
                ))}
              </ul>

              <div className="flex gap-3">
                <ul className="flex flex-col gap-8 pt-1 text-sm text-text-primary-paragraph">
                  {days.map((day) => (
                    <li key={day}>{day}</li>
                  ))}
                </ul>

                <div className="flex gap-[3px]">
                  {weeklySquares.map((week, index) => (
                    <div className="flex flex-col gap-[3px]" key={index}>
                      {week.map((day) => {
                        const squareColor = getSquareColor(day.count);

                        return (
                          <div
                            key={day.date}
                            className={`h-5.5 w-5.5 rounded-sm ${squareColor} transition hover:scale-110 hover:ring-2 hover:ring-sky-300/60`}
                            title={`${day.date}: ${day.count} workout${
                              day.count === 1 ? "" : "s"
                            }`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-background-dark/50 p-5 shadow-[0_14px_40px_rgba(0,0,0,0.18)]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
                {stat.icon}
              </div>

              <div>
                <h3 className="text-2xl font-bold text-text-primary-headings">
                  {stat.title}
                </h3>

                <p className="font-semibold text-text-primary-headings">
                  {stat.label}
                </p>

                <p className="text-sm text-text-primary-paragraph">
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
