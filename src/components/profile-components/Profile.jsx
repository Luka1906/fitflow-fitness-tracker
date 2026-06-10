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
    <div className="space-y-16 p-6">
      <ProfileInfo
        user={user}
        goals={goals}
        water={water}
        workouts={workouts}
      />
      <StreakStats workouts={workouts} />

      <div className="flex flex-col gap-10 border border-white/10 rounded-2xl p-10 bg-slate-800/10">
        <LoginMessage />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch  min-h-full">
          <WaterCard />
          <WeightCard />
          <WorkoutCard />
        </div>
      </div>
      <TrendCharts />
    </div>
  );
}
