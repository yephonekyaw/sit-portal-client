import { z } from "zod";

// Manual Verification Form Schema
export const ManualVerificationFormSchema = z.object({
  submissionId: z
    .string({ required_error: "Submission ID is required" })
    .uuid({ message: "Invalid submission ID format" }),
  scheduleId: z
    .string({ required_error: "Schedule ID is required" })
    .uuid({ message: "Invalid schedule ID format" }),
  status: z
    .enum(["approved", "rejected"], {
      required_error: "Please select a verification status",
      invalid_type_error: "Status must be either Approved or Rejected",
    })
    .transform((val) => val as "approved" | "rejected"),
  comments: z
    .string()
    .max(1000, { message: "Comments must not exceed 1000 characters" })
    .optional()
    .or(z.literal("")),
  reasons: z
    .string()
    .max(1000, { message: "Reasons must not exceed 1000 characters" })
    .optional()
    .or(z.literal("")),
});
