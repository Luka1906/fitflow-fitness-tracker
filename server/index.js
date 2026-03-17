import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

import "dotenv/config";

const app = express();
const port = 3000;

app.use(cors());

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes

app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log("Server running on port 3000");
});
