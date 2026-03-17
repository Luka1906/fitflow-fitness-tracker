import { loginSchema } from "../util/validation.js";
import uploadImage from "../util/cloudinary.js";
import bcrypt from "bcrypt";
import { addUser } from "../models/authModel.js";
import { existingUser } from "../models/authModel.js";

export const loginAuth = (req, res) => {
  const inputFields = req.body;
  try {
    const { error, value } = loginSchema.validate(inputFields, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        errors: error.details.map((err) => err.message),
      });
    }

    return res.status(200).json({ message: "Login success" });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

export const signupAuth = async (req, res) => {
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
      return res.status(400).json({ error: "User already exists. Please login!" });
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

    return res.status(201).json({
      message: "User created succesfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
