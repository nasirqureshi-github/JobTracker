import { Router } from "express";
import * as c from "../controllers/dashboardController.js";
import { protect } from "../middleware/auth.js";
const r = Router();
r.use(protect);
r.get("/stats", c.stats);
r.get("/activity", c.activity);
export default r;
