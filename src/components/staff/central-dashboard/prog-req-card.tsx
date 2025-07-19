import { CardContent } from "@/components/ui/card";
import type { ProgramRequirement } from "@/mock/prog-reqs.mock";
import {
  getDeadlineString,
  getYearSuffix,
} from "@/utils/staff/central-dashboard.utils";
import {
  AlertCircle,
  Calendar,
  Clock,
  GraduationCap,
  Target,
} from "lucide-react";
import CardBase from "./card-base";
import CardHeaderSection from "./card-header-section";
import ExpandableCardContent from "./expandable-card-content";
import CardInfoSection from "./card-info-section";
import CardInfoItem from "./card-info-item";
import CardFooter from "./card-footer";

const ProgramRequirementCard = ({
  requirement,
}: {
  requirement: ProgramRequirement;
}) => {
  return (
    <CardBase>
      <CardHeaderSection
        title={requirement.certificate_type.name}
        code={requirement.certificate_type.code}
        isActive={requirement.is_active}
        onEdit={() => console.log("Edit requirement")}
        onDelete={() => console.log("Delete requirement")}
      />

      <CardContent className="pt-0 space-y-6">
        {requirement.special_instruction && (
          <ExpandableCardContent
            title="Special Instructions"
            subtitle="Additional requirements and guidelines"
            content={requirement.special_instruction}
            value="special-instructions"
            borderColor="border-indigo-300"
            bgColor="bg-indigo-100"
            textColor="text-indigo-800"
          />
        )}

        <CardInfoSection>
          <CardInfoItem
            icon={<Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />}
            iconBgColor="bg-blue-100"
            label="Requirement ID"
            value={`${requirement.id.slice(0, 8)}...`}
          />
          <CardInfoItem
            icon={<Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />}
            iconBgColor="bg-blue-100"
            label="Deadline"
            value={getDeadlineString(
              requirement.deadline_month,
              requirement.deadline_day
            )}
          />
          <CardInfoItem
            icon={<Target className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />}
            iconBgColor="bg-indigo-100"
            label="Target Year"
            value={getYearSuffix(requirement.target_year)}
          />
          <CardInfoItem
            icon={<Clock className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />}
            iconBgColor="bg-amber-100"
            label="Recurrence"
            value={requirement.recurrence_type}
          />
          <CardInfoItem
            icon={
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
            }
            iconBgColor="bg-red-100"
            label="Status"
            value={requirement.is_mandatory ? "Mandatory" : "Optional"}
          />
          <CardInfoItem
            icon={
              <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            }
            iconBgColor="bg-blue-100"
            label="Program Name"
            value={requirement.program.name}
          />
          <CardInfoItem
            icon={
              <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            }
            iconBgColor="bg-blue-100"
            label="Program Code"
            value={requirement.program.code}
          />
        </CardInfoSection>

        <CardFooter
          createdAt={requirement.created_at}
          updatedAt={requirement.updated_at}
        />
      </CardContent>
    </CardBase>
  );
};

export default ProgramRequirementCard;
