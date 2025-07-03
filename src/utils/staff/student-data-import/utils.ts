import {
  PROGRAM_COLORS,
  SUPPORTED_FILE_TYPES,
} from "@/constants/staff/student-data-import/constants";

export const getProgramColor = (programCode: string): string => {
  return (
    PROGRAM_COLORS[programCode as keyof typeof PROGRAM_COLORS] ||
    PROGRAM_COLORS.default
  );
};

export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
};

export const formatFileSize = (bytes: number): string => {
  return `${(bytes / 1024).toFixed(2)} KB`;
};

export const isFileSupported = (fileType: string): boolean => {
  return SUPPORTED_FILE_TYPES.includes(
    fileType as (typeof SUPPORTED_FILE_TYPES)[number]
  );
};
