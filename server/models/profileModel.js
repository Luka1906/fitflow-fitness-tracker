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
    "SELECT * FROM user_goals JOIN goal_options ON user_goals.goal_id = goal_options.id WHERE user_goals.user_id = $1 ",
    [id],
  );
  return result.rows;
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
