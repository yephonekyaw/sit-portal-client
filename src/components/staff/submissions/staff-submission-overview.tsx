import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatFileSize, getInitialsOneInput } from "@/utils/common.utils";
import { formatDate } from "@/utils/common.utils";
import {
  getConfidenceColor,
  getEnrollmentStatusBadge,
  getSubmissionStatusBadge,
  isSubmissionSubmitted,
} from "@/utils/staff/submission.utils";
import { useSubmissionStore } from "@/stores/staff/submission.stores";
import {
  FileIcon,
  Bot,
  AlertCircle,
  Mail,
  CalendarClock,
  IdCard,
} from "lucide-react";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import type { StudentSubmissionItem } from "@/services/staff/submissions/types";
import CardInfoItem from "../dashboard/card-info-item";
import StaffActionButtons from "./staff-action-buttons";

interface StaffSubmissionOverviewProps {
  submission: StudentSubmissionItem;
}

const StaffSubmissionOverview = ({
  submission,
}: StaffSubmissionOverviewProps) => {
  const { submissionRelatedDetail, selectedSubmission } = useSubmissionStore();
  const navigate = useNavigate();
  const confidenceScore = submission.agentConfidenceScore ?? 0;
  const isSubmitted = isSubmissionSubmitted(submission);
  const statusBadge = getSubmissionStatusBadge(
    selectedSubmission?.submissionStatus ?? null
  );
  const StatusIcon = statusBadge.icon;

  const handleVerifyClick = () => {
    // Check if the submission can be verified
    if (!selectedSubmission || 
        (selectedSubmission.submissionStatus !== "pending" && 
         selectedSubmission.submissionStatus !== "manual_review")) {
      return;
    }
    
    navigate("/staff/submissions/verify");
  };

  const canBeVerified = selectedSubmission && 
    (selectedSubmission.submissionStatus === "pending" || 
     selectedSubmission.submissionStatus === "manual_review");

  return (
    <div className="space-y-3">
      {/* Status Banner */}
      {isSubmitted && (
        <div className={`p-3 rounded-lg border ${statusBadge.className}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <StatusIcon className="h-4 w-4" />
              <p className="font-medium text-base">{statusBadge.label}</p>
            </div>
            {selectedSubmission?.submittedAt && (
              <div className="text-right">
                <p className="text-sm opacity-70">Last Updated</p>
                <p className="font-medium text-sm">
                  {formatDate(selectedSubmission?.submittedAt, {})}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Student Info */}
      <Card className="shadow-none border border-gray-200">
        <CardContent>
          {/* Student Header */}
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="h-10 w-10 bg-blue-500">
              <AvatarFallback className="bg-transparent text-white font-bold text-sm">
                {getInitialsOneInput(submission.studentName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate text-base">
                {submission.studentName}
              </p>
              <div className="flex flex-wrap gap-1 mt-1">
                <Badge className="bg-blue-500 text-white border-0 text-sm">
                  {submission.studentId}
                </Badge>
                <Badge className="bg-blue-500 text-white border-0 text-sm">
                  {submissionRelatedDetail?.programCode || "N/A"}
                </Badge>
                <Badge className="bg-blue-500 text-white border-0 text-sm">
                  {submissionRelatedDetail?.certCode || "N/A"}
                </Badge>
              </div>
            </div>
          </div>

          {/* Student Information Badges */}
          <div className="flex flex-wrap gap-2.5 mt-3">
            <CardInfoItem
              icon={IdCard}
              label="Enrollment"
              value={
                submission.studentEnrollmentStatus[0].toUpperCase() +
                submission.studentEnrollmentStatus.slice(1)
              }
              className={getEnrollmentStatusBadge(
                submission.studentEnrollmentStatus
              )}
            />
            {submissionRelatedDetail && (
              <>
                <CardInfoItem
                  icon={CalendarClock}
                  label="Due At"
                  value={formatDate(
                    submissionRelatedDetail.submissionDeadline,
                    {}
                  )}
                  className="bg-red-100 text-red-700"
                />
              </>
            )}
            <CardInfoItem
              icon={Mail}
              label="Email"
              value={submission.studentEmail}
            />
          </div>
        </CardContent>
      </Card>

      {/* Submission Details */}
      {isSubmitted && (
        <Card className="shadow-none border border-gray-200">
          <CardContent className="space-y-3">
            <h4 className="font-medium text-black text-base">
              Submission Details
            </h4>

            {/* File Info */}
            {submission.filename && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="p-1.5 bg-green-100 rounded-lg mt-0.5">
                    <FileIcon className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-green-900 truncate mb-1">
                      {submission.filename}
                    </p>
                    <p className="text-xs text-green-700">
                      {submission.fileSize &&
                        formatFileSize(submission.fileSize)}
                      {submission.mimeType && ` • ${submission.mimeType}`}
                    </p>
                  </div>
                  <StaffActionButtons
                    fileObjectName={submission.fileObjectName!}
                    filename={submission.filename!}
                    canBeVerified={canBeVerified}
                    onVerify={handleVerifyClick}
                  />
                </div>
              </div>
            )}

            {/* AI Confidence Score */}
            <div className="space-y-2 pt-2 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Bot className="h-4 w-4 text-purple-500" />
                  <span className="text-sm text-gray-700 font-medium">
                    AI Confidence
                  </span>
                </div>
                <span
                  className={`text-sm font-medium ${
                    confidenceScore > 0
                      ? getConfidenceColor(confidenceScore)
                      : "text-gray-400"
                  }`}
                >
                  {Math.round(confidenceScore * 100)}%
                </span>
              </div>
              <Progress
                value={confidenceScore * 100}
                className="h-1 bg-gray-200"
              />
            </div>

            {/* Timeline */}
            <div className="flex items-center justify-center text-center pt-2 border-t border-gray-200 gap-4">
              {submission.submittedAt && (
                <div className="space-y-1">
                  <div className="p-1.5 bg-blue-100 rounded-full mx-auto w-fit">
                    <FileIcon className="h-3.5 w-3.5 text-blue-600" />
                  </div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                    Submitted
                  </p>
                  <p className="text-xs font-semibold">
                    {formatDate(submission.submittedAt, {})}
                  </p>
                </div>
              )}
              {submission.expiredAt && (
                <>
                  <div className="h-px bg-slate-200 flex-1 mx-3"></div>
                  <div className="space-y-1">
                    <div className="p-1.5 bg-red-100 rounded-full mx-auto w-fit">
                      <AlertCircle className="h-3.5 w-3.5 text-red-600" />
                    </div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                      Expires
                    </p>
                    <p className="text-xs font-semibold">
                      {formatDate(submission.expiredAt, {})}
                    </p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default memo(StaffSubmissionOverview);
