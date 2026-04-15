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
      user_goals.goal_id,
      goal_options.name,
      goal_options.key
    FROM user_goals
    JOIN goal_options 
      ON user_goals.goal_id = goal_options.id
    WHERE user_goals.user_id = $1
    `,
    [id]
  );

  return result.rows;
};

// CREATE USER PROFILE

export const createUserProfile = async (userId, waterGoal) => {
  const result = await db.query(
    "INSERT INTO user_profile (user_id, water_goal) VALUES ($1, $2)",
    [userId, waterGoal],
  );
  if (result.rows.length === 0) {
    return null;
  }
  return result.rows[0]
};


// GET USER WATER GOAL

export const getWaterGoal = async (userId) => {
  const result = await db.query("SELECT * FROM user_profile WHERE user_id=$1", [userId]);
  return result.rows[0]
}
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
  await db.query(
    "INSERT INTO weight_logs (user_id, weight, unit, logged_at ) VALUES ($1, $2, $3, $4)",
    [id, weight, unit, date],
  );
};

// ADD USER WATER

export const addWaterLogger = async (id, amount, date) => {
  await db.query(
    "INSERT INTO water_logs (user_id, amount, logged_at) VALUES ($1, $2, $3)",
    [id, amount, date],
  );
};

// ADD USER WORKOUTS

export const addWorkoutLogger = async ({ userId, workouts, note, date }) => {
  try {
    await db.query("BEGIN");

    // Insert workout_log

    const workoutLogResult = await db.query(
      "INSERT INTO workout_logs (user_id, note, logged_at) VALUES ($1, $2, $3) RETURNING id",
      [userId, note, date],
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
          "INSERT INTO workout_sets (exercise_id, set_order, weight, reps) VALUES ($1, $2, $3, $4)",
          [exerciseId, set.set_order, set.weight, set.reps],
        );
      }
    }

    await db.query("COMMIT");
  } catch (error) {
    await db.query("ROLLBACK");
    throw error;
  }
};
