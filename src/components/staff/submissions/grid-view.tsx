import { useSubmissionsData } from "@/stores/staff/submissions-filter.stores";
import { useSubmissionDetailSheet } from "@/stores/staff/submission-detail.stores";
import GridViewCard from "./grid-view-card";
import UnsubmittedCard from "./unsubmitted-card";

const GridView = () => {
  const { 
    paginatedSubmissions: submissions, 
    paginatedUnsubmittedStudents: unsubmittedStudents,
    isLoading, 
    error, 
    viewMode 
  } = useSubmissionsData();
  const { openDetailSheet } = useSubmissionDetailSheet();
  
  const currentData = viewMode === "submitted" ? submissions : unsubmittedStudents;

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-48 bg-gray-100 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-red-500">
        <p className="text-lg font-medium mb-2">Error loading submissions</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (currentData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <p className="text-lg font-medium mb-2">
          {viewMode === "submitted" ? "No submissions found" : "No unsubmitted students found"}
        </p>
        <p className="text-sm">
          Try adjusting your filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {viewMode === "submitted" 
        ? submissions.map((submission) => (
            <GridViewCard 
              key={submission.id} 
              submission={submission} 
              onViewDetails={openDetailSheet}
            />
          ))
        : unsubmittedStudents.map((student) => (
            <UnsubmittedCard 
              key={student.id} 
              student={student}
            />
          ))
      }
    </div>
  );
};

export default GridView;
