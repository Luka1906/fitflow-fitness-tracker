import HeatMap from "../../ui/mockDashboards/mockCharts/Heatmap";

export default function Consistency() {
  return (
    <section className="relative overflow-hidden py-16  bg-gradient-to-b from-sky-400/3 via-sky-400/2 to-transparent">



      <div className="relative z-10 flex flex-col gap-10">
        <header className="mx-auto max-w-6xl text-center">
          <div className="mx-auto max-w-2xl">
            <span className="inline-flex rounded-full border border-sky-400/30 bg-sky-400/5 px-4 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-sky-400">
              Consistency that counts
            </span>

            <h2 className="mt-6 font-accent text-4xl font-bold leading-[1.10] tracking-tight text-text-primary-headings sm:text-5xl">
              Every Day You Show Up{" "}
              <span className="text-sky-400">
                Progress{" "}
              </span>
              Shows Up
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-text-primary-paragraph">
              A full year of workouts, progress, and consistency - visualized
              in one place to keep you motivated every day.
            </p>
          </div>
        </header>

        <HeatMap />
      </div>
    </section>
  );
}