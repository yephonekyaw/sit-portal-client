import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatFileSize } from "@/utils/common.utils";
import { formatDate } from "@/utils/common.utils";
import { getConfidenceColor } from "@/utils/staff/submission.utils";
import {
  Download,
  FileIcon,
  Bot,
  AlertCircle,
  Info,
  CheckCircle2,
  XCircle,
  Eye,
  Clock,
  Cpu,
  Calendar,
  CalendarClock,
} from "lucide-react";
import { memo } from "react";
import type { StudentRequirementWithSubmission } from "@/services/student/requirements/types";

interface SheetOverviewProps {
  requirement: StudentRequirementWithSubmission;
}

const SheetOverview = ({ requirement }: SheetOverviewProps) => {
  const isSubmitted = !!requirement.submissionId;
  const isOverdue = new Date(requirement.submissionDeadline) < new Date();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const getStatusBadge = () => {
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
      icon: FileIcon,
      className: "bg-orange-100 text-orange-800 border-orange-300",
    };
  };

  const statusBadge = getStatusBadge();
  const StatusIcon = statusBadge.icon;
  const confidenceScore = requirement.agentConfidenceScore ?? 0;

  return (
    <div className="space-y-3">
      {/* Status Banner */}
      {isSubmitted && (
        <div className={`p-3 rounded-lg border ${statusBadge.className}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <StatusIcon className="h-4 w-4" />
              <p className="font-medium text-sm">{statusBadge.label}</p>
            </div>
            {requirement.submittedAt && (
              <div className="text-right">
                <p className="text-xs opacity-70">Last Updated</p>
                <p className="font-medium text-xs">
                  {formatDate(requirement.submittedAt, {})}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Requirement Info */}
      <Card className="shadow-none border border-gray-200">
        <CardContent>
          {/* Certificate Type Section */}
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="h-10 w-10 bg-blue-500">
              <AvatarFallback className="bg-transparent text-white font-bold text-sm">
                {getInitials(requirement.certName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate text-base">
                {requirement.requirementName}
              </p>
              <div className="flex flex-wrap gap-1 mt-1">
                <Badge className="bg-blue-500 text-white border-0 text-xs space-x-1">
                  {requirement.certCode}
                </Badge>
                <Badge className="bg-blue-500 text-white border-0 text-xs space-x-1">
                  {requirement.programCode}
                </Badge>
              </div>
            </div>
          </div>

          {/* Information Badges */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs space-x-2">
              <Cpu />
              <span>Program</span>
              <span>{requirement.programName}</span>
            </Badge>
            <Badge className="bg-green-100 text-green-700 border-green-200 text-xs space-x-1">
              <Calendar />
              <span>Target</span>
              <span>Year {requirement.targetYear}</span>
            </Badge>
            <Badge
              className={`text-xs px-2 py-0.5 border-0 space-x-1 ${
                isOverdue && !isSubmitted
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              <CalendarClock />
              <span>Due At</span>
              <span>{formatDate(requirement.submissionDeadline, {})}</span>
            </Badge>
            <Badge
              className={`text-xs px-2 py-0.5 border-0 space-x-1 ${
                requirement.isMandatory
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              <Info />
              <span>Type</span>
              <span>{requirement.isMandatory ? "Required" : "Optional"}</span>
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Special Instructions */}
      {requirement.specialInstruction && (
        <Card className="shadow-none border border-blue-100">
          <CardContent>
            <div className="flex items-start gap-3">
              <div className="p-1 bg-blue-100 rounded-lg mt-0.5">
                <Info className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-blue-900 mb-2 text-sm">
                  Special Instructions
                </h4>
                <p className="text-xs text-blue-800 leading-relaxed">
                  {requirement.specialInstruction}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Certificate Description */}
      <Card className="shadow-none border border-blue-100">
        <CardContent>
          <div className="flex items-start gap-3">
            <div className="p-1 bg-blue-100 rounded-lg mt-0.5">
              <FileIcon className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-blue-900 mb-2 text-sm">
                About This Certificate
              </h4>
              <p className="text-xs text-blue-800 leading-relaxed">
                {requirement.certDescription}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submission Details */}
      {isSubmitted && (
        <Card className="shadow-none border border-gray-200">
          <CardContent className="space-y-3 p-4">
            <h4 className="font-medium text-black text-sm">
              Submission Details
            </h4>

            {/* File Info */}
            {requirement.filename && (
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <div className="p-1.5 bg-gray-200 rounded-lg">
                    <FileIcon className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate text-black">
                      {requirement.filename}
                    </p>
                    <p className="text-xs text-gray-600">
                      {requirement.fileSize &&
                        formatFileSize(requirement.fileSize)}
                      {requirement.mimeType && ` • ${requirement.mimeType}`}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button variant="outline" size="sm" className="h-7 text-xs">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            )}

            {/* AI Confidence Score */}
            <div className="space-y-2 pt-2 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Bot className="h-4 w-4 text-purple-500" />
                  <span className="text-xs text-gray-700 font-medium">
                    AI Confidence
                  </span>
                </div>
                <span
                  className={`text-xs font-medium ${
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
            {requirement.submittedAt && (
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-blue-100 rounded-full">
                    <FileIcon className="h-3 w-3 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Submitted</p>
                    <p className="text-xs font-medium text-black">
                      {formatDate(requirement.submittedAt, {})}
                    </p>
                  </div>
                </div>

                {requirement.expiredAt && (
                  <div className="flex items-center gap-2">
                    <div className="p-1 bg-red-100 rounded-full">
                      <AlertCircle className="h-3 w-3 text-red-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Expires</p>
                      <p className="text-xs font-medium text-black">
                        {formatDate(requirement.expiredAt, {})}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Timeline */}
            {/* <div className="flex items-center justify-between text-center pt-2 border-t border-slate-100">
              {requirement.submittedAt && (
                <div className="space-y-1">
                  <div className="p-1.5 bg-blue-100 rounded-full mx-auto w-fit">
                    <FileIcon className="h-3.5 w-3.5 text-blue-600" />
                  </div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                    Submitted
                  </p>
                  <p className="text-xs font-semibold">
                    {formatDate(requirement.submittedAt, {})}
                  </p>
                </div>
              )}
              {requirement.expiredAt && (
                <>
                  <div className="h-px bg-slate-200 flex-1 mx-3"></div>
                  <div className="space-y-1">
                    <div className="p-1.5 bg-amber-100 rounded-full mx-auto w-fit">
                      <FileCheck className="h-3.5 w-3.5 text-amber-600" />
                    </div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                      Last Updated
                    </p>
                    <p className="text-xs font-semibold">
                      {formatDate(requirement.expiredAt, {})}
                    </p>
                  </div>
                </>
              )}
            </div> */}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default memo(SheetOverview);
