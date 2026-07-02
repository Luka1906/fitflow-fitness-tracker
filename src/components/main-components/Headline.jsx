import Button from "../../ui/Button";
import DashboardBanner from "../../ui/mockDashboards/mockCharts/DashboardBanner";
import { Link } from "react-router-dom";

export default function Headline() {
  return (
    <section className="mt-2 grid grid-cols-1 items-center gap-14 px-6 lg:grid-cols-2">
  

      <div>
        <h1 className="max-w-2xl font-accent text-5xl font-bold leading-tight text-text-primary-headings sm:text-6xl lg:text-7xl">
          Track. Train. Thrive. Your Fitness,{" "}
          <span className="text-cta-dark">All in One Place.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
          Build better habits with workout tracking, hydration goals,
          progress analytics, and clean dashboards designed to keep you
          consistent.
        </p>

      <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
  <div className="rounded-2xl border border-white/10 bg-white/4 p-5 ">
    <p className="text-2xl font-semibold text-accent-dark">12k+</p>
    <p className="mt-1 text-sm text-slate-400">
      Workouts logged
    </p>
  </div>

  <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
    <p className="text-2xl font-semibold text-blue-400">85%</p>
    <p className="mt-1 text-sm text-slate-400">
      Weekly consistency
    </p>
  </div>

  <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
    <p className="text-2xl font-semibold bg-gradient-to-t from-orange-400 to-amber-200 bg-clip-text text-transparent">7d</p>
    <p className="mt-1 text-sm text-slate-400">
      Average streak
    </p>
  </div>
</div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/auth?mode=signup">
            <Button variant="primary">
              Start Tracking
            </Button>
          </Link>

          <Link to="/auth">
            <Button variant="ghost">
              Log In
            </Button>
          </Link>
        </div>
      </div>

      <DashboardBanner />
    </section>
  );
}