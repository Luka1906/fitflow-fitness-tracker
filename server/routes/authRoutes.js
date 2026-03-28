import express from "express";
import multer from "multer";
import {
  loginUser,
  signupUser,
  logoutUser,
  onboardingUser
} from "../controllers/authController.js";
import { authUser, loginValidation, signUpValidation } from "../middleware/validate.js";
import { loginSchema, signupSchema } from "../util/validation.js";


const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();
router.post(
  "/signup",
  upload.single("avatar"),
  signUpValidation(signupSchema),
  signupUser,
);

router.post("/onboarding", authUser, onboardingUser);

router.get("/onboarding", authUser, (req,res) => {
  res.status(200).json({id:req.session.userId, onboarding_completed: true})
})

router.post("/login", loginValidation(loginSchema), loginUser);


router.post("/logout", logoutUser);

export default router;
