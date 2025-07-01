import type React from "react";
import { useState } from "react";
import { Upload, Plus, Info } from "lucide-react";
import { RequiredColumnsDialog } from "./required-columns-dialog";
import { FilePreview } from "./file-preview";

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  filesWithErrors?: string[];
}

const SUPPORTED_FILE_TYPES = [
  "text/csv",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];

export default function FileUpload({
  onFilesSelected,
  filesWithErrors = [],
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFiles = (files: File[]) => {
    const supported: File[] = [...selectedFiles];
    files.forEach((file) => {
      if (
        SUPPORTED_FILE_TYPES.includes(file.type) &&
        !supported.find((f) => f.name === file.name)
      ) {
        supported.push(file);
      }
    });
    setSelectedFiles(supported);
    onFilesSelected(supported);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
  };

  const handleRemoveFile = (file: File) => {
    const updatedFiles = selectedFiles.filter((f) => f !== file);
    setSelectedFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-400 transition-colors duration-200">
      <div className="p-2 md:p-6 lg:p-8">
        <div
          className={`relative text-center rounded-xl p-8 transition-colors duration-200 ${
            dragActive ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Upload className="h-8 w-8 text-blue-600" />
          </div>

          <h3 className="text-xl font-medium text-blue-900 mb-2">
            Upload Student Data File
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm">
            Drag and drop your data file here, or click to browse.
          </p>

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
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200 cursor-pointer"
          >
            <Plus className="mr-2 h-4 w-4" />
            Choose File
          </label>

          <p className="text-sm text-gray-500 mt-4">
            Supported formats: .csv, .xls, .xlsx
          </p>

          {selectedFiles.length > 0 && (
            <div className="mt-6 space-y-2">
              {selectedFiles.map((file) => (
                <FilePreview
                  key={file.name}
                  file={file}
                  onRemove={handleRemoveFile}
                  hasError={filesWithErrors.includes(file.name)}
                />
              ))}
            </div>
          )}
          <div className="absolute top-4 right-4">
            <RequiredColumnsDialog>
              <div className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors duration-200 cursor-pointer">
                <Info className="w-5 h-5 text-blue-600" />
              </div>
            </RequiredColumnsDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
