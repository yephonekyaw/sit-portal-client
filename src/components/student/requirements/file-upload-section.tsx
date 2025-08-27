import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Plus, X, FileText, AlertCircle, ArrowLeft } from "lucide-react";
import {
  SUPPORTED_FILE_TYPES,
  MAX_FILE_SIZE,
  SUPPORTED_FILE_EXTENSIONS,
  UPLOAD_GUIDELINES,
} from "@/constants/student/requirement.constants";
import type { FileUploadSectionProps } from "@/types/student/requirement.types";
import { formatFileSize } from "@/utils/common.utils";
import {
  isRequirementOverdue,
  validateFileForUpload,
} from "@/utils/student/requirement.utils";
import { usePostSubmitRequirement } from "@/services/student/requirements/mutations";

const FileUploadSection = ({ requirement, isEditMode = false, onBack }: FileUploadSectionProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync: submitRequirement, isPending: isSubmitting } =
    usePostSubmitRequirement();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;

    const file = files[0];
    setError(null);

    const validationError = validateFileForUpload(
      file,
      SUPPORTED_FILE_TYPES,
      MAX_FILE_SIZE
    );
    if (validationError) {
      setError(validationError);
      return;
    }

    setSelectedFile(file);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length === 0) return;

      const file = files[0];
      setError(null);

      const validationError = validateFileForUpload(
        file,
        SUPPORTED_FILE_TYPES,
        MAX_FILE_SIZE
      );
      if (validationError) {
        setError(validationError);
        return;
      }

      setSelectedFile(file);
      e.target.value = "";
    },
    []
  );

  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null);
    setError(null);
  }, []);

  const handleSubmit = async () => {
    if (!selectedFile) return;

    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("scheduleId", requirement.scheduleId);
      formData.append("requirementId", requirement.requirementId);
      formData.append("certTypeId", requirement.certTypeId);
      formData.append("programId", requirement.programId);
      if (requirement.submissionId) {
        formData.append("submissionId", requirement.submissionId);
      }

      await submitRequirement(formData);
      setSelectedFile(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while submitting"
      );
    }
  };

  const isOverdue = isRequirementOverdue(requirement.submissionDeadline);

  return (
    <Card className="shadow-none border border-blue-100">
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          {isEditMode && onBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="h-8 w-8 p-0 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <h4 className="font-medium text-slate-900">
            {isEditMode ? "Update Certificate" : "Submit Certificate"}
          </h4>
        </div>

        {isOverdue ? (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
            <AlertCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-blue-800 font-medium text-sm">
              Submission deadline has passed
            </p>
            <p className="text-blue-600 text-xs">
              The deadline was{" "}
              {new Date(requirement.submissionDeadline).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <>
            {/* File Upload Area */}
            <div className="bg-white rounded-lg border-2 border-dashed border-gray-200 hover:border-blue-400 transition-colors duration-200">
              <div
                className={`relative text-center rounded-lg p-6 transition-colors duration-200 ${
                  dragActive ? "bg-blue-50 border-blue-200" : "bg-gray-50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {/* Upload icon */}
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Upload className="h-6 w-6 text-blue-600" />
                </div>

                {/* Content */}
                <h4 className="text-base font-medium text-blue-900 mb-2">
                  {isEditMode ? "Replace Certificate File" : "Upload Certificate File"}
                </h4>
                <p className="text-gray-600 mb-4 max-w-md mx-auto text-xs">
                  {isEditMode 
                    ? "Drag and drop a new certificate to replace the current one, or click to browse."
                    : "Drag and drop your certificate here, or click to browse."
                  }
                </p>

                {/* File input */}
                <input
                  type="file"
                  accept={SUPPORTED_FILE_EXTENSIONS}
                  onChange={handleFileSelect}
                  className="hidden"
                  id="certificate-upload"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="certificate-upload"
                  className={`inline-flex items-center px-4 py-2 font-medium rounded-lg transition-colors duration-200 cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 ${
                    isSubmitting
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {isEditMode ? "Choose New File" : "Choose File"}
                </label>

                <p className="text-sm text-gray-500 mt-3">
                  Supported formats: PDF, JPG, JPEG, PNG, WebP (Max 10MB)
                </p>

                {/* Selected File Preview */}
                {selectedFile && (
                  <div className="mt-4 p-3 bg-white border border-blue-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FileText className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-sm">
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
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        disabled={isSubmitting}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Guidelines */}
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
              <h4 className="font-medium text-blue-900 mb-2 text-sm">
                Upload Guidelines:
              </h4>
              <ul className="text-xs font-medium text-blue-800 space-y-1">
                {UPLOAD_GUIDELINES.map((guideline, index) => (
                  <li key={index}>• {guideline}</li>
                ))}
              </ul>
            </div>

            {/* Submit Button */}
            {selectedFile && (
              <div className="flex justify-end gap-2 border-gray-200">
                <Button
                  variant="outline"
                  onClick={handleRemoveFile}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      {isEditMode ? "Updating..." : "Submitting..."}
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      {isEditMode ? "Update Certificate" : "Submit Certificate"}
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
