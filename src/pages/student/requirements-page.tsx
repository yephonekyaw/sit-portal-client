import PageHeader from "@/components/student/requirements/page-header";
import DetailSheet from "@/components/student/requirements/detail-sheet";
import { useGetStudentRequirements } from "@/services/student/requirements/queries";
import { FileText } from "lucide-react";
import DefaultLoader from "@/components/ui/default-loader";
import RequirementCard from "@/components/student/requirements/requirement-card";

const RequirementPage = () => {
  const { data: requirements, isLoading, error } = useGetStudentRequirements();

  if (isLoading) {
    return <DefaultLoader label="Loading requirements..." />;
  }

  if (error) {
    return (
      <div className="w-full text-center py-12">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="h-8 w-8 text-red-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Failed to load requirements
        </h3>
        <p className="text-gray-600">
          There was an error loading your certificate requirements. Please
          refresh the page to try again.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Page Header */}
      <PageHeader />

      {/* Requirements Grid*/}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {requirements?.data?.length ? (
          requirements.data.map((requirement) => (
            <RequirementCard
              key={requirement.scheduleId}
              requirement={requirement}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-600">No requirements found.</p>
          </div>
        )}
      </div>

      {/* Detail Sheet */}
      <DetailSheet />
    </div>
  );
};

export default RequirementPage;
