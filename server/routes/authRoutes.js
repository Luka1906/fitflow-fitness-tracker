import express from "express";
import multer from "multer";
import { loginAuth, signupAuth } from "../controllers/authController.js";
import signUpValidation from "../middleware/validate.js";
import { signupSchema } from "../util/validation.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post("/login", loginAuth);

router.post(
  "/signup",
  upload.single("avatar"),
  signUpValidation(signupSchema),
  signupAuth,
);

export default router;
