import BannerStreakChart from "./BannerStreakChart";
import WaterBannerRing from "./WaterBannerRing";
import WeightBannerChart from "./WeightBannerChart";

export default function DashboardBanner() {
 
    return (
    <div className="border border-white/10 bg-white/5">
      <header className="p-4">
        <h1 className="text-xl font-semibold text-white">FitFlow Dashboard</h1>
        <p className="text-sm text-slate-400">Today's progress</p>
      </header>
      <main className="grid grid-cols-2">
        {/* Weight Trend Chart */}
        <section className="border border-white/10 row-span-2 p-4  ">
          <WeightBannerChart />
        </section>

        {/* Water Goal Progress Ring */}
        <section className="border border-white/10 flex items-center justify-center p-4">
          <WaterBannerRing />
        </section>
        {/* Current Streak */}
        <section className="border border-white/10 p-4">
          <BannerStreakChart/>
        </section>

        {/* Recent Workout */}
        <section className="border border-white/10">Recent Workout</section>
        {/* Weekly Workouts */}
        <section className="border border-white/10">Weekly Workouts</section>
      </main>
    </div>
  );
}
