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
