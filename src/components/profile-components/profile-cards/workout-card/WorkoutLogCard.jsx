import { FiCalendar, FiTrash2 } from "react-icons/fi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { createLocalDate } from "../../../../utils/createLocalDate";
import { PiDotOutlineFill } from "react-icons/pi";

const groupWorkoutLogs = (logs) => {
  const groupedLogs = {};
  logs.forEach((log) => {
    const key = log.logged_at.slice(0, 10);
    if (!groupedLogs[key]) groupedLogs[key] = [];
    groupedLogs[key].push(log);
  });

  return groupedLogs;
};

const getWorkoutStats = (logs, userWeight = 0) => {
  let totalExercises = 0;
  let totalSets = 0;
  let totalTime = 0;
  let totalVolume = 0;
  let firstExercise = null;

  for (const log of logs) {
    totalExercises += log.exercises.length;
    totalTime += log.workout_duration;

    for (const exercise of log.exercises) {
      totalSets += exercise.sets.length;
      if (!firstExercise) {
        firstExercise = exercise.workout_name;
      }

      for (const set of exercise.sets) {
        const weight = set.weight || userWeight;
        totalVolume += weight * set.reps;
      }
    }
  }
  const hours = Math.floor(totalTime / 60);
  const remainingMinutes = totalTime % 60;
  const formattedTime =
    hours > 0 ? `${hours}h ${remainingMinutes}m` : `${remainingMinutes}m`;

  return {
    totalExercises,
    totalSets,
    totalTime,
    formattedTime,
    firstExercise,
  };
};

export default function WorkoutLogCard({ workouts, weightLogs }) {
  const groupedWorkouts = groupWorkoutLogs(workouts);
  const latestWorkous = Object.entries(groupedWorkouts).reverse();
  const userWeight = Number(weightLogs.logs.at(-1).weight);
  console.log(userWeight);
  console.log(Object.entries(groupedWorkouts));

  return (
    <>
      {latestWorkous.map(([groupedDate, groupedLogs]) => {
        const {
          totalExercises,
          totalSets,
          totalVolume,
          firstExercise,
          formattedTime,
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
            key={groupedDate}
            className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col gap-1"
          >
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    {totalExercises > 1 ? (
                      <p className="font-semibold">
                        {firstExercise}
                        <span className="text-sm font-normal text-slate-300">
                          {" "}
                          + {totalExercises} more
                        </span>
                      </p>
                    ) : (
                      <p className="font-semibold">{firstExercise}</p>
                    )}
                  </div>
                  <button className="cursor-pointer text-2xl text-slate-300 ">
                    <MdKeyboardArrowRight />
                  </button>
                </div>

                <div className="flex items-center text-xs text-slate-400">
                  <FiCalendar className="text-xs text-[0.8rem] mr-1.5" />
                  <p>{logDate}</p>
                  <PiDotOutlineFill className="text-lg" />
                  <p>{formattedTime ? formattedTime : 0}</p>
                </div>
              </div>

              <div className="flex items-center text-xs text-slate-300">
                <p>
                  {totalExercises > 0
                    ? totalExercises + " exercises"
                    : totalExercises + " exercise"}
                </p>
                <PiDotOutlineFill className="text-lg" />
                <p>
                  {totalSets > 0 ? totalSets + " sets" : totalSets + " set"}
                </p>
              </div>
            </div>
            <button className="flex justify-end mr-1 text-lg">
     <FiTrash2 className="text-red-400"/>
            </button>
       
          </div>
        );
      })}
    </>
  );
}
