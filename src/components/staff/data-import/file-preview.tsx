import React, { useState } from "react";
import {
  X,
  FileSpreadsheet,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FilePreviewProps } from "@/types/staff/data-import.types";
import { formatFileSize } from "@/utils/common.utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export const FilePreview: React.FC<FilePreviewProps> = ({
  file,
  onRemove,
  hasError = false,
  parseResult,
}) => {
  const [showErrors, setShowErrors] = useState(false);
  const handleRemove = () => onRemove(file);

  const hasParseErrors =
    parseResult &&
    !parseResult.success &&
    parseResult.errors &&
    parseResult.errors.length > 0;

  return (
    <div
      className={`w-full bg-white border rounded-lg ${
        hasError ? "border-red-300" : "border-green-300"
      }`}
    >
      <div className="px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FileSpreadsheet
            className={`w-6 h-6 flex-shrink-0 ${
              hasError ? "text-red-400" : "text-blue-400"
            }`}
          />
          <div className="flex flex-col items-start min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-800 truncate max-w-[200px] sm:max-w-full">
              {file.name}
            </p>
            <div className="flex items-center gap-2">
              <p className="text-xs text-gray-500">
                {formatFileSize(file.size)}
              </p>
              {parseResult?.success && (
                <span className="text-xs text-green-600 font-medium">
                  ✓ {parseResult.data?.length || 0} records
                </span>
              )}
              {hasParseErrors && (
                <span className="text-xs text-red-600 font-medium">
                  {parseResult.errors?.length} error(s)
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {hasError && <AlertCircle className="w-5 h-5 text-red-500" />}
          {hasParseErrors && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowErrors(!showErrors)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              {showErrors ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
              Details
            </Button>
          )}
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

      {/* Error details section */}
      {hasParseErrors && showErrors && (
        <div className="border-t border-red-200 bg-red-50 p-4 rounded-b-lg">
          <h4 className="text-sm font-semibold text-red-800 mb-3">
            Validation Errors
          </h4>
          <ScrollArea>
            <div className="space-y-2 max-h-60">
              {parseResult.errors?.map((error, index) => (
                <div
                  key={index}
                  className="bg-white rounded border border-red-200 p-3"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-800">
                        {error.field}
                      </p>
                      <p className="text-sm text-red-600 mt-1">
                        {error.message}
                      </p>
                      {error.value !== undefined && error.value !== null && (
                        <p className="text-xs text-gray-600 mt-1 bg-gray-100 px-2 py-1 rounded font-mono">
                          Value:{" "}
                          {typeof error.value === "object"
                            ? JSON.stringify(error.value)
                            : String(error.value)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      {/* Success summary */}
      {parseResult?.success &&
        parseResult.data &&
        parseResult.data.length > 0 && (
          <div className="border-t border-green-200 bg-green-50 px-4 py-2 rounded-b-lg">
            <p className="text-xs text-green-700 font-medium">
              Successfully parsed {parseResult.data.length} student record(s)
            </p>
          </div>
        )}
    </div>
  );
};
