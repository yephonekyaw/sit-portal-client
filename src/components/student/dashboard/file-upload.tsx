import type React from "react";

import { useState } from "react";
import { Upload, Plus } from "lucide-react";

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
}

export default function FileUpload({ onFilesSelected }: FileUploadProps) {
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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles(files);
    onFilesSelected(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
    onFilesSelected(files);
  };

  return (
    <div className="mb-8">
      <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors duration-200">
        <div className="p-8">
          <div
            className={`text-center rounded-xl p-8 transition-colors duration-200 ${
              dragActive
                ? "bg-blue-50 border-blue-200"
                : "hover:bg-gray-50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Upload className="h-8 w-8 text-blue-600" />
            </div>

            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Upload Your Certificate
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Drag and drop your certificate files here, or click to browse.
            </p>

            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200 cursor-pointer"
            >
              <Plus className="mr-2 h-4 w-4" />
              Choose Files
            </label>

            <p className="text-sm text-gray-500 mt-4">
              Supported formats: PDF, JPG, PNG • Max size: 10MB per file
            </p>

            {selectedFiles.length > 0 && (
              <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-sm font-medium text-blue-800">
                  {selectedFiles.length} file(s) selected for upload
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
