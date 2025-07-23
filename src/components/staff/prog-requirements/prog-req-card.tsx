import { CardContent } from "@/components/ui/card";
import type { ProgramRequirement } from "@/mock/prog-reqs.mock";
import {
  getDeadlineString,
  getYearSuffix,
} from "@/utils/staff/dashboard.utils";
import {
  AlertCircle,
  Hash,
  Clock,
  GraduationCap,
  Target,
  RotateCcw,
} from "lucide-react";
import CardBase from "../dashboard/card-base";
import CardHeaderSection from "../dashboard/card-header-section";
import ExpandableCardContent from "../dashboard/expandable-card-content";
import CardInfoSection from "../dashboard/card-info-section";
import CardInfoItem from "../dashboard/card-info-item";
import CardFooter from "../dashboard/card-footer";
import { useNavigate } from "react-router-dom";

const ProgramRequirementCard = ({
  requirement,
}: {
  requirement: ProgramRequirement;
}) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/staff/requirements/edit/${requirement.id}`);
  };

  const handleDelete = () => {
    console.log("Delete requirement", requirement.id);
    // TODO: Implement delete functionality
  };

  return (
    <CardBase>
      <CardHeaderSection
        title={requirement.name}
        codes={[
          requirement.certificate_type.code,
          requirement.program.program_code,
        ]}
        isActive={requirement.is_active}
        onEdit={handleEdit}
        onDelete={handleDelete}
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
            icon={Hash}
            label="Requirement ID"
            value={`${requirement.id.slice(0, 8)}...`}
          />
          <CardInfoItem
            icon={Clock}
            label="Deadline"
            value={getDeadlineString(
              requirement.deadline_month,
              requirement.deadline_day
            )}
          />
          <CardInfoItem
            icon={Target}
            label="Target Year"
            value={getYearSuffix(requirement.target_year)}
          />
          <CardInfoItem
            icon={RotateCcw}
            label="Recurrence"
            value={
              requirement.recurrence_type[0].toUpperCase() +
              requirement.recurrence_type.slice(1)
            }
          />
          <CardInfoItem
            icon={AlertCircle}
            label="Status"
            value={requirement.is_mandatory ? "Mandatory" : "Optional"}
          />
          <CardInfoItem
            icon={GraduationCap}
            label="Program Code"
            value={requirement.program.program_code}
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
