import {
  PROGRAM_COLORS,
  REQUIRED_COLUMNS,
  SUPPORTED_FILE_TYPES,
} from "@/constants/staff/student-data-import.constants";
import type { FileParsedTableRowStudentRecord } from "@/types/staff/student-data-import.types";
import Papa from "papaparse";
import readXlsxFile from "read-excel-file";

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

export const parseCSV = async (
  file: File
): Promise<FileParsedTableRowStudentRecord[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = Papa.parse(text, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });
        resolve(parsed.data as FileParsedTableRowStudentRecord[]);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

export const parseExcel = async (
  file: File
): Promise<FileParsedTableRowStudentRecord[]> => {
  const rows = await readXlsxFile(file);
  const header = rows[0].map(String);
  return rows.slice(1).map((row) =>
    header.reduce((acc, key, index) => {
      acc[key] = row[index] as string;
      return acc;
    }, {} as FileParsedTableRowStudentRecord)
  );
};

export const validateColumns = (
  data: FileParsedTableRowStudentRecord[]
): boolean => {
  if (data.length === 0) return false;
  const fileColumns = Object.keys(data[0] || {}).map((col) =>
    col.toLowerCase().trim()
  );
  return REQUIRED_COLUMNS.every((col) => fileColumns.includes(col));
};

export const formatParsedStudentData = (
  data: FileParsedTableRowStudentRecord[],
  fileName: string,
  startingId: number
): FileParsedTableRowStudentRecord[] => {
  return data
    .filter((row) =>
      REQUIRED_COLUMNS.every(
        (col) =>
          row[col] !== null &&
          row[col] !== undefined &&
          row[col] !== "" &&
          String(row[col]).trim() !== ""
      )
    )
    .map((row, index) => ({
      id: (startingId + index).toString(),
      name: String(row["name"] || "").trim(),
      email: String(row["email"] || "").trim(),
      studentId: String(row["student id"] || "").trim(),
      programCode: String(row["program code"] || "").trim(),
      academicYear: String(row["academic year"] || "").trim(),
      sourceFile: fileName,
    }));
};
