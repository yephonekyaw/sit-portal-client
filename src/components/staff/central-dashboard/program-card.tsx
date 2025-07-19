import { CardContent } from "@/components/ui/card";
import { Clock, Users, BookOpen, CalendarDays } from "lucide-react";
import { type Program } from "@/mock/programs.mock";
import CardBase from "./card-base";
import CardHeaderSection from "./card-header-section";
import CardInfoSection from "./card-info-section";
import CardInfoItem from "./card-info-item";
import CardFooter from "./card-footer";

export default function ProgramCard({ program }: { program: Program }) {
  return (
    <CardBase>
      <CardHeaderSection
        title={program.program_name}
        code={program.program_code}
        isActive={program.is_active}
        onEdit={() => console.log("Edit program")}
        onDelete={() => console.log("Delete program")}
      />

      <CardContent className="pt-0 space-y-6">
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
          {program.description}
        </p>

        <CardInfoSection>
          <CardInfoItem
            icon={
              <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600/70" />
            }
            iconBgColor="bg-amber-100"
            label="Program ID"
            value={`${program.id.slice(0, 8)}...`}
          />
          <CardInfoItem
            icon={<Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />}
            iconBgColor="bg-blue-100"
            label="Duration"
            value={`${program.duration_years} years`}
          />
          <CardInfoItem
            icon={<Users className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />}
            iconBgColor="bg-indigo-100"
            label="Students"
            value={program.student_count}
          />
          <CardInfoItem
            icon={<BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-teal-600" />}
            iconBgColor="bg-teal-100"
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
