export const SUPPORTED_FILE_TYPES = [
  "text/csv",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
] as const;

export const REQUIRED_COLUMNS = [
  "name",
  "email",
  "student id",
  "program code",
  "academic year",
] as const;

export const REQUIRED_COLUMN_MAPPINGS = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "student_id", label: "Student ID" },
  { key: "program_code", label: "Program Code" },
  { key: "academic_year", label: "Academic Year" },
] as const;

export const PROGRAM_OPTIONS = [
  { value: "CS", label: "CS" },
  { value: "DSI", label: "DSI" },
  { value: "IT", label: "IT" },
];

export const PROGRAM_COLORS = {
  CS: "bg-blue-50 text-blue-700 border-blue-200",
  DSI: "bg-purple-50 text-purple-700 border-purple-200",
  IT: "bg-green-50 text-green-700 border-green-200",
  default: "bg-gray-50 text-gray-700 border-gray-200",
} as const;

export const EDITABLE_FIELDS = [
  { id: "name", label: "Name", type: "text" },
  { id: "email", label: "Email", type: "email" },
  { id: "studentId", label: "Student ID", type: "text" },
  { id: "programCode", label: "Program Code", type: "text" },
  { id: "academicYear", label: "Academic Year", type: "text" },
] as const;
