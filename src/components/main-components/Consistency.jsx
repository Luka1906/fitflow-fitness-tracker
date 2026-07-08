import HeatMap from "../../ui/mockDashboards/mockCharts/Heatmap";

export default function Consistency() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-400/3 via-sky-400/2 to-transparent py-12 sm:py-16 lg:py-20">
      <div className="relative z-10 flex flex-col gap-10">
        <header className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <div className="mx-auto max-w-2xl">
            <span className="inline-flex rounded-full border border-sky-400/30 bg-sky-400/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-sky-400 sm:text-sm">
              Consistency that counts
            </span>

            <h2 className="mt-6 font-accent text-3xl font-bold leading-tight tracking-tight text-text-primary-headings sm:text-4xl lg:text-5xl">
              Every Day You Show Up{" "}
              <span className="text-sky-400">Progress</span>{" "}
              Shows Up
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-primary-paragraph sm:text-lg">
              A full year of workouts, progress, and consistency visualized in
              one place to keep you motivated every day.
            </p>
          </div>
        </header>

        <HeatMap />
      </div>
    </section>
  );
}