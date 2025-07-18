import React, { useState, useCallback } from "react";
import { Upload, Plus, Info } from "lucide-react";
import { RequiredColumnsDialog } from "./required-columns-dialog";
import { FilePreview } from "./file-preview";
import type { FileUploadProps } from "@/types/staff/data-import.types";
import { isFileSupported } from "@/utils/staff/data-import.utils";

export const FileUpload: React.FC<FileUploadProps> = ({
  onFilesSelected,
  filesWithErrors = [],
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const processFiles = useCallback(
    (files: File[]) => {
      const supportedFiles = files.filter((file) => {
        const isSupported = isFileSupported(file.type);
        const isDuplicate = selectedFiles.some((f) => f.name === file.name);
        return isSupported && !isDuplicate;
      });

      const updatedFiles = [...selectedFiles, ...supportedFiles];
      setSelectedFiles(updatedFiles);
      onFilesSelected(updatedFiles);
    },
    [selectedFiles, onFilesSelected]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const files = Array.from(e.dataTransfer.files);
      processFiles(files);
    },
    [processFiles]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      processFiles(files);
      // Reset input value to allow selecting the same file again
      e.target.value = "";
    },
    [processFiles]
  );

  const handleRemoveFile = useCallback(
    (file: File) => {
      const updatedFiles = selectedFiles.filter((f) => f !== file);
      setSelectedFiles(updatedFiles);
      onFilesSelected(updatedFiles);
    },
    [selectedFiles, onFilesSelected]
  );

  return (
    <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-400 transition-colors duration-200">
      <div className="p-2 md:p-6 lg:p-8">
        <div
          className={`relative text-center rounded-xl p-8 transition-colors duration-200  ${
            dragActive ? "bg-blue-50 border-blue-200" : "bg-gray-50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {/* Info button */}
          <div className="absolute top-4 right-4">
            <RequiredColumnsDialog>
              <button
                type="button"
                className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="View required columns"
              >
                <Info className="w-5 h-5 text-blue-600" />
              </button>
            </RequiredColumnsDialog>
          </div>

          {/* Upload icon */}
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Upload className="h-8 w-8 text-blue-600" />
          </div>

          {/* Content */}
          <h3 className="text-xl font-medium text-blue-900 mb-2">
            Upload Student Data File
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm">
            Drag and drop your data file here, or click to browse.
          </p>

          {/* File input */}
          <input
            type="file"
            multiple
            accept=".csv,.xls,.xlsx"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200 cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
          >
            <Plus className="mr-2 h-4 w-4" />
            Choose File
          </label>

          <p className="text-sm text-gray-500 mt-4">
            Supported formats: .csv, .xls, .xlsx
          </p>

          {/* File previews */}
          {selectedFiles.length > 0 && (
            <div className="mt-6 space-y-2">
              {selectedFiles.map((file) => (
                <FilePreview
                  key={`${file.name}-${file.size}-${file.lastModified}`}
                  file={file}
                  onRemove={handleRemoveFile}
                  hasError={filesWithErrors.includes(file.name)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
