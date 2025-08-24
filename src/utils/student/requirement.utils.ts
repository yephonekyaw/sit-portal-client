import {
  CheckCircle2,
  XCircle,
  Eye,
  Clock,
  AlertCircle,
  FileText,
} from "lucide-react";
import type { StudentRequirementWithSubmission } from "@/services/student/requirements/types";
import { DEFAULT_TEXT_TRUNCATE_LENGTH } from "@/constants/student/requirement.constants";

/**
 * Get initials from a name string
 */
export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

/**
 * Truncate text to a specified length with ellipsis
 */
export const truncateText = (
  text: string,
  maxLength: number = DEFAULT_TEXT_TRUNCATE_LENGTH
): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

/**
 * Check if a requirement is overdue
 */
export const isRequirementOverdue = (deadline: string): boolean => {
  return new Date(deadline) < new Date();
};

/**
 * Check if a requirement has been submitted
 */
export const isRequirementSubmitted = (
  requirement: StudentRequirementWithSubmission
): boolean => {
  return !!requirement.submissionId;
};

/**
 * Get status badge configuration for a requirement
 */
export const getRequirementStatusBadge = (
  requirement: StudentRequirementWithSubmission
) => {
  const isSubmitted = isRequirementSubmitted(requirement);
  const isOverdue = isRequirementOverdue(requirement.submissionDeadline);

  if (isSubmitted && requirement.submissionStatus) {
    switch (requirement.submissionStatus) {
      case "approved":
        return {
          label: "Approved",
          icon: CheckCircle2,
          className: "bg-green-100 text-green-700 border-green-200",
        };
      case "rejected":
        return {
          label: "Rejected",
          icon: XCircle,
          className: "bg-red-100 text-red-700 border-red-200",
        };
      case "manual_review":
        return {
          label: "Under Review",
          icon: Eye,
          className: "bg-purple-100 text-purple-700 border-purple-200",
        };
      default:
        return {
          label: "Pending",
          icon: Clock,
          className: "bg-yellow-100 text-yellow-700 border-yellow-200",
        };
    }
  }

  if (isOverdue) {
    return {
      label: "Overdue",
      icon: AlertCircle,
      className: "bg-red-100 text-red-700 border-red-200",
    };
  }

  return {
    label: "Not Submitted",
    icon: FileText,
    className: "bg-orange-100 text-orange-800 border-orange-300",
  };
};

/**
 * Get all status badges for a requirement (including timing badges)
 */
export const getRequirementStatusBadges = (
  requirement: StudentRequirementWithSubmission
) => {
  const badges = [];
  const isSubmitted = isRequirementSubmitted(requirement);

  // Primary status badge
  const primaryBadge = getRequirementStatusBadge(requirement);
  badges.push(primaryBadge);

  // Add timing badge for submitted items
  if (isSubmitted && requirement.submissionTiming === "late") {
    badges.push({
      label: "Late Submission",
      icon: AlertCircle,
      className: "bg-orange-100 text-orange-700 border-orange-200",
    });
  }

  return badges;
};

/**
 * Check if requirement should show approved details
 */
export const shouldShowApprovedDetails = (
  requirement: StudentRequirementWithSubmission
): boolean => {
  return (
    isRequirementSubmitted(requirement) &&
    requirement.submissionStatus === "approved"
  );
};

/**
 * Validate if file type is supported
 */
export const isFileTypeSupported = (
  fileType: string,
  supportedTypes: string[]
): boolean => {
  return supportedTypes.includes(fileType);
};

/**
 * Validate file size
 */
export const isFileSizeValid = (fileSize: number, maxSize: number): boolean => {
  return fileSize <= maxSize;
};

/**
 * Validate file for upload
 */
export const validateFileForUpload = (
  file: File,
  supportedTypes: string[],
  maxSize: number
): string | null => {
  if (!isFileTypeSupported(file.type, supportedTypes)) {
    return "File type not supported. Please upload supported files.";
  }

  if (!isFileSizeValid(file.size, maxSize)) {
    return "File size too large. Maximum size is 10MB.";
  }

  return null;
};
