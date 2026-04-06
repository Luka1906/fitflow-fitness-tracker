import {
  getAllGoals,
  getUserById,
  getUserGoals,
  updateUserGoals,
  updateUserImage,
  updateUserInfo,
} from "../models/profileModel.js";
import uploadImage from "../util/cloudinary.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await getUserById(req.session.userId);
    if (!user) return res.status(401).json({ error: "Authorization failed" });

    const userGoals = await getUserGoals(req.session.userId);
    const allGoals = await getAllGoals();

    return res.status(200).json({ ...user, selectedGoals: userGoals, goalOptions: allGoals });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const editUserProfile = async (req, res) => {
  try {
    const userId = req.session.userId;
    const updatedFields = req.body;

    await updateUserInfo(userId, updatedFields);
    await updateUserGoals(userId, updatedFields.fitnessGoals);

    return res.status(200).json({ message: "Profile updated" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const editUserAvatar = async (req, res) => {
  console.log(req.file);
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }
    const image = await uploadImage(req.file.buffer);
    const imageUrl = image.secure_url;

    await updateUserImage(imageUrl, req.session.userId);

    return res.status(200).json({ message: "Image updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
