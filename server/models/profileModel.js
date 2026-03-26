import { db } from "../config/db.js";

export const getUserById = async (id) => {
  const result = await db.query(
    "SELECT id, first_name, last_name, location, avatar_url FROM users WHERE id = $1",
    [id],
  );

  return result.rows[0];
};

export const getUserGoals = async (id) => {
  const result = await db.query(
    "SELECT goal_options.id, goal_options.name FROM user_goals JOIN goal_options ON user_goals.goal_id = goal_options.id WHERE user_goals.user_id = $1 ",
    [id],
  );
  return result.rows
};
