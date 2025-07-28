import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SUBMISSION_STATUS_CONFIGS } from "@/constants/staff/submission.constants";
import { formatDate, formatFileSize } from "@/utils/common.utils";
import {
  getFileIcon,
  getConfidenceColor,
} from "@/utils/staff/submission.utils";
import { Clock, Bot, Calendar } from "lucide-react";
import { memo } from "react";
import type {
  ProgramRequirementSchedule,
  CertificateSubmission,
} from "@/types/student/submission.types";

interface SubmittedCertificateCardProps {
  schedule: ProgramRequirementSchedule;
  submission: CertificateSubmission;
  onViewDetails?: (
    schedule: ProgramRequirementSchedule,
    submission: CertificateSubmission
  ) => void;
}

const SubmittedCertificateCard = ({
  schedule,
  submission,
  onViewDetails,
}: SubmittedCertificateCardProps) => {
  const statusConfig =
    SUBMISSION_STATUS_CONFIGS[
      submission.status.toLowerCase() as keyof typeof SUBMISSION_STATUS_CONFIGS
    ];
  const FileIcon = getFileIcon(submission.mime_type);

  const truncateFileName = (fileName: string, max = 20) => {
    const [name, ext] = fileName.split(/\.(?=[^.]+$)/);
    if (!ext)
      return name.length <= max ? fileName : `${name.slice(0, max - 3)}...`;
    return name.length + ext.length + 1 <= max
      ? fileName
      : `${name.slice(0, max - ext.length - 4)}...${ext}`;
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const confidenceScore = submission.agent_confidence_score;

  return (
    <Card
      className="group hover:shadow-md hover:ring-1 hover:ring-blue-400/40 transition-all duration-200 border-slate-200 h-full cursor-pointer"
      onClick={() => onViewDetails?.(schedule, submission)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${schedule.program_requirement.name}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onViewDetails?.(schedule, submission);
        }
      }}
    >
      <CardContent className="px-5 py-4 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="relative">
              <Avatar className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 flex-shrink-0">
                <AvatarFallback className="text-white font-semibold text-sm bg-gradient-to-r from-blue-500 to-blue-600">
                  {getInitials(
                    schedule.program_requirement.certificate_type.name
                  )}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900 truncate leading-tight">
                {schedule.program_requirement.name}
              </p>
              <p className="text-sm text-slate-500 font-medium">
                {schedule.program_requirement.certificate_type.code} •{" "}
                {schedule.program_requirement.program.program_code}
              </p>
            </div>
          </div>
        </div>

        {/* Status and Certificate Badges */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Badge
            className={`${
              statusConfig?.color || "bg-gray-100 text-gray-700"
            } text-xs px-2.5 py-1 font-medium`}
          >
            {statusConfig?.icon && (
              <statusConfig.icon
                className={`h-3 w-3 mr-1.5 ${statusConfig?.iconColor}`}
              />
            )}
            {statusConfig?.label || submission.status}
          </Badge>

          <div className="flex items-center gap-1">
            {schedule.program_requirement.is_mandatory && (
              <Badge
                variant="outline"
                className="text-xs px-2.5 py-1 font-medium bg-yellow-50 text-yellow-700 border-yellow-200"
              >
                Required
              </Badge>
            )}
            <Badge
              variant="outline"
              className="text-xs px-2.5 py-1 font-medium bg-blue-50 text-blue-700 border-blue-200"
            >
              {schedule.academic_year.year_code}
            </Badge>
          </div>
        </div>

        {/* File Information and Submission Date */}
        <div className="space-y-3 pt-1 border-t border-slate-100">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div className="p-1.5 bg-slate-100 rounded-md">
                <FileIcon className="h-4 w-4 text-slate-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-700 truncate">
                  {truncateFileName(submission.file_name)}
                </p>
                <p className="text-sm text-slate-500">
                  {formatFileSize(submission.file_size)}
                </p>
              </div>
            </div>

            {/* Submission Date */}
            <div className="flex items-center gap-1.5 text-sm text-slate-500 flex-shrink-0">
              <Clock className="h-3 w-3" />
              <span>{formatDate(submission.submitted_at, {})}</span>
            </div>
          </div>

          {/* Deadline Information */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500 font-medium">Deadline</span>
            <div className="flex items-center gap-1.5 text-sm text-slate-500">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(schedule.submission_deadline, {})}</span>
            </div>
          </div>
        </div>

        {/* AI Confidence Score */}
        {confidenceScore && (
          <div className="space-y-2 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Bot className="h-4 w-4 text-purple-500" />
                <span className="text-sm text-slate-600 font-medium">
                  AI Confidence
                </span>
              </div>
              <span
                className={`text-sm font-medium ${getConfidenceColor(
                  confidenceScore
                )}`}
              >
                {(confidenceScore * 100).toFixed(0)}%
              </span>
            </div>
            <div className="relative">
              <Progress
                value={confidenceScore * 100}
                className="h-1.5 bg-slate-200"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default memo(SubmittedCertificateCard);
