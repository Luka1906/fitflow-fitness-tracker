import { dailyWaterData } from "../mockData/mockDashbordData";
import { FiDroplet } from "react-icons/fi";

const radius = 54;
const circumference = 2 * Math.PI * radius;

const percentage = Math.round((dailyWaterData.consumed / dailyWaterData.goal) * 100);

const remaining = dailyWaterData.goal - dailyWaterData.consumed;

const progressOffset = circumference - (percentage / 100) * circumference;

export default function WaterBannerRing() {
  return (
    <div className="flex gap-5">
      <div className="relative">
        <svg className="-rotate-90 w-40 h-40" viewBox="0 0 120 120 ">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="10"
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            className="text-sky-400/60 "
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
          />
        </svg>
        <div className="flex flex-col items-center justify-center w-full absolute top-1/2 -translate-y-1/2 gap-1.5  ">
          <div className="bg-white/10 h-9 w-9 flex items-center justify-center rounded-full ">
            <FiDroplet className="text-sky-400/60" />
          </div>
          <div className="flex flex-col items-center">
            <p className="text-xl font-semibold text-white">{percentage}%</p>
            <p className="text-xs text-slate-400">completed</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center justify-center">
      <p className="text-xl text-white font-semibold">{dailyWaterData.consumed} {dailyWaterData.unit}</p>
      <p className="text-xs text-slate-400">of {dailyWaterData.goal} {dailyWaterData.unit} daily goal</p>
        </div>
        <div className="bg-bg-dark p-4 space-y-2 rounded-xl">
            <p className="text-xs tracking-wide uppercase text-slate-400">Remaining</p>
            <p className="text text-white font-semibold ">{remaining} {dailyWaterData.unit} left</p>
        </div>
      </div>
    </div>
  );
}
