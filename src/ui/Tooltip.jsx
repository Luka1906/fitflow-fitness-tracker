export default function Tooltip({ tooltip }) {
  const workoutString = tooltip?.activity === 1 ? "workout" : "workouts";

  const formattedDate = new Date(tooltip?.day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  const tooltipWidth = 220;
  const screenPadding = 12;

  const desiredLeft = tooltip.x - tooltipWidth / 2;

  const left = Math.min(
    Math.max(desiredLeft, screenPadding),
    window.innerWidth - tooltipWidth - screenPadding,
  );

  const top =
    tooltip.y < 70
      ? tooltip.y + 20
      : tooltip.y - 45;

  return (
    <div
      style={{
        left,
        top
      }}
      className="pointer-events-none fixed z-50 whitespace-nowrap rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-100 shadow-lg xl:text-sm"
    >
      {tooltip.activity > 0 ? (
        <p>
          {tooltip.activity} {workoutString} on {formattedDate}
        </p>
      ) : (
        <p>No workout on {formattedDate}</p>
      )}
    </div>
  );
}