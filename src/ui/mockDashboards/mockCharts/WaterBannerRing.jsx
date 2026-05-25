import { FiDroplet } from "react-icons/fi";
import { dailyWaterData } from "../mockData/mockDashbordData";

const radius = 46;
const circumference = 2 * Math.PI * radius;

export default function WaterBannerRing() {
  const percentage = Math.round(
    (dailyWaterData.consumed / dailyWaterData.goal) * 100,
  );

  const progressOffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="relative">
        <svg className="-rotate-90 h-30 w-30" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="9"
          />

          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="9"
            strokeLinecap="round"
            className="text-sky-400"
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <FiDroplet className="mb-1 text-lg text-sky-400" />
          <p className="text-xl font-semibold text-white">{percentage}%</p>
        </div>
      </div>

      <div className="text-center">
        <p className="text-sm font-semibold text-white">Water Goal</p>
        <p className="text-xs text-slate-400">
          {dailyWaterData.consumed}/{dailyWaterData.goal} {dailyWaterData.unit}
        </p>
      </div>
    </div>
  );
}