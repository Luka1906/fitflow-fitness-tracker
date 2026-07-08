import { FiCalendar} from "react-icons/fi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";
import { createLocalDate } from "../../../../../utils/createLocalDate";
import { PiDotOutlineFill } from "react-icons/pi";
import { getWorkoutStats } from "../../../../../utils/getWorkoutStats";

export default function WorkoutLogCard({
  groupedLogs,
  weightLogs,
  handleDetailView,
}) {

  const workoutDays = Object.entries(groupedLogs);
  const userWeight = Number(weightLogs.logs.at(-1).weight);
  return (
    <>
      {workoutDays.map(([groupedDate, groupedLogs]) => {
        const {
          totalExercises,
          totalSets,
          totalVolume,
          firstExercise,
          formattedTime,
          unit,
        } = getWorkoutStats(groupedLogs, userWeight);
        const logDate = createLocalDate(groupedDate).toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          },
        );


        return (
          <div
           onClick={() => handleDetailView(groupedDate)} 
            key={groupedDate}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col gap-1 cursor-pointer relative transition hover:bg-white/10 group"
          >
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    {totalExercises > 1 ? (
                      <p className="text-[15px] sm:text-base font-semibold">
                        {firstExercise}
                        <span className=" text-[13px] sm:text-sm font-normal text-slate-300">
                          {" "}
                          + {totalExercises - 1} more
                        </span>
                      </p>
                    ) : (
                      <p className="font-semibold">{firstExercise}</p>
                    )}
                  </div>
     
                    <MdKeyboardArrowRight className="text-2xl text-slate-300 group-hover:text-white " />
      
                </div>

                <div className="flex items-center  text-xs sm:text-sm text-slate-400">
                  <div className="flex items-center gap-1">
                    <FiCalendar className=" " />
                    <p>{logDate}</p>
                  </div>

                  <PiDotOutlineFill className="text-lg" />
                  <div className="flex items-center gap-1">
                    <FaRegClock/>
                    <p>{formattedTime ? formattedTime : 0}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center text-sm text-slate-300">
                <p>
                {totalExercises === 1 ? "1 exercise" : `${totalExercises} exercises`}
                </p>
                <PiDotOutlineFill className="text-lg" />
                <p>
               {totalSets === 1 ? "1 set" : `${totalSets} sets`}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400">
              {totalVolume.toLocaleString()} {unit} total volume{" "}
            </p>
          </div>
        );
      })}
    </>
  );
}
