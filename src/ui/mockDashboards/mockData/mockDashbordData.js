// get last seven dates helper function

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
  unit: "lbs"
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

export const todaysWorkouts = [
  {
    exercises: [
      {
        name: "Bench Press",
        sets: 3,
      },
      {
        name: "Shoulder Press",
        sets: 2,
      },
      {
        name: "Deadlift",
        sets: 3,
      },
       {
        name: "Biceps Curl",
        sets: 3,
      },
    ],
  },
];

// Weekly Workouts Mock Data

export const weeklyWorkouts = {
  label: getLastSevenDates().map((date) =>
    date.toLocaleDateString("en-US", {
      day: "numeric",
      weekday: "short",
    }),
  ),
  data: [9, 6, 12, 0, 0, 15, 0],
};
