import { useState, useCallback } from "react";
import Papa from "papaparse";
import readXlsxFile from "read-excel-file";
import { type StudentData } from "@/pages/staff";

const REQUIRED_COLUMNS = [
  "email",
  "student id",
  "program code",
  "academic year",
];

interface StudentRecord {
  email: string;
  "student id": string;
  "program code": string;
  "academic year": string;
  [key: string]: string;
}

export const useFileParser = () => {
  const [parsedData, setParsedData] = useState<StudentData[]>([]);
  const [filesWithErrors, setFilesWithErrors] = useState<string[]>([]);

  const parseFiles = useCallback(async (files: File[]) => {
    const allData: StudentData[] = [];
    const errors: string[] = [];
    let rowCount = 1;

    for (const file of files) {
      try {
        let jsonData: StudentRecord[] = [];
        if (file.name.endsWith(".csv")) {
          const fileData = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.onerror = reject;
            reader.readAsText(file);
          });
          const parsed = Papa.parse(fileData, { header: true });
          jsonData = parsed.data as StudentRecord[];
        } else if (file.name.endsWith(".xls") || file.name.endsWith(".xlsx")) {
          const rows = await readXlsxFile(file);
          const header = rows[0].map(String);
          jsonData = rows.slice(1).map((row) =>
            header.reduce((acc, key, index) => {
              acc[key] = row[index] as string;
              return acc;
            }, {} as StudentRecord)
          );
        }

        if (jsonData.length > 0) {
          const fileColumns = Object.keys(jsonData[0] || {}).map((col) =>
            col.toLowerCase()
          );
          const hasAllColumns = REQUIRED_COLUMNS.every((col) =>
            fileColumns.includes(col)
          );

          if (hasAllColumns) {
            const formattedData: StudentData[] = jsonData
              .filter((row) =>
                REQUIRED_COLUMNS.every(
                  (col) => row[col] !== null && row[col] !== undefined
                )
              )
              .map((row) => ({
                id: rowCount++,
                email: row["email"],
                studentId: row["student id"],
                programCode: row["program code"],
                academicYear: row["academic year"],
                sourceFile: file.name,
              }));
            allData.push(...formattedData);
          } else {
            errors.push(file.name);
          }
        }
      } catch (error) {
        console.error("Error parsing file:", file.name, error);
        errors.push(file.name);
      }
    }
    setParsedData(allData);
    setFilesWithErrors(errors);
  }, []);

  return { parsedData, filesWithErrors, parseFiles };
};
