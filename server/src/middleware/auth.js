import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";
export const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new AppError("Authentication required", 401);
    req.user = jwt.verify(token, process.env.JWT_SECRET).id;
    next();
  } catch (e) {
    next(
      e.name === "JsonWebTokenError" ? new AppError("Invalid token", 401) : e,
    );
  }
};
