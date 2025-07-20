import { programRequirements } from "@/mock/prog-reqs.mock";
import ProgramRequirementCard from "@/components/staff/prog-requirements/prog-req-card";

const ProgramRequirementsPage = () => {
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

export default ProgramRequirementsPage;
