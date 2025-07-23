import z from "zod";

export const programRequirementFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(255, "Name must be less than 255 characters"),
  program_id: z.string().min(1, "Please select a program"),
  cert_type_id: z.string().min(1, "Please select a certificate type"),
  target_year: z
    .number()
    .min(1, "Target year must be at least 1")
    .max(10, "Target year must be less than 10"),
  deadline_month: z
    .number()
    .min(1, "Month must be between 1-12")
    .max(12, "Month must be between 1-12"),
  deadline_day: z
    .number()
    .min(1, "Day must be between 1-31")
    .max(31, "Day must be between 1-31"),
  is_mandatory: z.boolean(),
  special_instruction: z.string().optional(),
  is_active: z.boolean(),
  recurrence_type: z.enum(["once", "annual"]),
});
