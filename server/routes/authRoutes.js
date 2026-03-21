import express from "express";
import multer from "multer";
import { loginAuth, signupAuth } from "../controllers/authController.js";
import { loginValidation, signUpValidation } from "../middleware/validate.js";
import { loginSchema, signupSchema } from "../util/validation.js";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post("/login", loginValidation(loginSchema), loginAuth);

router.post(
  "/signup",
  upload.single("avatar"),
  signUpValidation(signupSchema),
  signupAuth,
);

export default router;
