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

// Schema for academic year: must be in the format 'YYYY-YYYY'
const academicYearSchema = z.string().regex(/^\d{4}-\d{4}$/, {
  message: "Academic year must be in the format YYYY-YYYY.",
});

// Main schema for student data import
export const parsedFileStudentRecordSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  studentId: studentIdSchema,
  programCode: programCodeSchema,
  academicYear: academicYearSchema,
});
