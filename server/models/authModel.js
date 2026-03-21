import { db } from "../config/db.js";

export const addUser = async (
  firstName,
  lastName,
  location,
  avatar,
  email,
  password,
) => {
  const result = await db.query(
    "INSERT INTO users (first_name, last_name, location, avatar_url, email, password_hash) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [firstName, lastName, location, avatar, email, password],
  );

  return result.rows[0];
};

export const existingUser = async (email) => {
  const result = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

export const getGoalIds = async (goalName) => {
  const result = await db.query("SELECT id from goal_options WHERE key = ANY($1::text[])", [
    goalName,
  ]);
  return result.rows.map((row) => row.id);
};

export const addUserGoals = async (userId, goalId) => {
  const result = await db.query(
    `INSERT INTO user_goals (user_id, goal_id)
     VALUES ($1, $2)
     ON CONFLICT (user_id, goal_id) DO NOTHING
     RETURNING *`,
    [userId, goalId]
  );

  if (result.rows.length === 0) {
    return null; // already existed
  }

  console.log(result.rows[0])

  return result.rows[0];
};
