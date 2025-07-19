import { programs } from "@/mock/programs.mock";
import ProgramCard from "./program-card";

const ProgramsSection = () => {
  return (
    <div className="space-y-4">
      {programs.map((program) => (
        <ProgramCard key={program.id} program={program} />
      ))}
    </div>
  );
};

export default ProgramsSection;
