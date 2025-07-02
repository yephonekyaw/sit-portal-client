import React from "react";
import { X, FileSpreadsheet, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FilePreviewProps } from "@/types/staff/student-data-import/index.types";
import { formatFileSize } from "@/utils/staff/student-data-import/index.utils";

export const FilePreview: React.FC<FilePreviewProps> = ({
  file,
  onRemove,
  hasError = false,
}) => {
  const handleRemove = () => onRemove(file);

  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <FileSpreadsheet className="w-6 h-6 text-blue-400 flex-shrink-0" />
        <div className="flex flex-col items-start min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-800 truncate max-w-[200px] sm:max-w-full">
            {file.name}
          </p>
          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {hasError && <AlertCircle className="w-5 h-5 text-red-500" />}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRemove}
          aria-label={`Remove ${file.name}`}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
