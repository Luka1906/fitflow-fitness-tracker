import fs from "fs";
import path from "path";
import { db } from "../config/db.js";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const initializeDatabase = async () => {
  try {
    // Check if users table exists
    const result = await db.query(
      "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'users')"
    );

    if (result.rows[0].exists) {
      console.log("✓ Database already initialized");
      return;
    }

    console.log("Initializing database...");

    // Read the init.sql file
    const sqlFile = path.join(__dirname, "init.sql");
    const sql = fs.readFileSync(sqlFile, "utf8");

    // Split by semicolon and execute each statement
    const statements = sql
      .split(";")
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0);

    for (const statement of statements) {
      try {
        await db.query(statement);
      } catch (err) {
        // Ignore errors for CREATE TABLE IF NOT EXISTS type errors
        // but log them for debugging
        if (!err.message.includes("already exists")) {
          console.error("Error executing statement:", err.message);
        }
      }
    }

    console.log("✓ Database initialized successfully");
  } catch (error) {
    console.error("Database initialization failed:", error);
    // Don't exit, let the app start even if DB init fails
  }
};

