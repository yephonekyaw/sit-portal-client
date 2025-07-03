import { useState, useCallback } from "react";
import Papa from "papaparse";
import readXlsxFile from "read-excel-file";
import type {
  FileParsedTableRowStudentRecord,
  UseFileParserReturn,
} from "@/types/staff/student-data-import/types";
import { REQUIRED_COLUMNS } from "@/constants/staff/student-data-import/constants";

export const useFileParser = (): UseFileParserReturn => {
  const [parsedData, setParsedData] = useState<
    FileParsedTableRowStudentRecord[]
  >([]);
  const [filesWithErrors, setFilesWithErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const parseCSV = async (
    file: File
  ): Promise<FileParsedTableRowStudentRecord[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const parsed = Papa.parse(text, { header: true });
          resolve(parsed.data as FileParsedTableRowStudentRecord[]);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const parseExcel = async (
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

  const validateColumns = (
    data: FileParsedTableRowStudentRecord[]
  ): boolean => {
    if (data.length === 0) return false;
    const fileColumns = Object.keys(data[0] || {}).map((col) =>
      col.toLowerCase()
    );
    return REQUIRED_COLUMNS.every((col) => fileColumns.includes(col));
  };

  const formatStudentData = (
    data: FileParsedTableRowStudentRecord[],
    fileName: string,
    startingId: number
  ): FileParsedTableRowStudentRecord[] => {
    return data
      .filter((row) =>
        REQUIRED_COLUMNS.every(
          (col) =>
            row[col] !== null && row[col] !== undefined && row[col] !== ""
        )
      )
      .map((row, index) => ({
        id: (startingId + index).toString(),
        name: row["name"],
        email: row["email"],
        studentId: (row["student id"] || "").toString(),
        programCode: (row["program code"] || "").toString(),
        academicYear: (row["academic year"] || "").toString(),
        sourceFile: fileName,
      }));
  };

  const parseFiles = useCallback(async (files: File[]) => {
    if (files.length === 0) {
      setParsedData([]);
      setFilesWithErrors([]);
      return;
    }

    setIsLoading(true);
    const allData: FileParsedTableRowStudentRecord[] = [];
    const errors: string[] = [];
    let rowCount = 1;

    try {
      for (const file of files) {
        try {
          let jsonData: FileParsedTableRowStudentRecord[] = [];

          if (file.name.endsWith(".csv")) {
            jsonData = await parseCSV(file);
          } else if (
            file.name.endsWith(".xls") ||
            file.name.endsWith(".xlsx")
          ) {
            jsonData = await parseExcel(file);
          }

          if (validateColumns(jsonData)) {
            const formattedData = formatStudentData(
              jsonData,
              file.name,
              rowCount
            );
            allData.push(...formattedData);
            rowCount += formattedData.length;
          } else {
            errors.push(file.name);
          }
        } catch (error) {
          console.error(`Error parsing file ${file.name}:`, error);
          errors.push(file.name);
        }
      }
    } finally {
      setIsLoading(false);
    }

    setParsedData(allData);
    setFilesWithErrors(errors);
  }, []);

  return {
    parsedData,
    setParsedData,
    filesWithErrors,
    parseFiles,
    isLoading,
  };
};
