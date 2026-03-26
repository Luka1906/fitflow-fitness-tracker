import express from "express";
import { getUserProfile } from "../controllers/profileController.js";
import { authUser } from "../middleware/validate.js";

const router = express.Router();

router.get("/profile", authUser, getUserProfile);

export default router;
