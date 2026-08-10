import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { AppError } from "../utils/AppError.js";
const token = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
const safe = (u) => ({
  id: u._id,
  name: u.name,
  email: u.email,
  createdAt: u.createdAt,
});
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      throw new AppError("Name, email and password are required", 400);
    if (await User.findOne({ email }))
      throw new AppError("Email already registered", 409);
    const user = await User.create({ name, email, password });
    res
      .status(201)
      .json({
        success: true,
        data: { user: safe(user), token: token(user.id) },
      });
  } catch (e) {
    next(e);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await user.comparePassword(req.body.password)))
      throw new AppError("Invalid email or password", 401);
    res.json({
      success: true,
      data: { user: safe(user), token: token(user.id) },
    });
  } catch (e) {
    next(e);
  }
};
export const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user);
    res.json({ success: true, data: { user: safe(user) } });
  } catch (e) {
    next(e);
  }
};
