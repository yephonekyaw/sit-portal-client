import z from "zod";

export const programFormSchema = z.object({
  program_code: z
    .string()
    .min(2, "Program code must be at least 2 characters")
    .max(50, "Program code must be less than 50 characters"),
  program_name: z
    .string()
    .min(2, "Program name must be at least 2 characters")
    .max(255, "Program name must be less than 255 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  duration_years: z
    .number()
    .min(1, "Duration must be at least 1 year")
    .max(10, "Duration must be less than 10 years"),
  is_active: z.boolean(),
});
