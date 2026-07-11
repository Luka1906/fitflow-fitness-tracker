import Button from "../../ui/Button";
import DashboardBanner from "../../ui/mockDashboards/mockCharts/DashboardBanner";
import { Form, Link } from "react-router-dom";
import { MdOutlineRocketLaunch } from "react-icons/md";
import { FaRegCirclePlay } from "react-icons/fa6";
import { useRouteLoaderData } from "react-router-dom";
import { BsGridFill } from "react-icons/bs";
import { IoMdHand } from "react-icons/io";

export default function Headline() {
  const user = useRouteLoaderData("root");
  return (
    <section className="mt-2 grid grid-cols-1 items-center gap-10 px-4 pb-12 sm:px-6 sm:pb-16 lg:grid-cols-2 lg:gap-14">
      <div>
        {user && (
          <div className="mb-3 flex w-fit items-center gap-1 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-300 brightness-105 sm:text-base">
            <p>Welcome back, {user.first_name}!</p>
            <IoMdHand />
          </div>
        )}

        <h1 className="max-w-2xl font-accent text-4xl font-bold leading-tight text-text-primary-headings sm:text-5xl lg:text-6xl xl:text-7xl">
          Track. Train. Thrive. Your Fitness,{" "}
          <span className="text-cta-dark">All in One Place.</span>
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:mt-6 sm:text-lg">
          Build better habits with workout tracking, hydration goals, progress
          analytics, and clean dashboards designed to keep you consistent.
        </p>

        <div className="mt-8 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3 lg:mt-10">
          <div className="rounded-2xl border border-white/10 bg-white/4 p-4 sm:p-5">
            <p className="text-xl font-semibold text-accent-dark sm:text-2xl">
              12k+
            </p>
            <p className="mt-1 text-sm text-slate-400">Workouts logged</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/4 p-4 sm:p-5">
            <p className="text-xl font-semibold text-blue-400 sm:text-2xl">
              85%
            </p>
            <p className="mt-1 text-sm text-slate-400">Weekly consistency</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/4 p-4 sm:p-5">
            <p className="bg-gradient-to-t from-orange-400 to-amber-200 bg-clip-text text-xl font-semibold text-transparent sm:text-2xl">
              7d
            </p>
            <p className="mt-1 text-sm text-slate-400">Average streak</p>
          </div>
        </div>

        {user ? (
          <Link to="/profile">
            <Button
              variant="outline"
              className="mt-8 flex w-full items-center justify-center gap-2 cursor-pointer sm:w-fit"
            >
              <BsGridFill size={18} /> Open Dashboard
            </Button>
          </Link>
        ) : (
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-5">
            <Link to="/auth?mode=signup" className="w-full sm:w-auto">
              <Button
                variant="primary"
                className="flex w-full items-center justify-center gap-2 bg-blue-600 px-6 py-3 hover:scale-[1.02] hover:bg-blue-600/85 cursor-pointer sm:w-auto"
              >
                <MdOutlineRocketLaunch size={20} className="text-white" />
                Start Tracking
              </Button>
            </Link>

            <Form method="POST" action="/auth?mode=login" className="w-full sm:w-auto">
              <input type="hidden" name="email" value="demo@fitflow.com"/>
              <input type="hidden" name="password" value="FitFlowDemo1!"/>

              <Button
                className="flex w-full items-center justify-center gap-2 hover:scale-[1.02] cursor-pointer sm:w-auto"
                variant="outline"
              >
                <FaRegCirclePlay size={20} />
                Play Demo
              </Button>
            </Form>
          </div>
        )}
      </div>

      <div className="w-full overflow-hidden">
        <DashboardBanner />
      </div>
    </section>
  );
}
