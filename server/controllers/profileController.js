import {
  addWeightLogger,
  getAllGoals,
  getUserById,
  getUserGoals,
  updateUserGoals,
  updateUserImage,
  updateUserInfo,
  addWaterLogger,
  addWorkoutLogger,
  getWaterGoal,

} from "../models/profileModel.js";
import uploadImage from "../util/cloudinary.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await getUserById(req.session.userId);

    if (!user) return res.status(401).json({ error: "Authorization failed" });

    const userGoals = await getUserGoals(req.session.userId);
    const allGoals = await getAllGoals();
    const waterGoal = await getWaterGoal(req.session.userId)
    console.log(waterGoal)
    return res
      .status(200)
      .json({ ...user, selectedGoals: userGoals, goalOptions: allGoals, selectedWaterGoal: waterGoal });
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
export const addUserWeight = async (req, res) => {
  const { weight, unit, date } = req.body;
  const userId = req.session.userId;

  if (!weight || !unit || !date) {
    return res.status(400).json({ message: "Input fields are missing!" });
  }

  try {
    const transformedWeight = Number(weight);

    await addWeightLogger(userId, transformedWeight, unit, date);

    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ message: "Failed to save weight" });
  }
};

export const addUserWater = async (req, res) => {
  const { amount, date } = req.body;
  const userId = req.session.userId;
  console.log(amount, date);

  if (!amount || !date) {
    return res.status(400).json({ message: "Input fields are missing!" });
  }

  try {
    const transformedAmount = Number(amount);
    console.log(transformedAmount);
    await addWaterLogger(userId, transformedAmount, date);
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save water intake" });
  }
};

export const addUserWorkout = async (req, res) => {
  const { workouts, note, date } = req.body;
  const userId = req.session.userId;

  if (!workouts || !date) {
    return res.status(400).json({ message: "Input fields are missing!" });
  }

  try {
    await addWorkoutLogger({
      userId,
      workouts,
      note,
      date,
    });

    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Failed to save workout session" });
  }
};
