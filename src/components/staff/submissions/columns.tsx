import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  IdCard,
  User,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Calendar,
  Mail,
  GraduationCap,
  File,
  HardDrive,
  FileType,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchFilterColumn } from "@/components/ui/data-table/search-filter-column";
import { FacetedFilterColumn } from "@/components/ui/data-table/faceted-filter-column";
import { SortFilterColumn } from "@/components/ui/data-table/sort-filter-column";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { StudentSubmissionItem } from "@/services/staff/submissions/types";
import { formatDate } from "@/utils/common.utils";
import { getConfidenceColor } from "@/utils/staff/submission.utils";

// Helper functions for truncating filenames
const truncateFilename = (filename: string, maxLength: number = 25): string => {
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

const formatFileSize = (bytes: number | null): string => {
  if (!bytes) return "N/A";
  const sizes = ["B", "KB", "MB", "GB"];
  let i = 0;
  let size = bytes;
  while (size >= 1024 && i < sizes.length - 1) {
    size /= 1024;
    i++;
  }
  return `${size.toFixed(1)} ${sizes[i]}`;
};

// Status badge configurations
const getSubmissionStatusBadge = (status: string | null) => {
  if (!status) {
    return {
      label: "Not Submitted",
      className: "bg-gray-100 text-gray-700",
      icon: Clock,
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

const getSubmissionTimingBadge = (timing: string | null) => {
  if (!timing) {
    return {
      label: "N/A",
      className: "bg-gray-100 text-gray-700",
      icon: Clock,
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

const getEnrollmentStatusBadge = (status: string) => {
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

// Filter options
const SUBMISSION_STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "manual_review", label: "Manual Review" },
];

const SUBMISSION_TIMING_OPTIONS = [
  { value: "on_time", label: "On Time" },
  { value: "late", label: "Late" },
  { value: "overdue", label: "Overdue" },
];

export const columns: ColumnDef<StudentSubmissionItem>[] = [
  {
    accessorKey: "studentId",
    header: ({ column }) => (
      <SearchFilterColumn
        column={column}
        placeholder="Search by student ID..."
        trigger={
          <>
            <IdCard className="h-4 w-4 text-gray-600 group-hover/header:text-blue-600 transition-colors duration-200" />
            <span className="font-medium text-gray-700 group-hover/header:text-blue-700 transition-colors duration-200">
              Student ID
            </span>
          </>
        }
      />
    ),
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <div className="text-sm font-mono bg-blue-50 text-blue-800 px-2.5 py-1 rounded-lg border border-blue-200">
          {row.getValue("studentId")}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "studentName",
    header: ({ column }) => (
      <SearchFilterColumn
        column={column}
        placeholder="Search by name..."
        trigger={
          <>
            <User className="h-4 w-4 text-gray-600 group-hover/header:text-blue-600 transition-colors duration-200" />
            <span className="font-medium text-gray-700 group-hover/header:text-blue-700 transition-colors duration-200">
              Student Name
            </span>
          </>
        }
      />
    ),
    cell: ({ row }) => {
      const studentName = row.getValue("studentName") as string;
      const studentEmail = row.original.studentEmail;
      const enrollmentStatus = row.original.studentEnrollmentStatus;

      return (
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center space-x-2 group/underline cursor-pointer">
              <div className="relative">
                <span className="text-gray-800 font-medium transition-colors">
                  {studentName}
                </span>
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 ease-out group-hover/underline:w-full" />
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="start">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">Email:</span>
                <span className="text-sm font-medium text-gray-900">
                  {studentEmail}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">Status:</span>
                <Badge
                  className={cn(
                    "text-xs font-medium",
                    getEnrollmentStatusBadge(enrollmentStatus)
                  )}
                >
                  {enrollmentStatus}
                </Badge>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      );
    },
  },
  {
    accessorKey: "filename",
    header: () => (
      <div className="bg-gray-50/80 rounded-lg p-2 flex items-center space-x-2">
        <FileText className="h-4 w-4 text-gray-600" />
        <span className="font-medium text-gray-700">File Name</span>
      </div>
    ),
    cell: ({ row }) => {
      const filename = row.original.filename;
      const submissionId = row.original.submissionId;
      const fileSize = row.original.fileSize;
      const mimeType = row.original.mimeType;

      if (!filename) {
        return (
          <div className="text-sm text-gray-400 italic">No file submitted</div>
        );
      }

      return (
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center space-x-2 group/underline cursor-pointer">
              <div className="relative">
                <span className="text-gray-800 font-medium text-sm">
                  {truncateFilename(filename)}
                </span>
                <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-blue-400 transition-all duration-300 ease-out group-hover/underline:w-full" />
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-4" align="start">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">Submission ID:</span>
                <span className="text-sm font-mono text-gray-900">
                  {submissionId || "N/A"}
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <File className="h-4 w-4 text-gray-600 mt-0.5" />
                <div className="flex-1">
                  <span className="text-sm text-gray-700">File Name:</span>
                  <p className="text-sm font-medium text-gray-900 break-all">
                    {filename}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <HardDrive className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">File Size:</span>
                <span className="text-sm font-medium text-gray-900">
                  {formatFileSize(fileSize ?? 0)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FileType className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">MIME Type:</span>
                <span className="text-sm font-medium text-gray-900">
                  {mimeType || "Unknown"}
                </span>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      );
    },
  },
  {
    accessorKey: "submissionStatus",
    header: ({ column }) => (
      <FacetedFilterColumn
        column={column}
        searchPlaceholder="Search status..."
        options={SUBMISSION_STATUS_OPTIONS}
        trigger={
          <>
            <CheckCircle className="h-4 w-4 text-gray-600 group-hover/header:text-blue-600 transition-colors duration-200" />
            <span className="font-medium text-gray-700 group-hover/header:text-blue-700 transition-colors duration-200">
              Status
            </span>
          </>
        }
      />
    ),
    cell: ({ row }) => {
      const status = row.original.submissionStatus;
      const statusConfig = getSubmissionStatusBadge(status ?? null);
      const Icon = statusConfig.icon;

      return (
        <div className="flex items-center space-x-2">
          <Badge
            className={cn(
              "text-xs font-medium border-0",
              statusConfig.className
            )}
          >
            <Icon className="h-3 w-3 mr-1" />
            {statusConfig.label}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const status = row.getValue(id);
      if (!status && value.includes("not_submitted")) return true;
      return Array.isArray(value) && value.includes(status);
    },
  },
  {
    accessorKey: "agentConfidenceScore",
    header: ({ column }) => (
      <SortFilterColumn column={column} title="AI Confidence" />
    ),
    cell: ({ row }) => {
      const confidenceScore = row.original.agentConfidenceScore ?? 0;
      const percentage = Math.round(confidenceScore * 100);

      return (
        <div className="flex items-center space-x-3 min-w-[120px]">
          <Progress value={percentage} className="h-2 bg-gray-200 flex-1" />
          <span
            className={cn(
              "text-xs font-medium min-w-[35px] text-right",
              confidenceScore > 0
                ? getConfidenceColor(confidenceScore)
                : "text-gray-400"
            )}
          >
            {percentage}%
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "submissionTiming",
    header: ({ column }) => (
      <FacetedFilterColumn
        column={column}
        searchPlaceholder="Search timing..."
        options={SUBMISSION_TIMING_OPTIONS}
        trigger={
          <>
            <Clock className="h-4 w-4 text-gray-600 group-hover/header:text-blue-600 transition-colors duration-200" />
            <span className="font-medium text-gray-700 group-hover/header:text-blue-700 transition-colors duration-200">
              Timing
            </span>
          </>
        }
      />
    ),
    cell: ({ row }) => {
      const timing = row.original.submissionTiming;
      const timingConfig = getSubmissionTimingBadge(timing ?? null);
      const Icon = timingConfig.icon;

      return (
        <div className="flex items-center space-x-2">
          <Badge
            className={cn(
              "text-xs font-medium border-0",
              timingConfig.className
            )}
          >
            <Icon className="h-3 w-3 mr-1" />
            {timingConfig.label}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const timing = row.getValue(id);
      return Array.isArray(value) && value.includes(timing);
    },
  },
  {
    accessorKey: "submittedAt",
    header: () => (
      <div className="bg-gray-50/80 rounded-lg p-2 flex items-center space-x-2">
        <Calendar className="h-4 w-4 text-gray-600" />
        <span className="font-medium text-gray-700">Submitted At</span>
      </div>
    ),
    cell: ({ row }) => {
      const submittedAt = row.original.submittedAt;

      if (!submittedAt) {
        return (
          <div className="text-sm text-gray-400 italic">Not submitted</div>
        );
      }

      return (
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-800 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-200">
            {formatDate(submittedAt, {})}
          </div>
        </div>
      );
    },
  },
];
