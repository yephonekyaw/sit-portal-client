import {
  PROGRAM_COLORS,
  REQUIRED_COLUMNS,
  SUPPORTED_FILE_TYPES,
} from "@/constants/staff/data-import.constants";
import type {
  FileParsedTableRowStudentRecord,
  ValidationError,
  FileParseResult,
} from "@/types/staff/data-import.types";
import { fileParsedTableRowStudentRecordSchema } from "@/schemas/staff/data-import.schemas";
import Papa from "papaparse";
import readXlsxFile from "read-excel-file";

export const getProgramColor = (programCode: string): string => {
  return (
    PROGRAM_COLORS[programCode as keyof typeof PROGRAM_COLORS] ||
    PROGRAM_COLORS.default
  );
};

export const isFileSupported = (fileType: string): boolean => {
  return SUPPORTED_FILE_TYPES.includes(
    fileType as (typeof SUPPORTED_FILE_TYPES)[number]
  );
};

export const parseCSV = async (
  file: File
): Promise<{ data: any[]; errors: string[] }> => {
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
        resolve({
          data: parsed.data as any[],
          errors: parsed.errors.map((err) => err.message),
        });
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
): Promise<{ data: any[]; errors: string[] }> => {
  try {
    const rows = await readXlsxFile(file);
    const header = rows[0].map(String);
    const data = rows.slice(1).map((row) =>
      header.reduce((acc, key, index) => {
        acc[key] = row[index] as string;
        return acc;
      }, {} as any)
    );
    return { data, errors: [] };
  } catch (error) {
    return {
      data: [],
      errors: [
        error instanceof Error
          ? error.message
          : "Unknown error parsing Excel file",
      ],
    };
  }
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

export const validateAndFormatStudentData = (
  rawData: any[],
  fileName: string,
  startingId: number
): FileParseResult => {
  const validatedData: FileParsedTableRowStudentRecord[] = [];
  const errors: ValidationError[] = [];

  rawData.forEach((row, rowIndex) => {
    // Check if row has all required columns
    const missingColumns = REQUIRED_COLUMNS.filter(
      (col) =>
        row[col] === null ||
        row[col] === undefined ||
        row[col] === "" ||
        String(row[col]).trim() === ""
    );

    if (missingColumns.length > 0) {
      errors.push({
        field: `Row ${rowIndex + 2}`,
        message: `Missing required columns: ${missingColumns.join(", ")}`,
        value: row,
      });
      return;
    }

    // Create the record object
    const recordData = {
      id: (startingId + validatedData.length).toString(),
      firstName: String(row["first name"] || "").trim(),
      lastName: String(row["last name"] || "").trim(),
      email: String(row["email"] || "").trim(),
      studentId: String(row["student id"] || "").trim(),
      programCode: String(row["program code"] || "").trim(),
      academicYear: String(row["academic year"] || "").trim(),
      sourceFile: fileName,
    };

    // Validate using Zod schema
    const validationResult =
      fileParsedTableRowStudentRecordSchema.safeParse(recordData);

    if (validationResult.success) {
      validatedData.push(validationResult.data);
    } else {
      // Extract Zod validation errors
      validationResult.error.errors.forEach((error) => {
        errors.push({
          field: `Row ${rowIndex + 2} - ${error.path.join(".")}`,
          message: error.message,
          value: error.path.reduce((obj: any, key) => obj?.[key], recordData),
        });
      });
    }
  });

  return {
    success: errors.length === 0,
    data: validatedData,
    errors: errors.length > 0 ? errors : undefined,
    fileName,
  };
};

export const removeDuplicates = (
  data: FileParsedTableRowStudentRecord[]
): FileParsedTableRowStudentRecord[] => {
  const seen = new Set<string>();
  return data.filter((record) => {
    const key = `${record.studentId}-${record.email}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};
