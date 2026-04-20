import uploadImage from "../util/cloudinary.js";
import bcrypt from "bcrypt";
import {
  addUser,
  existingUser,
  addUserGoals,
} from "../models/authModel.js";
import { createUserProfile, updateUserInfo } from "../models/profileModel.js";

export const signupUser = async (req, res) => {
  const { firstName, lastName, location, email, password } = req.body;
  console.log(req.body);

  try {
    let imageUrL = null;

    if (req.file) {
      const image = await uploadImage(req.file.buffer);
      imageUrL = image;
    }

    const userExist = await existingUser(email);

    if (userExist) {
      return res
        .status(400)
        .json({ error: "User already exists. Please login!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await addUser(
      firstName,
      lastName,
      location,
      imageUrL && imageUrL.secure_url,
      email,
      hashedPassword,
    );

    req.session.userId = user.id;

    return res.status(201).json({
      message: "User created succesfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const onboardingUser = async (req, res) => {
  const { selectedFitnessGoals = [], selectedWaterGoal } = req.body;
  console.log("selectedFitnessGoals:", selectedFitnessGoals);

  try {
    if (!Array.isArray(selectedFitnessGoals)) {
      return res.status(400).json({ error: "Invalid data" });
    }
    if (selectedFitnessGoals.length > 3) {
      return res.status(400).json({ error: "Max 3 goals allowed" });
    }
    if (selectedFitnessGoals.length === 0) {
      await updateUserInfo(req.session.userId, {
        onboarding_completed: true,
      });
      return res.status(200).json({
        message: "No goals selected, onboarding complete",
      });
    }

    for (const goalId of selectedFitnessGoals) {
      await addUserGoals(req.session.userId, goalId);
    }

    if (selectedWaterGoal) {
      await createUserProfile(req.session.userId, Number(selectedWaterGoal));
    }

    await updateUserInfo(req.session.userId, {
      onboarding_completed: true,
    });

    return res.status(200).json({
      message: "User onboarded successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await existingUser(email);

    if (!user) {
      return res
        .status(400)
        .json({ error: "Couldn't find user, please sign up" });
    }

    const hashedPassword = user.password_hash;
    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials. Try again!" });
    }

    req.session.userId = user.id;

    return res
      .status(200)
      .json({ message: "Logged in successfully", user: req.session.userId });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    await new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    res.clearCookie("connect.sid");

    return res.status(200).json({ message: "Loget out" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Logout failed" });
  }
};


