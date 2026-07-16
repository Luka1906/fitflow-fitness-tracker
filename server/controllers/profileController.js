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
  getWeightGoal,
  updateWeightGoal,
  deleteWeightLog,
  getWorkoutLog,
  deleteWorkoutLog,
  editWeightLog,
} from "../models/profileModel.js";
import formattedLogs from "../util/formattedLogs.js";
import uploadImage from "../util/cloudinary.js";
import { getTodayKey } from "../util/getTodayKey.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await getUserById(req.session.userId);
    const userId = req.session.userId;

    if (!user) return res.status(401).json({ error: "Authorization failed" });

    const userGoals = await getUserGoals(userId);
    const allGoals = await getAllGoals();
    const waterGoal = await getWaterGoal(userId);
    const waterLogs = await getWaterLogs(userId);
    const todayWaterLogs = await getTodayWaterLogs(userId, getTodayKey());
    const weightLogs = await getWeightLogs(userId);
    const weightGoal = await getWeightGoal(userId);
    const workoutLogs = await getWorkoutLog(userId);
    const formattedWorkoutLogs = formattedLogs(workoutLogs);

    console.log(getTodayKey())

    return res.status(200).json({
      user,
      goals: {
        selected: userGoals,
        options: allGoals,
      },
      water: {
        goal: waterGoal,
        todayLogs: todayWaterLogs,
        logs: waterLogs,
      },
      weight: {
        goal: weightGoal,
        logs: weightLogs,
      },
      workouts: formattedWorkoutLogs,
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

export const editWeightGoal = async (req, res) => {
  const { weight, unit } = req.body;

  const userId = req.session.userId;
  const allowedUnits = ["kg", "lbs"];

  if (!weight || !unit) {
    return res.status(400).json({ message: "Input fields are missing" });
  }
  const transformedWeight = Number(weight);

  if (Number.isNaN(transformedWeight) || transformedWeight <= 0) {
    return res.status(400).json({ message: "Please enter a valid goal" });
  }

  if (!allowedUnits.includes(unit)) {
    return res.status(400).json({ message: "Invalid weight unit" });
  }
  try {
    await updateWeightGoal(transformedWeight, unit, userId);
    return res.status(200).json({ message: "Successful weight goal update" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update weight goal" });
  }
};

export const deleteUserWeightLog = async (req, res) => {
  const { id } = req.params;
  const userId = req.session.userId;

  try {
    const deletedWeightLog = await deleteWeightLog(id, userId);

    if (!deleteWeightLog) {
      return res.status(404).json({ message: "Weight log does not exist" });
    }

    return res
      .status(200)
      .json({ message: "succesfully delete weight log", deletedWeightLog });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete weight log" });
  }
};

export const updateUserWeightLog = async (req, res) => {
  const { id } = req.params;
  const { weight, unit, logDate } = req.body;
  const userId = req.session.userId;

  const today = new Date().toISOString().split("T")[0];
  const formattedWeight = Number(weight);

  try {
    if (logDate > today) {
      return res.status(400).json({
        success: false,
        message: "Weight log date cannot be in future.",
      });
    }

    if (!formattedLogs || formattedWeight < 0) {
      return res.status(400).json({
        success: false,
        message: "Weight must be greater than 0",
      });
    }

    if (!["lbs", "kg"].includes(unit)) {
      return res.status(400).json({
        success: false,
        message: "Invalid weight unit",
      });
    }

    const updatedLog = await editWeightLog(
      id,
      userId,
      formattedWeight,
      unit,
      logDate,
    );

    if (!updatedLog) {
      return res.status(404).json({
        success: false,
        message: "Weight log not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "You successfully updated the log",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update weight log",
    });
  }
};

export const addUserWater = async (req, res) => {
  const { amount, date } = req.body;
  console.log(date)
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
  const { workouts, note, date, hours, minutes } = req.body;
  const userId = req.session.userId;


  if (!workouts || !date) {
    return res.status(400).json({ message: "Input fields are missing!" });
  }

  // Convert to numbers

  const parsedHours = Number(hours || 0);
  const parsedMinutes = Number(minutes || 0);

  if (
    parsedHours < 0 ||
    parsedHours > 23 ||
    parsedMinutes < 0 ||
    parsedMinutes > 59
  ) {
    return res.status(400).json({ message: "Invalid workout duration" });
  }

  const workoutDuration = parsedHours * 60 + parsedMinutes;


  try {
    await addWorkoutLogger({
      userId,
      workouts,
      note,
      date,
      workoutDuration,
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

  try {
    const deletedWaterLog = await deleteWaterLog(id, userId);

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

export const deleteUserWorkoutLog = async (req, res) => {
  const { id } = req.params;
  const userId = req.session.userId;

  try {
    const deletedWorkoutLog = await deleteWorkoutLog(id, userId);
    if (!deleteUserWorkoutLog) {
      res.status(404).json({
        message: "Workout log does not exist",
      });
    }
    return res.status(200).json({
      message: "Successfully deleted workout log",
      deletedWorkoutLog,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete workout log",
    });
  }
};
