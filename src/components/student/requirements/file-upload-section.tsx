import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Plus, X, FileText, AlertCircle } from "lucide-react";
import {
  SUPPORTED_FILE_TYPES,
  MAX_FILE_SIZE,
  ACCEPTED_FILE_EXTENSIONS,
} from "@/constants/student/submission.constants";
import type { StudentRequirementWithSubmission } from "@/services/student/requirements/types";
import { formatFileSize } from "@/utils/common.utils";

interface FileUploadSectionProps {
  requirement: StudentRequirementWithSubmission;
  onSubmit?: (file: File, scheduleId: string) => Promise<void>;
  onClose?: () => void;
}

const FileUploadSection = ({
  requirement,
  onSubmit,
  onClose,
}: FileUploadSectionProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supportedTypes = Object.keys(SUPPORTED_FILE_TYPES);

  const isFileSupported = useCallback(
    (fileType: string): boolean => {
      return supportedTypes.includes(fileType);
    },
    [supportedTypes]
  );

  const validateFile = useCallback(
    (file: File): string | null => {
      if (!isFileSupported(file.type)) {
        return `File type not supported. Please upload PDF, JPG, PNG, or WebP files.`;
      }
      if (file.size > MAX_FILE_SIZE) {
        return `File size too large. Maximum size is 10MB.`;
      }
      return null;
    },
    [isFileSupported]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const processFile = useCallback(
    (file: File) => {
      setError(null);
      const validationError = validateFile(file);

      if (validationError) {
        setError(validationError);
        return;
      }

      setSelectedFile(file);
    },
    [validateFile]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        processFile(files[0]);
      }
    },
    [processFile]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        processFile(files[0]);
      }
      e.target.value = "";
    },
    [processFile]
  );

  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null);
    setError(null);
  }, []);

  const handleSubmit = async () => {
    if (!selectedFile || !onSubmit) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await onSubmit(selectedFile, requirement.scheduleId);
      setSelectedFile(null);
      onClose?.();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while submitting"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const isOverdue = new Date(requirement.submissionDeadline) < new Date();

  return (
    <Card className="shadow-none border border-gray-200">
      <CardContent className="space-y-3 p-4">
        <h4 className="font-medium text-black text-sm">Submit Certificate</h4>

        {isOverdue ? (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-center">
            <AlertCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
            <p className="text-red-800 font-medium text-xs">
              Submission deadline has passed
            </p>
            <p className="text-red-600 text-xs">
              The deadline was{" "}
              {new Date(requirement.submissionDeadline).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <>
            {/* File Upload Area */}
            <div className="bg-white rounded-lg border-2 border-dashed border-gray-200 hover:border-blue-400 transition-colors duration-200">
              <div
                className={`relative text-center rounded-lg p-4 transition-colors duration-200 ${
                  dragActive ? "bg-blue-50 border-blue-200" : "bg-gray-50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {/* Upload icon */}
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Upload className="h-5 w-5 text-blue-600" />
                </div>

                {/* Content */}
                <h4 className="text-sm font-medium text-black mb-2">
                  Upload Certificate File
                </h4>
                <p className="text-gray-600 mb-3 max-w-md mx-auto text-xs">
                  Drag and drop your certificate here, or click to browse.
                </p>

                {/* File input */}
                <input
                  type="file"
                  accept={ACCEPTED_FILE_EXTENSIONS}
                  onChange={handleFileSelect}
                  className="hidden"
                  id="certificate-upload"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="certificate-upload"
                  className={`inline-flex items-center px-3 py-2 text-xs font-medium rounded-lg transition-colors duration-200 cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 ${
                    isSubmitting
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  <Plus className="mr-2 h-3 w-3" />
                  Choose File
                </label>

                <p className="text-xs text-gray-500 mt-2">
                  Supported formats: PDF, JPG, PNG, WebP (Max 10MB)
                </p>

                {/* Selected File Preview */}
                {selectedFile && (
                  <div className="mt-3 p-2 bg-white border border-gray-300 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-blue-100 rounded-lg">
                          <FileText className="h-3 w-3 text-blue-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-xs text-black">
                            {selectedFile.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(selectedFile.size)} •{" "}
                            {selectedFile.type}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveFile}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 h-6 w-6 p-0"
                        disabled={isSubmitting}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-1.5">
                      <AlertCircle className="h-3 w-3 text-red-600" />
                      <p className="text-xs text-red-700">{error}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Guidelines */}
            <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
              <h4 className="font-medium text-black mb-1 text-xs">
                Upload Guidelines:
              </h4>
              <ul className="text-xs text-gray-700 space-y-0.5">
                <li>
                  • Ensure the certificate is clearly visible and readable
                </li>
                <li>• File should be in PDF format or high-quality image</li>
                <li>• Make sure all text and details are legible</li>
                <li>• Certificate should show your full name as registered</li>
              </ul>
            </div>

            {/* Submit Button */}
            {selectedFile && (
              <div className="flex justify-end gap-2 pt-2 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={handleRemoveFile}
                  disabled={isSubmitting}
                  size="sm"
                  className="h-7 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 h-7 text-xs"
                  size="sm"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Upload className="h-3 w-3 mr-2" />
                      Submit Certificate
                    </>
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUploadSection;
