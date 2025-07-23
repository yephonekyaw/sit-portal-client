import { CardContent } from "@/components/ui/card";
import { Clock, Users, BookOpen, Hash } from "lucide-react";
import { type Program } from "@/mock/programs.mock";
import CardBase from "../dashboard/card-base";
import CardHeaderSection from "../dashboard/card-header-section";
import CardInfoSection from "../dashboard/card-info-section";
import CardInfoItem from "../dashboard/card-info-item";
import CardFooter from "../dashboard/card-footer";
import { useNavigate } from "react-router-dom";

export default function ProgramCard({ program }: { program: Program }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/staff/student-management/dashboard/programs/edit/${program.id}`);
  };

  const handleDelete = () => {
    console.log("Delete program", program.id);
    // TODO: Implement delete functionality
  };

  return (
    <CardBase>
      <CardHeaderSection
        title={program.program_name}
        codes={[program.program_code]}
        isActive={program.is_active}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CardContent className="pt-0 space-y-6">
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          {program.description}
        </p>

        <CardInfoSection>
          <CardInfoItem
            icon={Hash}
            label="Program ID"
            value={`${program.id.slice(0, 8)}...`}
          />
          <CardInfoItem
            icon={Clock}
            label="Duration"
            value={`${program.duration_years} years`}
          />
          <CardInfoItem
            icon={Users}
            label="Students"
            value={program.student_count}
          />
          <CardInfoItem
            icon={BookOpen}
            label="Requirements"
            value={program.requirement_count}
          />
        </CardInfoSection>

        <CardFooter
          createdAt={program.created_at}
          updatedAt={program.updated_at}
        />
      </CardContent>
    </CardBase>
  );
}
