import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/common.utils";
import { getConfidenceColor } from "@/utils/staff/submission.utils";
import { FileText, Bot, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { memo, useState } from "react";
import type { RequirementCardProps } from "@/types/student/requirement.types";
import { useRequirementStore } from "@/stores/student/requirement.store";
import {
  truncateText,
  getRequirementStatusBadges,
  shouldShowApprovedDetails,
} from "@/utils/student/requirement.utils";
import { DEFAULT_TEXT_TRUNCATE_LENGTH } from "@/constants/student/requirement.constants";

const RequirementCard = ({ requirement }: RequirementCardProps) => {
  const { openDetailSheet } = useRequirementStore();
  const [showFullInstructions, setShowFullInstructions] = useState(false);

  const statusBadges = getRequirementStatusBadges(requirement);
  const showApprovedDetails = shouldShowApprovedDetails(requirement);

  const confidenceScore = requirement.agentConfidenceScore ?? 0;
  const instructionsText = requirement.specialInstruction || "";
  const shouldTruncate = instructionsText.length > DEFAULT_TEXT_TRUNCATE_LENGTH;

  return (
    <Card
      className="group hover:shadow-lg hover:ring-2 hover:ring-blue-500/50 transition-all duration-200 border-slate-200 h-full cursor-pointer bg-white"
      onClick={() => {
        openDetailSheet(requirement);
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${requirement.requirementName}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openDetailSheet(requirement);
        }
      }}
    >
      <CardContent className="space-y-4 text-black">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 bg-blue-500 flex-shrink-0">
            <AvatarFallback className="text-white bg-blue-500">
              <FileText className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-black truncate text-base leading-tight mb-1">
              {requirement.requirementName}
            </p>
            <div className="flex gap-1 flex-wrap">
              <Badge className="bg-blue-500 text-white border-0 text-xs px-2 py-0.5">
                {requirement.certCode}
              </Badge>
              <Badge className="bg-blue-500 text-white border-0 text-xs px-2 py-0.5">
                {requirement.programCode}
              </Badge>
            </div>
          </div>
        </div>

        {/* Special Instruction */}
        {requirement.specialInstruction && (
          <div className="bg-gray-100 p-3 rounded-lg space-y-1.5">
            <div className="text-sm text-gray-800 leading-relaxed">
              {showFullInstructions
                ? instructionsText
                : truncateText(instructionsText)}
            </div>
            {shouldTruncate && (
              <Button
                variant="ghost"
                size="sm"
                className="h-5 text-xs text-blue-600 hover:text-blue-700 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFullInstructions(!showFullInstructions);
                }}
              >
                {showFullInstructions ? (
                  <>
                    Show less <ChevronUp className="h-3 w-3 ml-1" />
                  </>
                ) : (
                  <>
                    Show more <ChevronDown className="h-3 w-3 ml-1" />
                  </>
                )}
              </Button>
            )}
          </div>
        )}

        {/* All Badges */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {statusBadges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <Badge
                key={index}
                className={`${badge.className} text-xs px-2 py-1 font-medium border-0`}
              >
                <Icon className="h-3 w-3 mr-1" />
                {badge.label}
              </Badge>
            );
          })}

          <Badge
            className={`text-xs px-2 py-1 font-medium border-0 ${
              requirement.isMandatory
                ? "bg-indigo-500 text-white"
                : "bg-slate-500 text-white"
            }`}
          >
            {requirement.isMandatory ? "Required" : "Optional"}
          </Badge>
          <Badge className="bg-red-100 text-red-700 border-0 text-xs px-2 py-1 font-medium">
            <Calendar className="h-3 w-3 mr-1" />
            <span>Due</span>
            {formatDate(requirement.submissionDeadline, {})}
          </Badge>

          {/* Additional timing badges for approved submissions */}
          {showApprovedDetails && requirement.submittedAt && (
            <Badge className="bg-blue-100 text-blue-700 border-0 text-xs px-2 py-1 font-medium">
              <Calendar className="h-3 w-3 mr-1" />
              Submitted {formatDate(requirement.submittedAt, {})}
            </Badge>
          )}
          {showApprovedDetails && requirement.expiredAt && (
            <Badge className="bg-purple-100 text-purple-700 border-0 text-xs px-2 py-1 font-medium">
              Expires {formatDate(requirement.expiredAt, {})}
            </Badge>
          )}
        </div>

        {/* AI Confidence Score - Always show */}
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
          <Progress value={confidenceScore * 100} className="h-1 bg-gray-200" />
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(RequirementCard);
