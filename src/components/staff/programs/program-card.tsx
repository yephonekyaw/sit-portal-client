import { CardContent } from "@/components/ui/card";
import { Clock, Hash, FileCheck, Archive } from "lucide-react";
import type { GetProgramsItem } from "@/services/staff/programs/types";
import CardBase from "../dashboard/card-base";
import CardHeaderSection from "../dashboard/card-header-section";
import CardInfoSection from "../dashboard/card-info-section";
import CardInfoItem from "../dashboard/card-info-item";
import CardFooter from "../dashboard/card-footer";
import { useNavigate } from "react-router-dom";
import { useProgramStore } from "@/stores/staff/program.stores";

export default function ProgramCard({ program }: { program: GetProgramsItem }) {
  const navigate = useNavigate();
  const {
    setSelectedProgram,
    setDeleteConfirmModalState,
    setArchiveProgramId,
  } = useProgramStore();

  const handleEdit = () => {
    setSelectedProgram(program);
    navigate(`/staff/programs/edit/${program.id}`);
  };

  const handleArchive = () => {
    setDeleteConfirmModalState(true);
    setArchiveProgramId(program.id);
  };

  return (
    <CardBase>
      <CardHeaderSection
        title={program.programName}
        codes={[program.programCode]}
        isActive={program.isActive}
        onEdit={handleEdit}
        onArchive={handleArchive}
      />

      <CardContent className="pt-0 space-y-4">
        <p className="text-gray-600 leading-relaxed text-sm">
          {program.description}
        </p>

        <CardInfoSection>
          <CardInfoItem
            icon={Hash}
            label="ID"
            value={`${program.id.slice(0, 8)}...`}
            className="bg-blue-100 text-blue-700 border-blue-200"
          />
          <CardInfoItem
            icon={Clock}
            label="Duration"
            value={`${program.durationYears}yr${
              program.durationYears !== 1 ? "s" : ""
            }`}
            className="bg-green-100 text-green-700 border-green-200"
          />
          <CardInfoItem
            icon={FileCheck}
            label="Active Req"
            value={program.activeRequirementsCount}
            className="bg-purple-100 text-purple-700 border-purple-200"
          />
          <CardInfoItem
            icon={Archive}
            label="Archived Req"
            value={program.archivedRequirementsCount}
            className="bg-gray-100 text-gray-700 border-gray-200"
          />
        </CardInfoSection>

        <CardFooter
          createdAt={program.createdAt}
          updatedAt={program.updatedAt}
        />
      </CardContent>
    </CardBase>
  );
}
