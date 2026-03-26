import { getUserById, getUserGoals } from "../models/profileModel.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await getUserById(req.session.userId);
    if (!user) return res.status(401).json({ error: "Authorization failed" });

    return res
      .status(200)
      .json({ ...user, goals: await getUserGoals(req.session.userId) });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
