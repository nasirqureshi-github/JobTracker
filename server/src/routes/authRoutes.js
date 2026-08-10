import { Router } from "express";
import * as c from "../controllers/authController.js";
import { protect } from "../middleware/auth.js";
const r = Router();
r.post("/register", c.register);
r.post("/login", c.login);
r.get("/me", protect, c.me);
export default r;
