import { loginSchema } from "../util/validation.js";
import uploadImage from "../util/cloudinary.js";
import bcrypt from "bcrypt";
import {
  addUser,
  existingUser,
  getGoalIds,
  addUserGoals,
} from "../models/authModel.js";

export const loginAuth = async (req, res) => {
  const { email, password } = req.body;
  console.log(email,password)
  try {
    const user = await existingUser(email);

    if (!user) {
      return res
        .status(400)
        .json({ error: "Couldn't find user, please sign up" });
    }

    const hashedPassword = user.password_hash;
    const isMatched = await bcrypt.compare(password, hashedPassword);

    if (!isMatched) {
      return res.status(401).json({ error: "Invalid credentials. Try again!" });
    }
    console.log("true")

    req.session.user = {
      id: user.id,
      email: user.email,
    };

    return res.status(200).json({message: "Logged in successfully", user: req.session.user})

  } catch (error) {
    return res.status(500).json({message: "Server error"})
  }
};

export const signupAuth = async (req, res) => {
  const { firstName, lastName, location, email, password, fitnessGoals } =
    req.body;
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

    const goalIds = await getGoalIds(fitnessGoals);
    for (const goalId of goalIds) {
      await addUserGoals(user.id, goalId);
    }

    return res.status(201).json({
      message: "User created succesfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
