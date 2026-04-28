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
  getWeightLogs,
  updateWaterGoal,
  getTodayWaterLogs,
  getWaterLogs,
  deleteWaterLog,
} from "../models/profileModel.js";
import uploadImage from "../util/cloudinary.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await getUserById(req.session.userId);
    const userId = req.session.userId;

    if (!user) return res.status(401).json({ error: "Authorization failed" });

    const userGoals = await getUserGoals(userId);
    const allGoals = await getAllGoals();
    const waterGoal = await getWaterGoal(userId);
    const weightLogs = await getWeightLogs(userId);
    const todayWaterLogs = await getTodayWaterLogs(userId);

    return res.status(200).json({
      ...user,
      selectedGoals: userGoals,
      goalOptions: allGoals,
      selectedWaterGoal: waterGoal,
      weightLogs,
      todayWaterLogs,
    });
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

  if (!amount || !date) {
    return res.status(400).json({ message: "Input fields are missing!" });
  }

  try {
    const transformedAmount = Number(amount);
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
export const editWaterGoal = async (req, res) => {
  const { waterGoal } = req.body;

  const userId = req.session.userId;

  if (!waterGoal) {
    return res.status(400).json({
      message: "Input field is missing",
    });
  }

  const transformedData = Number(waterGoal);

  if (!Number.isInteger(transformedData) || transformedData <= 0) {
    return res.status(400).json({
      message: "Please enter a valid goal",
    });
  }

  try {
    await updateWaterGoal(transformedData, userId);

    return res.status(200).json({
      message: "Success",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update water goal",
    });
  }
};

export const getUserWaterLogs = async (req, res) => {
  try {
    const userId = req.session.userId;

    const waterLogs = await getWaterLogs(userId);

    return res.status(200).json({ waterLogs });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch water logs",
    });
  }
};

export const deleteUserWaterLog = async (req, res) => {
  const { id } = req.params;
  const userId = req.session.userId;
  console.log(id)

  try {
    const deletedWaterLog = await deleteWaterLog(id, userId);
    console.log(deletedWaterLog);

    if (!deletedWaterLog) {
      return res.status(404).json({
        message: "Water log does not exist",
      });
    }

    return res.status(200).json({
      message: `Successfully deleted  water log`,
      deletedWaterLog,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete water log",
    });
  }
};
