import express from "express";
import {
  addUserWater,
  addUserWeight,
  addUserWorkout,
  deleteUserWaterLog,
  deleteUserWeightLog,
  deleteUserWorkoutLog,
  editUserAvatar,
  editUserProfile,
  editWaterGoal,
  editWeightGoal,
  getUserProfile,
  getUserWaterLogs,
} from "../controllers/profileController.js";
import { authUser } from "../middleware/validate.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.get("/profile", authUser, getUserProfile);
router.patch("/profile", authUser, editUserProfile);
router.patch(
  "/profile/avatar",
  authUser,
  upload.single("avatar"),
  editUserAvatar,
);
router.patch("/profile/water-goal", authUser, editWaterGoal);
router.patch("/profile/weight-goal", authUser, editWeightGoal);
router.get("/profile/water-logs", authUser, getUserWaterLogs);
router.delete("/profile/water-logs/:id", authUser, deleteUserWaterLog);
router.delete("/profile/weight-logs/:id", authUser, deleteUserWeightLog);
router.delete("/profile/workout-logs/:id", authUser, deleteUserWorkoutLog);
router.post("/profile/add-weight", authUser, addUserWeight);
router.post("/profile/add-water", authUser, addUserWater);
router.post("/profile/add-workout", authUser, addUserWorkout);

export default router;
