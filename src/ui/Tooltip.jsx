export default function Tooltip({ tooltip }) {
  const workoutString = tooltip?.activity > 1 ? "workouts" : "workout";
  const formattedDate = new Date(tooltip?.day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <div
      style={{ left: tooltip.x + 10, top: tooltip.y - 40 }}
     className="fixed z-50 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 shadow-lg"
    >
      {tooltip.activity > 0 ? (
        <p>{`${tooltip?.activity} ${workoutString} on ${formattedDate} `}</p>
      ) : (
        <p>{`No workout on ${formattedDate}`}</p>
      )}
    </div>
  );
}
