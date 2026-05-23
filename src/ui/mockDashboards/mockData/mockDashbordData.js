const getLastSevenDates = () => {
  const lastSevenDays = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    lastSevenDays.push(date);
  }

  return lastSevenDays;
};

// Weekly Weight Mock Data
export const weeklyWeightData = {
  labels: getLastSevenDates().map((date) =>
    date.toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
    }),
  ),
  data: [181, 180.6, 180, 179.5, 179.4, 179, 178.6],
};

// Daily Water Consumed Mock Data

export const dailyWaterData = {
  consumed: 1650,
  goal: 3000,
  unit: "ml",
};

// Weekly Streak Mock Data

export const weeklyStreakData = [
  {
    day: "Mon",
    checked: true,
  },
  {
    day: "Tue",
    checked: true,
  },
  {
    day: "Wed",
    checked: true,
  },
  {
    day: "Thu",
    checked: true,
  },
  {
    day: "Fri",
    checked: true,
  },
  {
    day: "Sat",
    checked: false,
  },
  {
    day: "Sun",
    checked: false,
  },
];

// Today Workout Mock Data

const workouts = [
  {
    exercise: {
      name: "Bench Press",
      sets: 3,
    },
    exercise: {
      name: "Shoulder Press",
      sets: 2,
    },
    exercise: {
      name: "Deadlift",
      sets: 3,
    },
  },
];
