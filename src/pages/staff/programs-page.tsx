import ProgramCard from "@/components/staff/programs/program-card";
import { programs } from "@/mock/programs.mock";

const ProgramsPage = () => {
  return (
    <div className="space-y-4">
      {programs.map((program) => (
        <ProgramCard key={program.id} program={program} />
      ))}
    </div>
  );
};

export default ProgramsPage;
