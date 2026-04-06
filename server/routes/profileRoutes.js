import express from "express";
import {
    editUserAvatar,
  editUserProfile,
  getUserProfile,
} from "../controllers/profileController.js";
import { authUser } from "../middleware/validate.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.get("/profile", authUser, getUserProfile);
router.patch("/profile", authUser, editUserProfile);
router.patch("/profile/avatar", authUser, upload.single("avatar"), editUserAvatar);

export default router;
