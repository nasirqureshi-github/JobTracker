import Job from "../models/Job.js";
import { AppError } from "../utils/AppError.js";
const normalizeEnum = (value) =>
  typeof value === "string" ? value.trim().toUpperCase().replace(/\s+/g, "_") : value;
const normalizeJobEnums = (body) => {
  const normalized = { ...body };
  for (const field of ["remoteType", "employmentType", "status", "priority"])
    if (field in normalized) normalized[field] = normalizeEnum(normalized[field]);
  return normalized;
};
const owned = async (id, user) => {
  const j = await Job.findOne({ _id: id, user });
  if (!j) throw new AppError("Job not found", 404);
  return j;
};
export const list = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      status,
      priority,
      remoteType,
      employmentType,
      source,
      sort = "-createdAt",
    } = req.query;
    let q = { user: req.user };
    for (const k of [
      "status",
      "priority",
      "remoteType",
      "employmentType",
      "source",
    ])
      if (req.query[k]) q[k] = req.query[k];
    if (search)
      q.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    const total = await Job.countDocuments(q);
    const jobs = await Job.find(q)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json({
      success: true,
      data: {
        jobs,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (e) {
    next(e);
  }
};
export const create = async (req, res, next) => {
  try {
    const job = await Job.create({ ...normalizeJobEnums(req.body), user: req.user });
    res.status(201).json({ success: true, data: { job } });
  } catch (e) {
    next(e);
  }
};
export const get = async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: { job: await owned(req.params.id, req.user) },
    });
  } catch (e) {
    next(e);
  }
};
export const update = async (req, res, next) => {
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      normalizeJobEnums(req.body),
      { new: true, runValidators: true },
    );
    if (!job) throw new AppError("Job not found", 404);
    res.json({ success: true, data: { job } });
  } catch (e) {
    next(e);
  }
};
export const remove = async (req, res, next) => {
  try {
    await (await owned(req.params.id, req.user)).deleteOne();
    res.json({ success: true, message: "Job deleted" });
  } catch (e) {
    next(e);
  }
};
export const status = async (req, res, next) => {
  try {
    req.body = { status: req.body.status };
    await update(req, res, next);
  } catch (e) {
    next(e);
  }
};
