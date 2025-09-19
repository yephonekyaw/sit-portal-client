import z from "zod";

export const programFormSchema = z.object({
  programCode: z
    .string()
    .min(2, "Program code must be at least 2 characters")
    .max(50, "Program code must be less than 50 characters"),
  programName: z
    .string()
    .min(2, "Program name must be at least 2 characters")
    .max(255, "Program name must be less than 255 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  durationYears: z.coerce
    .number()
    .min(1, "Duration must be at least 1 year")
    .max(10, "Duration must be less than 10 years"),
  isActive: z.boolean(),
});
