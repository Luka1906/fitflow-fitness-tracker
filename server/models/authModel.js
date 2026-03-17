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
