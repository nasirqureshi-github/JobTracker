import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { connectDB } from "./config/db.js";
import auth from "./routes/authRoutes.js";
import jobs from "./routes/jobRoutes.js";
import dashboard from "./routes/dashboardRoutes.js";
import { errorHandler } from "./middleware/error.js";
const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:3000" }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "JobTracker API is running",
  });
});

app.get("/api/health", (q, s) =>
  s.json({ success: true, message: "JobTracker API online" }),
);
app.use("/api/auth", auth);
app.use("/api/jobs", jobs);
app.use("/api/dashboard", dashboard);
app.use(errorHandler);
connectDB().then(() =>
  app.listen(process.env.PORT || 5000, () => console.log("API listening")),
);
