import { useLoaderData } from "react-router-dom";

export default function LoginMessage() {
  const data = useLoaderData();

  const isFirstWorkout = data.workouts.length === 0;

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-3xl font-semibold tracking-tight text-white">
        {isFirstWorkout
          ? "Start building your first streak."
          : "Stay consistent. Track your progress."}
      </h2>

      <p className="max-w-lg text-sm leading-relaxed text-slate-400">
        {isFirstWorkout
          ? "Log workouts, track hydration, and monitor your fitness journey in one place."
          : "Keep up with your workouts, hydration, weight, and daily activity."}
      </p>
    </div>
  );
}
