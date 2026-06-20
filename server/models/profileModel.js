import { db } from "../config/db.js";

// GET USER BY ID

export const getUserById = async (id) => {
  const result = await db.query(
    "SELECT id, first_name, last_name, location, email, avatar_url, onboarding_completed, created_at FROM users WHERE id = $1",
    [id],
  );

  return result.rows[0];
};

// GET ALL GOALS

export const getAllGoals = async () => {
  const result = await db.query(
    "SELECT id, name AS label, key AS value FROM goal_options ",
  );
  return result.rows;
};

// GET USER GOALS

export const getUserGoals = async (id) => {
  const result = await db.query(
    `
  SELECT 
  user_goals.goal_id AS id,
  goal_options.name AS label,
  goal_options.key AS value
FROM user_goals
JOIN goal_options 
ON user_goals.goal_id = goal_options.id
WHERE user_goals.user_id = $1
    `,
    [id],
  );

  return result.rows;
};

// CREATE USER PROFILE

export const createUserProfile = async (userId, profileData) => {
  const { waterGoal, weightGoal, unit } = profileData;
  const result = await db.query(
    "INSERT INTO user_profile (user_id, water_goal, weight_goal, weight_unit) VALUES ($1, $2, $3, $4)",
    [userId, waterGoal, weightGoal, unit],
  );
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0];
};

// UPDATE USER INFO

export const updateUserInfo = async (id, updates) => {
  const allowedFields = [
    "first_name",
    "last_name",
    "location",
    "onboarding_completed",
  ];
  const fields = [];
  const values = [];

  if (!id) {
    throw new Error("User ID is required");
  }

  const chosenFields = allowedFields.filter((field) => {
    return updates[field] !== undefined;
  });

  chosenFields.forEach((field, index) => {
    fields.push(`${field}=$${index + 1}`);
    values.push(
      typeof updates[field] === "string"
        ? updates[field].trim()
        : updates[field],
    );
  });
  values.push(id);

  if (fields.length === 0) {
    throw new Error("No fields to update");
  }

  const result = await db.query(
    `UPDATE users SET ${fields.join(",")} WHERE id = $${fields.length + 1} RETURNING * `,
    values,
  );

  return result.rows[0];
};

// UPDATE USER GOALS

export const updateUserGoals = async (id, goals) => {
  const client = await db.connect();
  try {
    await client.query("BEGIN");

    // 1. delete old goals
    await client.query("DELETE FROM user_goals WHERE user_id = $1", [id]);

    //  2. insert new goals

    for (const goalId of goals) {
      await client.query(
        "INSERT INTO user_goals(user_id, goal_id) VALUES ($1,$2)",
        [id, goalId],
      );
    }

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

//UPDATE USER IMAGE

export const updateUserImage = async (image, id) => {
  const result = await db.query(
    "UPDATE users SET avatar_url = $1 WHERE id = $2",
    [image, id],
  );

  return result.rows[0];
};

//ADD USER WEIGHT

export const addWeightLogger = async (id, weight, unit, date) => {
  const result = await db.query(
    "INSERT INTO weight_logs (user_id, weight, unit, logged_at ) VALUES ($1, $2, $3, $4) RETURNING *",
    [id, weight, unit, date],
  );

  return result.rows;
};

// ADD USER WATER

export const addWaterLogger = async (id, amount, date) => {
  await db.query(
    "INSERT INTO water_logs (user_id, amount, logged_at) VALUES ($1, $2, $3)",
    [id, amount, date],
  );
};

// ADD USER WORKOUTS

export const addWorkoutLogger = async ({
  userId,
  workouts,
  note,
  date,
  workoutDuration,
}) => {
  try {
    await db.query("BEGIN");

    // Insert workout_log

    const workoutLogResult = await db.query(
      "INSERT INTO workout_logs (user_id, note, logged_at, workout_duration) VALUES ($1, $2, $3, $4) RETURNING id",
      [userId, note, date, workoutDuration],
    );

    // Insert workout_exercises

    const workoutLogId = workoutLogResult.rows[0].id;
    let orderIndex = 1;

    for (const workout of workouts) {
      const workoutExercisesResult = await db.query(
        "INSERT INTO workout_exercises (workout_log_id, workout_name, order_index) VALUES ($1, $2, $3) RETURNING id",
        [workoutLogId, workout.name, orderIndex],
      );
      orderIndex++;

      const exerciseId = workoutExercisesResult.rows[0].id;

      for (const set of workout.sets) {
        await db.query(
          "INSERT INTO workout_sets (exercise_id, set_order, weight, reps, unit) VALUES ($1, $2, $3, $4, $5)",
          [exerciseId, set.set_order, set.weight, set.reps, set.unit],
        );
      }
    }

    await db.query("COMMIT");
  } catch (error) {
    await db.query("ROLLBACK");
    throw error;
  }
};

// GET WEIGHT LOGS

export const getWeightLogs = async (userId) => {
  const result = await db.query(
    "SELECT * FROM weight_logs WHERE user_id = $1 ORDER BY logged_at DESC ",
    [userId],
  );

  return result.rows;
};

// GET WEIGHT GOAL

export const getWeightGoal = async (userId) => {
  const result = await db.query(
    "SELECT weight_goal, weight_unit FROM user_profile WHERE user_id = $1",
    [userId],
  );
  if (result.rows.length === 0) return null;

  const { weight_goal, weight_unit } = result.rows[0];

  if (weight_goal == null || weight_unit == null) return null;

  return {
    weightGoal: weight_goal,
    unit: weight_unit,
  };
};

// UPDATE WEIGHT GOAL

export const updateWeightGoal = async (weight, unit, id) => {
  const result = await db.query(
    "UPDATE user_profile SET weight_goal= $1, weight_unit= $2 WHERE user_id= $3",
    [weight, unit, id],
  );
};

// DELETE WEIGHT LOG

export const deleteWeightLog = async (logId, userId) => {
  const result = await db.query(
    "DELETE FROM weight_logs WHERE id=$1 AND user_id=$2 ",
    [logId, userId],
  );
  return result.rows[0];
};

// GET TODAY WATER LOGS

export const getTodayWaterLogs = async (userId) => {
  const result = await db.query(
    "SELECT * FROM water_logs WHERE user_id = $1 AND logged_at = CURRENT_DATE ORDER BY logged_at DESC",
    [userId],
  );

  return result.rows;
};

// GET WATER LOGS

export const getWaterLogs = async (userId) => {
  const result = await db.query(
    "SELECT * FROM water_logs WHERE user_id = $1 ORDER BY logged_at DESC ",
    [userId],
  );

  return result.rows;
};

// GET USER WATER GOAL

export const getWaterGoal = async (userId) => {
  const result = await db.query(
    "SELECT water_goal FROM user_profile WHERE user_id=$1",
    [userId],
  );
  return result.rows[0]?.water_goal || null;
};

// EDIT WATER GOAL

export const updateWaterGoal = async (waterGoal, id) => {
  const result = await db.query(
    "UPDATE user_profile SET water_goal = $1 WHERE user_id = $2",
    [waterGoal, id],
  );
};

// DELETTE WATER LOG

export const deleteWaterLog = async (logId, userId) => {
  const result = await db.query(
    "DELETE FROM water_logs WHERE id = $1 AND user_id = $2 ",
    [logId, userId],
  );
  return result.rows[0];
};

// GET WORKOUT LOG

export const getWorkoutLog = async (userId) => {
  const result = await db.query(
    `
      SELECT
        wl.id AS workout_id,
        wl.note,
        wl.logged_at,
        wl.workout_duration,

        we.id AS exercise_id,
        we.workout_name,
        we.order_index,

        ws.id AS set_id,
        ws.set_order,
        ws.weight,
        ws.reps,
        ws.unit

      FROM workout_logs wl

      JOIN workout_exercises we
        ON wl.id = we.workout_log_id

      JOIN workout_sets ws
        ON we.id = ws.exercise_id

      WHERE wl.user_id = $1

     ORDER BY
  wl.logged_at DESC,
  wl.id DESC,
  we.order_index,
  ws.set_order
    `,
    [userId],
  );

  return result.rows;
};
