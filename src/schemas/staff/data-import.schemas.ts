import { z } from "zod";

// Schema for student ID: must be a string of 11 digits
const studentIdSchema = z
  .string()
  .length(11, { message: "Student ID must be exactly 11 digits." })
  .regex(/^[0-9]+$/, { message: "Student ID must only contain numbers." });

// Schema for program code: must be one of 'CS', 'DSI', or 'IT'
const programCodeSchema = z.enum(["CS", "DSI", "IT"], {
  errorMap: () => ({
    message: "Invalid program code. Must be 'CS', 'DSI', or 'IT'.",
  }),
});

// Schema for academic year: must be in the format 'YYYY'
const academicYearSchema = z.string().regex(/^\d{4}$/, {
  message: "Academic year must be in the format YYYY.",
});

// Schema for email: must be a valid email ending with @ad.sit.kmutt.ac.th
const emailSchema = z
  .string()
  .email({ message: "Invalid email address." })
  .refine((email) => email.endsWith("@ad.sit.kmutt.ac.th"), {
    message: "Email must end with @ad.sit.kmutt.ac.th",
  });

// Main schema for student data import
export const parsedFileStudentRecordSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: emailSchema,
  studentId: studentIdSchema,
  programCode: programCodeSchema,
  academicYear: academicYearSchema,
});

// Schema for the complete record including id and sourceFile
export const fileParsedTableRowStudentRecordSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: emailSchema,
  studentId: studentIdSchema,
  programCode: programCodeSchema,
  academicYear: academicYearSchema,
  sourceFile: z.string().optional(),
});

// Validation result types
export type ValidationError = {
  field: string;
  message: string;
  value: unknown;
};

export type FileParseResult = {
  success: boolean;
  data?: z.infer<typeof fileParsedTableRowStudentRecordSchema>[];
  errors?: ValidationError[];
  fileName: string;
};
