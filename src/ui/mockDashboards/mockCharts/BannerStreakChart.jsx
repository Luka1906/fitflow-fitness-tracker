import { MdLocalFireDepartment } from "react-icons/md";
import { weeklyStreakData } from "../mockData/mockDashbordData";

export default function BannerStreakChart() {
  const streak = weeklyStreakData.filter((day) => day.checked).length;

  return (
    <div className="  flex flex-col items-center justify-center h-full ">
        <div className="px-6 py-5 bg-white/5  border border-white/10 rounded-xl">
  <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-400/10">
            <MdLocalFireDepartment className="text-lg text-white/70" />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              {streak} Day Streak
            </p>
          
          </div>
        </div>
      </div>

      <div className="flex items-end gap-2.5">
        {weeklyStreakData.map((data) => (
          <div className="flex flex-col items-center gap-1.5" key={data.day}>
            <div
              className={`h-11 w-2 rounded-full ${
                data.checked
                  ? "bg-gradient-to-t from-orange-500 to-amber-300"
                  : "bg-white/6"
              }`}
            />

            <p className="text-[11px] text-slate-500">{data.day}</p>
          </div>
        ))}
      </div>
    </div>
        </div>
    
  );
}