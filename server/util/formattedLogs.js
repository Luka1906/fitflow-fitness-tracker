export default function formattedLogs (workoutLogs) {

    const groupedWorkouts = [];
    for (const log of workoutLogs) {
      let workout = groupedWorkouts.find(
        (workout => workout.id === log.workout_id),
      );
      if (!workout) {
        workout = {
          id: log.workout_id,
          note: log.note,
          logged_at: log.logged_at,
          exercises: [],
        };
        groupedWorkouts.push(workout);
      }

      let exercise = workout.exercises.find(
        (exercise) => exercise.id === log.exercise_id,
      );
      if (!exercise) {
        exercise = {
          id: log.exercise_id,
          workout_name: log.workout_name,
          order_index: log.order_index,
          sets: [],
        };
        workout.exercises.push(exercise);
      }
      exercise.sets.push({
        id: log.set_id,
        set_order: log.set_order,
        weight: log.weight,
        reps: log.reps,
      });
    };
    return groupedWorkouts
}

