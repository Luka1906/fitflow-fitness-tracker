import BannerStreakChart from "./BannerStreakChart";
import LastWorkoutBanner from "./LastWorkoutBanner";
import WaterBannerRing from "./WaterBannerRing";
import WeightBannerChart from "./WeightBannerChart";
import WorkoutBannerChart from "./WorkoutBannerChart";

export default function DashboardBanner() {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-3 sm:p-4">
      <header className="px-2 pb-3 sm:px-3">
        <h1 className="text-xl font-semibold text-white">FitFlow Dashboard</h1>
        <p className="text-sm text-slate-400">Today's progress</p>
      </header>

      <main className="grid grid-cols-1 gap-4 p-2 sm:p-3 md:grid-cols-2">
        <section className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 md:col-span-2">
          <WeightBannerChart />
        </section>

        <section className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <WaterBannerRing />
        </section>

        <section className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <BannerStreakChart />
        </section>

        <section className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 md:col-span-2">
          <LastWorkoutBanner />
        </section>
      </main>
    </div>
  );
}