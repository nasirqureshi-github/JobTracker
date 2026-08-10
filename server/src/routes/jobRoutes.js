import { Router } from "express";
import * as c from "../controllers/jobController.js";
import { protect } from "../middleware/auth.js";
const r = Router();
r.use(protect);
r.route("/").get(c.list).post(c.create);
r.route("/:id").get(c.get).put(c.update).delete(c.remove);
r.patch("/:id/status", c.status);
export default r;
