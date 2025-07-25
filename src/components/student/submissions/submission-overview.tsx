import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SUBMISSION_STATUS_CONFIGS } from "@/constants/staff/submission.constants";
import { formatFileSize } from "@/constants/student/submission.constants";
import { formatDate } from "@/utils/shared/shared.utils";
import { 
  Download, 
  FileIcon, 
  Bot, 
  FileCheck, 
  AlertCircle,
  Info
} from "lucide-react";
import { memo } from "react";
import type { ProgramRequirementSchedule, CertificateSubmission } from "@/types/student/submission.types";

interface SubmissionOverviewProps {
  schedule: ProgramRequirementSchedule;
  submission?: CertificateSubmission;
}

const SubmissionOverview = ({ schedule, submission }: SubmissionOverviewProps) => {
  const statusConfig = submission
    ? SUBMISSION_STATUS_CONFIGS[
        submission.status as keyof typeof SUBMISSION_STATUS_CONFIGS
      ]
    : null;
  

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const isOverdue = new Date(schedule.submission_deadline) < new Date();

  return (
    <div className="space-y-4">
      {/* Status Banner */}
      {submission && statusConfig && (
        <div className={`p-3 rounded-lg border-2 ${statusConfig.color}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-1.5 rounded-lg bg-background">
                <statusConfig.icon className={`h-4 w-4 ${statusConfig.iconColor}`} />
              </div>
              <p className="font-semibold">{statusConfig.label}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Last Updated</p>
              <p className="font-medium text-sm">
                {formatDate(submission.updated_at || submission.submitted_at, {})}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Requirement Info */}
      <Card className="shadow-none border border-blue-100">
        <CardContent className="">
          {/* Certificate Type Section */}
          <div className="flex items-center space-x-3 mb-4">
            <Avatar className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600">
              <AvatarFallback className="bg-transparent text-white font-bold text-sm">
                {getInitials(schedule.program_requirement.certificate_type.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">
                {schedule.program_requirement.certificate_type.name}
              </p>
              <div className="flex flex-wrap gap-1.5">
                <Badge
                  variant="outline"
                  className="mt-1.5 bg-blue-50 text-blue-700 border-blue-200"
                >
                  {schedule.program_requirement.certificate_type.code}
                </Badge>
                <Badge
                  variant="outline"
                  className="mt-1.5 bg-purple-50 text-purple-700 border-purple-200"
                >
                  {schedule.program_requirement.program.program_code}
                </Badge>
                <Badge
                  variant="outline"
                  className="mt-1.5 bg-gray-50 text-gray-700 border-gray-200"
                >
                  {schedule.academic_year.year_code}
                </Badge>
              </div>
            </div>
          </div>

          {/* Information Grid */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Program:</span>
              <span className="font-medium">
                {schedule.program_requirement.program.program_name}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Target Year:</span>
              <span className="font-medium">
                Year {schedule.program_requirement.target_year}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Deadline:</span>
              <span className={`font-medium ${isOverdue && !submission ? 'text-red-600' : ''}`}>
                {formatDate(schedule.submission_deadline, {})}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Mandatory:</span>
              <span className="font-medium">
                {schedule.program_requirement.is_mandatory ? "Yes" : "No"}
              </span>
            </div>
            {schedule.program_requirement.certificate_type.has_expiration && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Has Expiration:</span>
                <span className="font-medium text-orange-600">Yes</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Special Instructions */}
      {schedule.program_requirement.special_instruction && (
        <Card className="shadow-none border border-blue-100">
          <CardContent className="">
            <div className="flex items-start gap-3">
              <div className="p-1 bg-blue-100 rounded-lg mt-0.5">
                <Info className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-blue-900 mb-2 text-sm">Special Instructions</h4>
                <p className="text-xs text-blue-800 leading-relaxed">
                  {schedule.program_requirement.special_instruction}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Certificate Description */}
      <Card className="shadow-none border border-blue-100">
        <CardContent className="">
          <div className="flex items-start gap-3">
            <div className="p-1 bg-blue-100 rounded-lg mt-0.5">
              <FileCheck className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-blue-900 mb-2 text-sm">About This Certificate</h4>
              <p className="text-xs text-blue-800 leading-relaxed">
                {schedule.program_requirement.certificate_type.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submission Details (if submitted) */}
      {submission && (
        <Card className="shadow-none border border-blue-100">
          <CardContent className="space-y-4">
            <h4 className="font-medium text-slate-900">Submission Details</h4>
            
            {/* File Info */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="p-2 bg-slate-200 rounded-lg">
                  <FileIcon className="h-5 w-5 text-slate-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {submission.file_name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(submission.file_size)} • {submission.mime_type}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>

            {/* AI Confidence Score */}
            {submission.agent_confidence_score && (
              <div className="space-y-2 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium flex items-center text-sm">
                    <Bot className="h-4 w-4 mr-2 text-purple-600" />
                    AI Confidence Score
                  </span>
                  <span className="font-semibold">
                    {(submission.agent_confidence_score * 100).toFixed(0)}%
                  </span>
                </div>
                <Progress
                  value={submission.agent_confidence_score * 100}
                  className="h-1.5 bg-white"
                />
              </div>
            )}

            {/* Timeline */}
            <div className="flex items-center justify-between text-center pt-2 border-t border-slate-100">
              <div className="space-y-1">
                <div className="p-1.5 bg-blue-100 rounded-full mx-auto w-fit">
                  <FileIcon className="h-3.5 w-3.5 text-blue-600" />
                </div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                  Submitted
                </p>
                <p className="text-xs font-semibold">
                  {formatDate(submission.submitted_at, {})}
                </p>
              </div>
              <div className="h-px bg-slate-200 flex-1 mx-3"></div>
              <div className="space-y-1">
                <div className="p-1.5 bg-amber-100 rounded-full mx-auto w-fit">
                  <FileCheck className="h-3.5 w-3.5 text-amber-600" />
                </div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                  Last Updated
                </p>
                <p className="text-xs font-semibold">
                  {formatDate(submission.updated_at || submission.submitted_at, {})}
                </p>
              </div>
              {submission.expired_at && (
                <>
                  <div className="h-px bg-slate-200 flex-1 mx-3"></div>
                  <div className="space-y-1">
                    <div className="p-1.5 bg-red-100 rounded-full mx-auto w-fit">
                      <AlertCircle className="h-3.5 w-3.5 text-red-600" />
                    </div>
                    <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">
                      Expires At
                    </p>
                    <p className="text-xs font-semibold">
                      {formatDate(submission.expired_at, {})}
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

export default memo(SubmissionOverview);