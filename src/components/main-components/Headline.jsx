import Button from "../../ui/Button";
import DashboardBanner from "../../ui/mockDashboards/mockCharts/DashboardBanner";
import { Link } from "react-router-dom";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { FaRegCirclePlay } from "react-icons/fa6";
import { useRouteLoaderData } from "react-router-dom";
import { BsGridFill } from "react-icons/bs";
import { IoMdHand } from "react-icons/io";
import { div } from "framer-motion/client";

export default function Headline() {
  const user = useRouteLoaderData("root");
  return (
    <section className="mt-2 grid grid-cols-1 items-center gap-14 px-6 pb-16 lg:grid-cols-2">
      <div>
        {user && (
          <div
            className="flex items-center gap-1 bg-emerald-500/10
text-emerald-300
border border-emerald-500/20 py-1.5 p-3 rounded-lg w-fit brightness-105 mb-1"
          >
            <p>Welcome back, {user.first_name}!</p>
            <IoMdHand />
          </div>
        )}
        <h1 className="max-w-2xl font-accent text-5xl font-bold leading-tight text-text-primary-headings sm:text-6xl lg:text-7xl">
          Track. Train. Thrive. Your Fitness,{" "}
          <span className="text-cta-dark">All in One Place.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
          Build better habits with workout tracking, hydration goals, progress
          analytics, and clean dashboards designed to keep you consistent.
        </p>

        <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/4 p-5 ">
            <p className="text-2xl font-semibold text-accent-dark">12k+</p>
            <p className="mt-1 text-sm text-slate-400">Workouts logged</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
            <p className="text-2xl font-semibold text-blue-400">85%</p>
            <p className="mt-1 text-sm text-slate-400">Weekly consistency</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
            <p className="text-2xl font-semibold bg-gradient-to-t from-orange-400 to-amber-200 bg-clip-text text-transparent">
              7d
            </p>
            <p className="mt-1 text-sm text-slate-400">Average streak</p>
          </div>
        </div>

        {user ? (
          <Link to="/profile">
            <Button
              variant="outline"
              className="mt-8 flex items-center gap-2 cursor-pointer"
            >
              <BsGridFill size={18} /> Open Dashboard
            </Button>
          </Link>
        ) : (
          <div className="mt-8 flex flex-wrap gap-5">
            <Link to="/auth?mode=signup">
              <Button
                variant="primary"
                className="bg-blue-600 flex items-center gap-2 px-6 py-3 hover:bg-blue-600/85 hover:scale-[1.02] cursor-pointer"
              >
                <MdOutlineRocketLaunch size={20} className="text-white" />
                Start Tracking
              </Button>
            </Link>

            <Link to="/auth">
              <Button
                className="flex items-center gap-2 hover:scale-[1.02] cursor-pointer "
                variant="outline"
              >
                <FaRegCirclePlay className="" size={20} />
                Play Demo
              </Button>
            </Link>
          </div>
        )}
      </div>

      <DashboardBanner />
    </section>
  );
}
