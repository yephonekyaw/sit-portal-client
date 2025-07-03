import { z } from "zod";
import { parsedFileStudentRecordSchema } from "@/schemas/staff/student-data-import/schemas";

export interface FileParsedTableRowStudentRecord {
  id: string;
  name: string;
  email: string;
  studentId: string;
  programCode: string;
  academicYear: string;
  sourceFile?: string;
  [key: string]: string | undefined;
}

export interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  filesWithErrors?: string[];
}

export interface FilePreviewProps {
  file: File;
  onRemove: (file: File) => void;
  hasError?: boolean;
}

export interface StudentDetailsSheetProps {
  student: FileParsedTableRowStudentRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedStudent: FileParsedTableRowStudentRecord) => void;
}

export interface UseFileParserReturn {
  parsedData: FileParsedTableRowStudentRecord[];
  setParsedData: (data: FileParsedTableRowStudentRecord[]) => void;
  filesWithErrors: string[];
  parseFiles: (files: File[]) => Promise<void>;
  isLoading: boolean;
}

export type ParsedFileStudentRecordSchemaType = z.infer<
  typeof parsedFileStudentRecordSchema
>;

export interface UseParsedRecordManagerProps {
  parsedData: FileParsedTableRowStudentRecord[];
  setParsedData: (data: FileParsedTableRowStudentRecord[]) => void;
}

export type StudentDetailSheetProps = {
  recordManager: ReturnType<
    typeof import("@/hooks/use-parsed-record-manager").useParsedRecordManager
  >;
  mode: "add" | "edit";
};
