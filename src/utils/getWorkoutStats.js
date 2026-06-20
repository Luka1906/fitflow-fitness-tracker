export const getWorkoutStats = (logs, userWeight = 0) => {
  let totalExercises = 0;
  let totalSets = 0;
  let totalTime = 0;
  let totalVolume = 0;
  let firstExercise = null;
  let unit = "lbs";

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
        unit = set.unit;
      }
    }
  }
  const hours = Math.floor(totalTime / 60);
  const remainingMinutes = totalTime % 60;
  const formattedTime =
    hours > 0 ? `${hours}h ${String(remainingMinutes).padStart(2, "0")}m` : `${String(remainingMinutes).padStart(2,"0")}m`;

  return {
    totalExercises,
    totalSets,
    formattedTime,
    firstExercise,
    totalVolume,
    unit,
  };
};
