import Job from "../models/Job.js";
export const stats = async (req, res, next) => {
  try {
    const user = req.user,
      now = new Date(),
      month = new Date(now.getFullYear(), now.getMonth(), 1);
    const [total, thisMonth, byStatus, bySource, recent] = await Promise.all([
      Job.countDocuments({ user }),
      Job.countDocuments({ user, createdAt: { $gte: month } }),
      Job.aggregate([
        {
          $match: {
            user: new (await import("mongoose")).default.Types.ObjectId(user),
          },
        },
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
      Job.aggregate([
        {
          $match: {
            user: new (await import("mongoose")).default.Types.ObjectId(user),
          },
        },
        { $group: { _id: "$source", count: { $sum: 1 } } },
      ]),
      Job.find({ user }).sort("-createdAt").limit(6),
    ]);
    const count = (k) => byStatus.find((x) => x._id === k)?.count || 0;
    res.json({
      success: true,
      data: {
        total,
        thisMonth,
        interviews:
          count("INTERVIEW") +
          count("TECHNICAL_INTERVIEW") +
          count("FINAL_INTERVIEW"),
        pending: count("APPLIED") + count("SCREENING"),
        offers: count("OFFER") + count("ACCEPTED"),
        rejected: count("REJECTED"),
        successRate: total ? Math.round((count("ACCEPTED") / total) * 100) : 0,
        byStatus,
        bySource,
        recent,
      },
    });
  } catch (e) {
    next(e);
  }
};
export const activity = async (req, res, next) => {
  try {
    const jobs = await Job.find({ user: req.user })
      .sort("-updatedAt")
      .limit(20)
      .select("title company status updatedAt");
    res.json({ success: true, data: { activity: jobs } });
  } catch (e) {
    next(e);
  }
};
