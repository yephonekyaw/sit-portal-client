import { CardContent } from "@/components/ui/card";
import type { GetProgramRequirementsItem } from "@/services/staff/prog-reqs/types";
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
  Calendar,
} from "lucide-react";
import CardBase from "../dashboard/card-base";
import CardHeaderSection from "../dashboard/card-header-section";
import ExpandableCardContent from "../dashboard/expandable-card-content";
import CardInfoSection from "../dashboard/card-info-section";
import CardInfoItem from "../dashboard/card-info-item";
import CardFooter from "../dashboard/card-footer";
import { useNavigate } from "react-router-dom";
import { useProgramRequirementStore } from "@/stores/staff/prog-req.stores";

interface ProgramRequirementCardProps {
  requirement: GetProgramRequirementsItem;
}

const ProgramRequirementCard = ({
  requirement,
}: ProgramRequirementCardProps) => {
  const navigate = useNavigate();
  const { setArchiveConfirmModalState, setArchiveRequirementId } =
    useProgramRequirementStore();

  const handleEdit = () => {
    navigate(`/staff/requirements/edit/${requirement.id}`);
  };

  const handleArchive = () => {
    setArchiveRequirementId(requirement.id);
    setArchiveConfirmModalState(true);
  };

  // Extract month and day from deadline_date (YYYY-MM-DD format)
  const deadlineDate = new Date(requirement.deadlineDate);
  const deadlineMonth = deadlineDate.getMonth() + 1; // getMonth() returns 0-11
  const deadlineDay = deadlineDate.getDate();

  return (
    <CardBase>
      <CardHeaderSection
        title={requirement.name}
        codes={[requirement.certCode, requirement.programCode]}
        isActive={requirement.isActive}
        onEdit={handleEdit}
        onArchive={handleArchive}
      />

      <CardContent className="pt-0 space-y-6">
        {requirement.specialInstruction && (
          <ExpandableCardContent
            title="Special Instructions"
            subtitle="Additional requirements and guidelines"
            content={requirement.specialInstruction}
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
            value={getDeadlineString(deadlineMonth, deadlineDay)}
          />
          <CardInfoItem
            icon={Target}
            label="Target Year"
            value={getYearSuffix(requirement.targetYear)}
          />
          <CardInfoItem
            icon={RotateCcw}
            label="Recurrence"
            value={
              requirement.recurrenceType[0].toUpperCase() +
              requirement.recurrenceType.slice(1)
            }
          />
          <CardInfoItem
            icon={AlertCircle}
            label="Status"
            value={requirement.isMandatory ? "Mandatory" : "Optional"}
          />
          <CardInfoItem
            icon={GraduationCap}
            label="Program"
            value={requirement.programName}
          />
          <CardInfoItem
            icon={Calendar}
            label="Schedules"
            value={requirement.schedulesCount.toString()}
          />
        </CardInfoSection>

        <CardFooter
          createdAt={requirement.createdAt}
          updatedAt={requirement.updatedAt}
        />
      </CardContent>
    </CardBase>
  );
};

export default ProgramRequirementCard;
