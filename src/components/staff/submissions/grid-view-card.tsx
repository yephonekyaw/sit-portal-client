import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SUBMISSION_STATUS_CONFIGS } from "@/constants/staff/submission.constants";
import type { Submission } from "@/types/staff/submission.types";
import { formatDate, formatFileSize } from "@/utils/shared.utils";
import {
  getFileIcon,
  getConfidenceColor,
} from "@/utils/staff/submission.utils";
import { Clock, Bot } from "lucide-react";
import { memo } from "react";

interface GridViewCardProps {
  submission: Submission;
  onViewDetails?: (submission: Submission) => void;
}

const GridViewCard = ({ submission, onViewDetails }: GridViewCardProps) => {
  const statusConfig =
    SUBMISSION_STATUS_CONFIGS[
      submission.status as keyof typeof SUBMISSION_STATUS_CONFIGS
    ];
  const FileIcon = getFileIcon(submission.mime_type);

  const truncateFileName = (fileName: string, max = 18) => {
    const [name, ext] = fileName.split(/\.(?=[^.]+$)/);
    if (!ext)
      return name.length <= max ? fileName : `${name.slice(0, max - 3)}...`;
    return name.length + ext.length + 1 <= max
      ? fileName
      : `${name.slice(0, max - ext.length - 4)}...${ext}`;
  };

  const confidenceScore = submission.agent_confidence_score;

  return (
    <Card
      className="group hover:shadow-md hover:ring-1 hover:ring-blue-400/40 transition-all duration-200 border-slate-200 h-fit cursor-pointer"
      onClick={() => onViewDetails?.(submission)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${submission.student.user.first_name} ${submission.student.user.last_name}'s submission`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onViewDetails?.(submission);
        }
      }}
    >
      <CardContent className="px-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="relative">
              <Avatar className="h-9 w-9 bg-gradient-to-br from-slate-500 to-slate-600 flex-shrink-0">
                <AvatarFallback className="text-white font-semibold text-xs bg-gradient-to-r from-blue-500 to-blue-600">
                  {`${submission.student.user.first_name[0]}${submission.student.user.last_name[0]}`.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-slate-900 truncate leading-tight">
                {submission.student.user.first_name}{" "}
                {submission.student.user.last_name}
              </p>
              <p className="text-xs text-slate-500 font-medium">
                {submission.student.roll_number}
              </p>
            </div>
          </div>

          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 flex-shrink-0 rounded-full hover:bg-slate-100 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-3.5 w-3.5 text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuItem onClick={() => onViewDetails?.(submission)}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Download
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>

        {/* Status and Certificate Badges */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Badge
            className={`${statusConfig.color} text-xs px-2.5 py-1 font-medium`}
          >
            <statusConfig.icon
              className={`h-3 w-3 mr-1.5 ${statusConfig.iconColor}`}
            />
            {statusConfig.label}
          </Badge>
          <Badge
            variant="outline"
            className="text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200 hover:bg-blue-100 transition-colors"
          >
            {submission.certificate_type.code}
          </Badge>
        </div>

        <div className="flex items-center justify-between gap-2">
          {/* File Information */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-slate-100 rounded-md">
                <FileIcon className="h-3.5 w-3.5 text-slate-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-700 truncate">
                  {truncateFileName(submission.file_name)}
                </p>
                <p className="text-xs text-slate-500">
                  {formatFileSize(submission.file_size)}
                </p>
              </div>
            </div>
          </div>

          {/* Submission Date */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Clock className="h-3 w-3" />
            <span>{formatDate(submission.submitted_at, {})}</span>
          </div>
        </div>

        {/* AI Confidence Score */}
        {confidenceScore && (
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Bot className="h-3 w-3 text-purple-500" />
                <span className="text-xs text-slate-600 font-medium">
                  AI Score
                </span>
              </div>
              <span
                className={`text-xs font-medium ${getConfidenceColor(
                  confidenceScore
                )}`}
              >
                {(confidenceScore * 100).toFixed(0)}%
              </span>
            </div>
            <div className="relative">
              <Progress
                value={confidenceScore * 100}
                className="h-1 bg-slate-200"
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default memo(GridViewCard);
