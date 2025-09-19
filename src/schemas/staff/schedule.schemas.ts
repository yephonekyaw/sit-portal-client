import z from "zod";

export const scheduleFormSchema = z.object({
  programRequirementId: z
    .string()
    .uuid("Invalid program requirement ID format"),
  academicYearId: z.string().uuid("Invalid academic year ID format"),
  submissionDate: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2}$/,
      "Invalid date format. Please use YYYY-MM-DD format"
    ),
  submissionTime: z
    .string()
    .regex(
      /^\d{2}:\d{2}:\d{2}$/,
      "Invalid time format. Please use HH:MM:SS format"
    ),
  gracePeriodDays: z.coerce
    .number()
    .min(0, "Grace period days must be at least 0")
    .max(365, "Grace period days must be less than 365")
    .optional(),
  notificationDaysBeforeDeadline: z.coerce
    .number()
    .min(0, "Notification days must be at least 0")
    .max(365, "Notification days must be less than 365")
    .optional(),
});
