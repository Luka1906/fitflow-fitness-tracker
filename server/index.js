import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js"
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { db } from "./config/db.js";


import "dotenv/config";

const app = express();
const port = 3000;

const PgStore = connectPgSimple(session);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    store: new PgStore({
      pool: db,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

//Routes

app.use("/auth", authRoutes);
app.use("/users", profileRoutes )

app.listen(port, () => {
  console.log("Server running on port 3000");
});
