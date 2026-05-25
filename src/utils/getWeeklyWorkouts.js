import { createLocalDate } from "./createLocalDate";

export const getWeeklyWorkouts = (workouts) => {
  const currentDate = new Date();
  const weekAgoDate = new Date(currentDate);
  weekAgoDate.setDate(weekAgoDate.getDate() - 7);
  weekAgoDate.setHours(0, 0, 0, 0);

  const filteredWorkouts = workouts.filter((workout) => {
    const workoutDate = createLocalDate(workout.logged_at)
    return workoutDate >= weekAgoDate;
  });
  return filteredWorkouts;
};