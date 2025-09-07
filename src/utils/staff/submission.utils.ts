import {
  FileText,
  ImageIcon,
  File,
  CheckCircle,
  XCircle,
  Clock,
  User,
  type LucideIcon,
} from "lucide-react";

export const getFileIcon = (mimeType: string): LucideIcon => {
  if (mimeType.startsWith("image/")) return ImageIcon;
  if (mimeType === "application/pdf") return FileText;
  return File;
};

export const getConfidenceColor = (score: number) => {
  if (score >= 0.8) return "text-green-600";
  if (score >= 0.6) return "text-yellow-600";
  return "text-red-600";
};

// Helper function for truncating filenames
export const truncateFilename = (
  filename: string,
  maxLength: number = 25
): string => {
  if (!filename || filename.length <= maxLength) return filename;

  const lastDotIndex = filename.lastIndexOf(".");
  if (lastDotIndex === -1) {
    return filename.substring(0, maxLength - 3) + "...";
  }

  const extension = filename.substring(lastDotIndex);
  const nameWithoutExt = filename.substring(0, lastDotIndex);
  const availableLength = maxLength - extension.length - 3; // 3 for "..."

  if (availableLength <= 0) {
    return "..." + extension;
  }

  return nameWithoutExt.substring(0, availableLength) + "..." + extension;
};

// Status badge configurations
export const getSubmissionStatusBadge = (status: string | null) => {
  if (!status) {
    return {
      label: "Not Submitted",
      className: "bg-gray-100 text-gray-700",
      icon: XCircle,
    };
  }

  switch (status) {
    case "pending":
      return {
        label: "Pending",
        className: "bg-yellow-100 text-yellow-700",
        icon: Clock,
      };
    case "approved":
      return {
        label: "Approved",
        className: "bg-green-100 text-green-700",
        icon: CheckCircle,
      };
    case "rejected":
      return {
        label: "Rejected",
        className: "bg-red-100 text-red-700",
        icon: XCircle,
      };
    case "manual_review":
      return {
        label: "Manual Review",
        className: "bg-orange-100 text-orange-700",
        icon: User,
      };
    default:
      return {
        label: status,
        className: "bg-gray-100 text-gray-700",
        icon: Clock,
      };
  }
};

export const getSubmissionTimingBadge = (timing: string | null) => {
  if (!timing) {
    return {
      label: "N/A",
      className: "bg-gray-100 text-gray-700",
      icon: XCircle,
    };
  }

  switch (timing) {
    case "on_time":
      return {
        label: "On Time",
        className: "bg-green-100 text-green-700",
        icon: CheckCircle,
      };
    case "late":
      return {
        label: "Late",
        className: "bg-yellow-100 text-yellow-700",
        icon: Clock,
      };
    case "overdue":
      return {
        label: "Overdue",
        className: "bg-red-100 text-red-700",
        icon: XCircle,
      };
    default:
      return {
        label: timing,
        className: "bg-gray-100 text-gray-700",
        icon: Clock,
      };
  }
};

export const getEnrollmentStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-700";
    case "inactive":
      return "bg-gray-100 text-gray-700";
    case "suspended":
      return "bg-red-100 text-red-700";
    case "graduated":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};
