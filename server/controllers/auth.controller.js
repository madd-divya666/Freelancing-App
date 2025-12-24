import bcrypt from "bcrypt";
import User from "../models/User.js";
import Freelancer from "../models/Freelancer.js";

export const register = async (req, res) => {
  try {
    const { username, email, password, usertype } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hash,
      usertype,
    });

    if (usertype === "freelancer") {
      await Freelancer.create({ userId: user._id });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const match = bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: "Invalid credentials" });

  res.json(user);
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json(users);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};
