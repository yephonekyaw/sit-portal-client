import { programRequirements } from "@/mock/prog-reqs.mock";
import ProgramRequirementCard from "./prog-req-card";

const ProgramRequirementsSection = () => {
  return (
    <div className="space-y-4">
      {programRequirements.map((requirement) => (
        <ProgramRequirementCard
          key={requirement.id}
          requirement={requirement}
        />
      ))}
    </div>
  );
};

export default ProgramRequirementsSection;
