import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatDate } from "@/utils/shared/shared.utils";
import { AlertCircle, Calendar, Bot } from "lucide-react";
import { memo } from "react";
import type { ProgramRequirementSchedule } from "@/types/student/submission.types";

interface UnsubmittedCertificateCardProps {
  schedule: ProgramRequirementSchedule;
  onViewDetails?: (schedule: ProgramRequirementSchedule) => void;
}

const UnsubmittedCertificateCard = ({ 
  schedule, 
  onViewDetails
}: UnsubmittedCertificateCardProps) => {
  const isOverdue = new Date(schedule.submission_deadline) < new Date();
  const daysUntilDeadline = Math.ceil(
    (new Date(schedule.submission_deadline).getTime() - new Date().getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  return (
    <Card 
      className="group hover:shadow-md hover:ring-1 hover:ring-blue-400/40 transition-all duration-200 border-gray-200 h-full cursor-pointer"
      onClick={() => onViewDetails?.(schedule)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${schedule.program_requirement.name}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onViewDetails?.(schedule);
        }
      }}
    >
      <CardContent className="px-5 py-4 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className="relative">
              <Avatar className="h-10 w-10 bg-gradient-to-br from-gray-400 to-gray-500 flex-shrink-0">
                <AvatarFallback className="text-white font-semibold text-sm bg-gradient-to-r from-blue-500 to-blue-600">
                  {getInitials(schedule.program_requirement.certificate_type.name)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900 truncate leading-tight">
                {schedule.program_requirement.name}
              </p>
              <p className="text-sm text-slate-500 font-medium">
                {schedule.program_requirement.certificate_type.code} • {schedule.program_requirement.program.program_code}
              </p>
            </div>
          </div>

          {/* Days left badge */}
          <div className="flex-shrink-0">
            {isOverdue ? (
              <Badge className="bg-red-50 text-red-700 border-red-200 text-xs px-2.5 py-1 font-medium">
                <AlertCircle className="h-3 w-3 mr-1.5" />
                Overdue
              </Badge>
            ) : (
              <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-xs px-2.5 py-1 font-medium">
                {daysUntilDeadline > 0
                  ? `${daysUntilDeadline} days left`
                  : "Due today"}
              </Badge>
            )}
          </div>
        </div>

        {/* Status and Certificate Badges */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-xs px-2.5 py-1 font-medium">
            Not Submitted
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

        {/* Information and Deadline */}
        <div className="space-y-3 pt-1 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 font-medium">Deadline</span>
            <div className="flex items-center gap-1.5 text-sm text-gray-700">
              <Calendar className="h-3 w-3" />
              <span className="font-medium">
                {formatDate(schedule.submission_deadline, {})}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 font-medium">Program</span>
            <span className="text-sm font-medium text-gray-700">
              {schedule.program_requirement.program.program_name}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500 font-medium">
              Target Year
            </span>
            <span className="text-sm font-medium text-gray-700">
              Year {schedule.program_requirement.target_year}
            </span>
          </div>
        </div>

        {/* AI Confidence Score (0% for not submitted) */}
        <div className="space-y-2 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Bot className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600 font-medium">
                AI Confidence
              </span>
            </div>
            <span className="text-sm font-medium text-gray-400">
              0%
            </span>
          </div>
          <div className="relative">
            <Progress
              value={0}
              className="h-1.5 bg-gray-200"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(UnsubmittedCertificateCard);