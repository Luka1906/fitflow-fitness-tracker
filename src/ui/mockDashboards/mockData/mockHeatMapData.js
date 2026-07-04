export const heatmapData = Array.from({ length: 365 }, (_, i) => {
  const date = new Date("2026-01-01");
  const workoutChance = Math.random();
  date.setDate(date.getDate() + i);

  return {
    date: date.toISOString().split("T")[0],
    count: workoutChance < 0.65 ? Math.floor(Math.random() * 4) + 1 : 0,
  };
});

