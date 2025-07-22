import { useSubmissionsFiltersStore } from "@/stores/staff/submissions-filter.stores";
import GridViewCard from "./grid-view-card";

const GridView = () => {
  const { allSubmissions: submissions } = useSubmissionsFiltersStore();

  // if (isLoading) {
  //   return (
  //     <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  //       {Array.from({ length: 6 }).map((_, i) => (
  //         <div key={i} className="h-48 bg-gray-100 rounded-lg animate-pulse" />
  //       ))}
  //     </div>
  //   );
  // }

  if (submissions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <p className="text-lg font-medium mb-2">No submissions found</p>
        <p className="text-sm">
          Try adjusting your filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {submissions.map((submission) => (
        <GridViewCard key={submission.id} submission={submission} />
      ))}
    </div>
  );
};

export default GridView;
