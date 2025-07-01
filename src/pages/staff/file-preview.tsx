import type React from "react";
import { X, FileSpreadsheet, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilePreviewProps {
  file: File;
  onRemove: (file: File) => void;
  hasError?: boolean;
}

const getFileTypeIcon = (fileType: string) => {
  if (fileType.includes("csv")) {
    return <FileSpreadsheet className="w-6 h-6 text-blue-500" />;
  }
  // Add more file type checks here
  return <FileSpreadsheet className="w-6 h-6 text-blue-400" />;
};

export const FilePreview: React.FC<FilePreviewProps> = ({
  file,
  onRemove,
  hasError,
}) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {getFileTypeIcon(file.type)}
        <div className="flex flex-col items-start">
          <p className="text-sm font-medium text-gray-800 truncate max-w-[200px] sm:max-w-full">
            {file.name}
          </p>
          <p className="text-xs text-gray-500">
            {(file.size / 1024).toFixed(2)} KB
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {hasError && <AlertCircle className="w-5 h-5 text-red-500" />}
        <Button variant="ghost" size="icon" onClick={() => onRemove(file)}>
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
