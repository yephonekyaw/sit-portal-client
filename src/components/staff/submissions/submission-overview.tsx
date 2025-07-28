import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SUBMISSION_STATUS_CONFIGS } from "@/constants/staff/submission.constants";
import type { Submission } from "@/types/staff/submission.types";
import { formatDate, getInitialsTwoInputs } from "@/utils/common.utils";
import { memo } from "react";

interface SubmissionOverviewProps {
  submission: Submission;
}

const SubmissionOverview = ({ submission }: SubmissionOverviewProps) => {
  const statusConfig =
    SUBMISSION_STATUS_CONFIGS[
      submission.status as keyof typeof SUBMISSION_STATUS_CONFIGS
    ];
  const StatusIcon = statusConfig.icon;

  return (
    <div className="space-y-4">
      {/* Status Banner */}
      <div className={`p-3 rounded-lg border-2 ${statusConfig.color}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-1.5 rounded-lg bg-background">
              <StatusIcon className={`h-4 w-4 ${statusConfig.iconColor}`} />
            </div>
            <p className="font-semibold">{statusConfig.label}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Last Updated</p>
            <p className="font-medium text-sm">
              {formatDate(submission.updated_at, {})}
            </p>
          </div>
        </div>
      </div>

      {/* Submission Info */}
      <Card className="shadow-none border border-blue-100">
        <CardContent className="">
          {/* Student Section */}
          <div className="flex items-center space-x-3 mb-4">
            <Avatar className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600">
              <AvatarFallback className="bg-transparent text-white font-bold text-sm">
                {getInitialsTwoInputs(
                  submission.student.user.first_name,
                  submission.student.user.last_name
                )}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">
                {submission.student.user.first_name}{" "}
                {submission.student.user.last_name}
              </p>
              <div className="flex flex-wrap gap-1.5">
                <Badge
                  variant="outline"
                  className="mt-1.5 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  {submission.student.roll_number}
                </Badge>
                <Badge
                  variant="outline"
                  className="mt-1.5 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  {submission.student.program.program_code}
                </Badge>
                <Badge
                  variant="outline"
                  className="mt-1.5 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  {submission.requirement_schedule.academic_year.year_code}
                </Badge>
              </div>
            </div>
          </div>

          {/* Information Grid */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground text-wrap">
                Certificate Code:
              </span>
              <span className="font-medium">
                {submission.certificate_type.code}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground text-wrap">
                Requirement:
              </span>
              <span className="font-medium">
                {submission.requirement_schedule.name}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Deadline:</span>
              <span className="font-medium">
                {formatDate(
                  submission.requirement_schedule.submission_deadline,
                  {}
                )}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default memo(SubmissionOverview);
