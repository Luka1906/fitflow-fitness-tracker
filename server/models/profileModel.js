import { db } from "../config/db.js";

export const getUserById = async (id) => {
  const result = await db.query(
    "SELECT id, first_name, last_name, location, email, avatar_url, onboarding_completed, created_at FROM users WHERE id = $1",
    [id],
  );

  return result.rows[0];
};

export const getUserGoals = async (id) => {
  const result = await db.query(
    "SELECT * FROM user_goals JOIN goal_options ON user_goals.goal_id = goal_options.id WHERE user_goals.user_id = $1 ",
    [id],
  );
  return result.rows;
};

export const updateUserInfo = async (id, updates) => {
  const allowedFields = ["first_name", "last_name", "location", "onboarding_completed"];
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
