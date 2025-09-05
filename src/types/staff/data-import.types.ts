import { z } from "zod";
import {
  parsedFileStudentRecordSchema,
  fileParsedTableRowStudentRecordSchema,
  type ValidationError,
  type FileParseResult,
} from "@/schemas/staff/data-import.schemas";

// Export types from schemas
export type ParsedFileStudentRecordSchemaType = z.infer<
  typeof parsedFileStudentRecordSchema
>;

export type FileParsedTableRowStudentRecord = z.infer<
  typeof fileParsedTableRowStudentRecordSchema
>;

export type { ValidationError, FileParseResult };

export interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  filesWithErrors?: string[];
  fileParseResults?: Record<string, FileParseResult>;
}

export interface FilePreviewProps {
  file: File;
  onRemove: (file: File) => void;
  hasError?: boolean;
  parseResult?: FileParseResult;
}

export interface StudentDataImportColumnsProps {
  handleSelectRecord: (
    record: FileParsedTableRowStudentRecord | null,
    mode: "add" | "edit"
  ) => void;
}

export interface ParsedStudentDataState {
  // File Parser State
  parsedData: FileParsedTableRowStudentRecord[];
  filesWithErrors: string[];
  fileParseResults: Record<string, FileParseResult>;
  isLoading: boolean;

  // Record Manager State
  isSheetOpen: boolean;
  selectedRecord: FileParsedTableRowStudentRecord | null;
  mode: "add" | "edit";

  // File Parser Actions
  parseFiles: (files: File[]) => Promise<void>;
  setParsedData: (data: FileParsedTableRowStudentRecord[]) => void;
  clearData: () => void;

  // Record Manager Actions
  handleOpenSheet: () => void;
  handleCloseSheet: () => void;
  handleSelectRecord: (
    record: FileParsedTableRowStudentRecord | null,
    mode: "add" | "edit"
  ) => void;
  handleUpdateRecord: (updatedRecord: FileParsedTableRowStudentRecord) => void;
  handleDeleteRecord: (recordId: string) => void;
  handleAddRecord: (newRecord: ParsedFileStudentRecordSchemaType) => void;
  handleReorderRecords: () => void;
  handleMultipleDelete: (recordIds: string[]) => void;
  setMode: (mode: "add" | "edit") => void;
  setSelectedRecord: (record: FileParsedTableRowStudentRecord | null) => void;
  setIsSheetOpen: (isOpen: boolean) => void;
}
