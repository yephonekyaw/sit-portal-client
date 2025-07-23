import { z } from "zod";

export const addStaffFormSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  first_name: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must be 50 characters or less"),
  last_name: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must be 50 characters or less"),
  employee_id: z
    .string()
    .min(1, "Employee ID is required")
    .max(20, "Employee ID must be 20 characters or less"),
  department: z
    .string()
    .min(1, "Department is required")
    .max(100, "Department must be 100 characters or less"),
  program_permissions: z
    .array(
      z.object({
        program_id: z.string().min(1, "Program is required"),
        role_id: z.string().min(1, "Role is required"),
      })
    )
    .min(1, "At least one program permission is required"),
});

export type AddStaffFormSchemaType = z.infer<typeof addStaffFormSchema>;