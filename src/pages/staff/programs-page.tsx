import ProgramCard from "@/components/staff/programs/program-card";
import { useGetPrograms } from "@/services/staff/programs/queries";
import { GraduationCap } from "lucide-react";
import DefaultLoader from "@/components/ui/default-loader";
import ProgramArchiveModal from "@/components/staff/programs/program-archive-modal";

const ProgramsPage = () => {
  const { data: programs, isLoading, error } = useGetPrograms();

  if (isLoading) {
    return <DefaultLoader label="Loading programs..." />;
  }

  if (error) {
    return (
      <div className="w-full text-center py-12">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <GraduationCap className="h-8 w-8 text-red-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Failed to load programs
        </h3>
        <p className="text-gray-600">
          There was an error loading the academic programs. Please refresh the
          page to try again.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {programs?.data?.length ? (
          programs.data.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))
        ) : (
          <div className="w-full text-center py-12">
            <p className="text-gray-600">No programs found.</p>
          </div>
        )}
      </div>

      <ProgramArchiveModal />
    </>
  );
};

export default ProgramsPage;
