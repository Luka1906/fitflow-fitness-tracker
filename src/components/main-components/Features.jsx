import Feature from "./Feature";
import { IoBarbell } from "react-icons/io5";
import { GiWaterDrop } from "react-icons/gi";
import { FaChartLine } from "react-icons/fa";
import { FaWeightScale } from "react-icons/fa6";

const features = [
  {
    icon: IoBarbell,
    title: "Track Workouts",
    label: "Workout logs",
    description: "Log exercises, sets, reps, and training duration.",
    className: "lg:col-span-7",
  },
  {
    icon: GiWaterDrop,
    title: "Hydration Tracking",
    label: "Daily goals",
    description: "Monitor your water intake and stay on target.",
    className: "lg:col-span-5",

  },
  {
    icon: FaWeightScale,
    title: "Weight Progress",
    label: "Trend tracking",
    description: "Track weigh-ins and visualize progress over time.",
    className: "lg:col-span-5",


  },
  {
    icon: FaChartLine,
    title: "Progress Analytics",
    label: "Clean insights",
    description: "Understand your habits with simple charts and stats.",
    className: "lg:col-span-7",

  },
];

export default function Features() {
  return (
    <section className="relative overflow-hidden py-16">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-cta-dark/10 blur-[130px]" />

      <header className="relative z-10 mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-accent-dark/25 bg-accent-dark/5 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-accent-dark">
            Features
          </span>

          <h2 className="mt-6 font-accent text-4xl font-bold tracking-tight text-text-primary-headings sm:text-5xl leading-[1.05]">
            Everything you need to{" "}
            <span className="text-cta-dark">
              stay consistent
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-text-primary-paragraph">
            Simple tools to help you track workouts, hydration, weight, and
            progress without overcomplicating your routine.
          </p>
        </div>

        <article className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {features.map((feature) => (
            <Feature key={feature.title} {...feature} />
          ))}
        </article>
      </header>
    </section>
  );
}