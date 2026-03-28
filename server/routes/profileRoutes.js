import express from "express";
import { editUserProfile, getUserProfile } from "../controllers/profileController.js";
import { authUser } from "../middleware/validate.js";

const router = express.Router();

router.get("/profile", authUser, getUserProfile);
router.patch("/profile/edit", authUser, editUserProfile )

export default router;
