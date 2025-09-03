import ProgramRequirementCard from "@/components/staff/prog-requirements/prog-req-card";
import { useGetProgramRequirements } from "@/services/staff/prog-reqs/queries";
import { FileText } from "lucide-react";
import DefaultLoader from "@/components/ui/default-loader";
import ProgramRequirementArchiveModal from "@/components/staff/prog-requirements/prog-req-archive-modal";

const ProgramRequirementsPage = () => {
  const { data: requirements, isLoading, error } = useGetProgramRequirements();

  if (isLoading) {
    return <DefaultLoader label="Loading program requirements..." />;
  }

  if (error) {
    return (
      <div className="w-full text-center py-12">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="h-8 w-8 text-red-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Failed to load program requirements
        </h3>
        <p className="text-gray-600">
          There was an error loading the program requirements. Please refresh
          the page to try again.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {requirements?.data?.length ? (
          requirements.data.map((requirement) => (
            <ProgramRequirementCard
              key={requirement.id}
              requirement={requirement}
            />
          ))
        ) : (
          <div className="w-full text-center py-12">
            <p className="text-gray-600">No program requirements found.</p>
          </div>
        )}
      </div>
      <ProgramRequirementArchiveModal />
    </>
  );
};

export default ProgramRequirementsPage;
