import z from "zod";

export const scheduleFormSchema = z.object({
  programRequirementId: z
    .string()
    .uuid("Invalid program requirement ID format"),
  academicYearId: z
    .string()
    .uuid("Invalid academic year ID format"),
  submissionDeadline: z
    .string()
    .datetime("Invalid submission deadline format"),
  gracePeriodDays: z
    .number()
    .min(0, "Grace period days must be at least 0")
    .max(365, "Grace period days must be less than 365")
    .optional(),
  notificationDaysBeforeDeadline: z
    .number()
    .min(0, "Notification days must be at least 0")
    .max(365, "Notification days must be less than 365")
    .optional(),
});