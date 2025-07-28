import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { UnsubmittedStudent } from "@/types/staff/submission.types";
import { formatDate } from "@/utils/common.utils";
import { Clock, AlertCircle } from "lucide-react";
import { memo } from "react";

interface UnsubmittedCardProps {
  student: UnsubmittedStudent;
}

const UnsubmittedCard = ({ student }: UnsubmittedCardProps) => {
  const isOverdue =
    new Date(student.requirement_schedule.submission_deadline) < new Date();
  const daysUntilDeadline = Math.ceil(
    (new Date(student.requirement_schedule.submission_deadline).getTime() -
      new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return (
    <Card className="group hover:shadow-md hover:ring-1 hover:ring-blue-400/40 transition-all duration-200 border-gray-200 h-fit">
      <CardContent className="px-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="relative">
              <Avatar className="h-9 w-9 bg-gradient-to-br from-gray-400 to-gray-500 flex-shrink-0">
                <AvatarFallback className="text-white font-semibold text-xs bg-gradient-to-r from-blue-500 to-blue-600">
                  {`${student.user.first_name[0]}${student.user.last_name[0]}`.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-slate-900 truncate leading-tight">
                {student.user.first_name} {student.user.last_name}
              </p>
              <p className="text-xs text-slate-500 font-medium">
                {student.roll_number}
              </p>
            </div>
          </div>

          {/* Status indicator */}
          <div className="flex-shrink-0">
            {isOverdue ? (
              <AlertCircle className="h-5 w-5 text-red-400" />
            ) : (
              <Clock className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </div>

        {/* Status and Certificate Badges */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Badge
            className={`${
              isOverdue
                ? "bg-red-50 text-red-700 border-red-200"
                : "bg-gray-100 text-gray-700 border-gray-200"
            } text-xs px-2.5 py-1 font-medium`}
          >
            {isOverdue ? (
              <>
                <AlertCircle className="h-3 w-3 mr-1.5" />
                Overdue
              </>
            ) : (
              <>
                <Clock className="h-3 w-3 mr-1.5" />
                Pending
              </>
            )}
          </Badge>
          <Badge
            variant="outline"
            className="text-xs font-medium bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 transition-colors"
          >
            {student.certificate_type.code}
          </Badge>
        </div>

        {/* Information Grid */}
        <div className="space-y-3 pt-1 border-t border-gray-100">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">
                Deadline
              </span>
              <div className="text-right">
                <p className="text-xs font-medium text-gray-700">
                  {formatDate(
                    student.requirement_schedule.submission_deadline,
                    {}
                  )}
                </p>
                {!isOverdue && (
                  <p
                    className={`text-xs ${
                      daysUntilDeadline <= 3
                        ? "text-red-500"
                        : daysUntilDeadline <= 7
                        ? "text-amber-500"
                        : "text-gray-400"
                    }`}
                  >
                    {daysUntilDeadline > 0
                      ? `${daysUntilDeadline} days left`
                      : "Due today"}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">Program</span>
              <span className="text-xs font-medium text-gray-700">
                {student.program.program_code}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">
                Requirement
              </span>
              <span
                className="text-xs font-medium text-gray-700 truncate ml-2"
                title={student.requirement_schedule.name}
              >
                {student.requirement_schedule.name.length > 20
                  ? `${student.requirement_schedule.name.substring(0, 20)}...`
                  : student.requirement_schedule.name}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(UnsubmittedCard);
