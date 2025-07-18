import { z } from "zod";
import { parsedFileStudentRecordSchema } from "@/schemas/staff/data-import.schemas";
import type { Column, Row, Table } from "@tanstack/react-table";

// types of schemas
export type ParsedFileStudentRecordSchemaType = z.infer<
  typeof parsedFileStudentRecordSchema
>;

export interface FileParsedTableRowStudentRecord {
  id: string;
  firstName: string;
  lastName: string;
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

export interface StudentDataImportColumnsProps {
  handleSelectRecord: (
    record: FileParsedTableRowStudentRecord | null,
    mode: "add" | "edit"
  ) => void;
}

export interface ActionButtonsProps<TData> {
  table: Table<TData>;
}

export interface FacetedFilterColumnProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  trigger?: React.ReactNode;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
    className?: string;
  }[];
  showSearch?: boolean;
  searchPlaceholder?: string;
}

export interface RowActionsProps<TData> {
  row: Row<TData>;
  onView?: (row: TData) => void;
  onEdit?: (row: TData) => void;
  onDelete?: (row: TData) => void;
}

export interface SearchFilterColumnProps<TData, TValue> {
  column: Column<TData, TValue>;
  trigger: React.ReactNode;
  placeholder?: string;
  className?: string;
}

export interface SortFilterColumnProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export interface PaginationProps<TData> {
  table: Table<TData>;
}

export interface ParsedStudentDataState {
  // File Parser State
  parsedData: FileParsedTableRowStudentRecord[];
  filesWithErrors: string[];
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
