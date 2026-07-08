import ProfileInfo from "./ProfileInfo";
import { StreakStats } from "./StreakStats";
import LoginMessage from "./LoginMessage";
import WeightCard from "./profile-cards/weight-card/WeightCard";
import WaterCard from "./profile-cards/water-card/WaterCard";
import { WorkoutCard } from "./profile-cards/workout-card/WorkoutCard";
import { useLoaderData } from "react-router-dom";
import TrendCharts from "./profile-charts/TrendCharts";

export default function Profile() {
  const { user, goals, water, workouts } = useLoaderData();

  return (
    <div className="space-y-10 px-4 py-6 sm:space-y-16 sm:px-6">
      <ProfileInfo
        user={user}
        goals={goals}
        water={water}
        workouts={workouts}
      />

      <StreakStats workouts={workouts} />

      <div className="flex flex-col gap-6 rounded-2xl border border-white/10 bg-slate-800/10 p-4 sm:gap-10 sm:p-6 lg:p-10">
        <LoginMessage />

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
          <WaterCard />
          <WeightCard />
          <WorkoutCard />
        </div>
      </div>

      <TrendCharts />
    </div>
  );
}