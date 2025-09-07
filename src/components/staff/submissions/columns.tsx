import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  IdCard,
  User,
  FileText,
  CheckCircle,
  Clock,
  Calendar,
  Mail,
  HardDrive,
  FileType,
  File,
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
import { formatDate, formatFileSize } from "@/utils/common.utils";
import {
  getConfidenceColor,
  truncateFilename,
  getSubmissionStatusBadge,
  getSubmissionTimingBadge,
} from "@/utils/staff/submission.utils";
import DragHandle from "@/components/ui/data-table/drag-handle";

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
    id: "drag",
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
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
        <div className="text-sm bg-blue-100 text-blue-800 px-2.5 py-1 rounded-lg">
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

      return (
        <div className="flex items-center space-x-2">
          <span className="text-gray-800 font-medium">{studentName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "studentEmail",
    header: ({ column }) => (
      <SearchFilterColumn
        column={column}
        placeholder="Search by email..."
        trigger={
          <>
            <Mail className="h-4 w-4 text-gray-600 group-hover/header:text-blue-600 transition-colors duration-200" />
            <span className="font-medium text-gray-700 group-hover/header:text-blue-700 transition-colors duration-200">
              Email
            </span>
          </>
        }
      />
    ),
    cell: ({ row }) => {
      const studentEmail = row.getValue("studentEmail") as string;

      return (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-800">{studentEmail}</span>
        </div>
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
        <div className="flex items-center min-w-[120px]">
          <Progress value={percentage} className="h-1.5 bg-gray-200 flex-1" />
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
