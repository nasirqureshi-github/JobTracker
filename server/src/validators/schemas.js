import { z } from "zod";
export const authSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email(),
  password: z.string().min(6),
});
export const jobSchema = z
  .object({
    title: z.string().min(1),
    company: z.string().min(1),
    location: z.string().optional(),
    remoteType: z.enum(["ONSITE", "HYBRID", "REMOTE"]).optional(),
    employmentType: z
      .enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP", "FREELANCE"])
      .optional(),
    status: z
      .enum([
        "SAVED",
        "APPLIED",
        "SCREENING",
        "INTERVIEW",
        "TECHNICAL_INTERVIEW",
        "FINAL_INTERVIEW",
        "OFFER",
        "ACCEPTED",
        "REJECTED",
        "WITHDRAWN",
      ])
      .optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  })
  .passthrough();
