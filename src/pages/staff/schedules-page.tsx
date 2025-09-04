import ScheduleCard from "@/components/staff/schedules/schedule-card";
import { useGetSchedules } from "@/services/staff/schedules/queries";
import { Calendar } from "lucide-react";
import DefaultLoader from "@/components/ui/default-loader";

const SchedulesPage = () => {
  const { data: schedules, isLoading, error } = useGetSchedules();

  if (isLoading) {
    return <DefaultLoader label="Loading schedules..." />;
  }

  if (error) {
    return (
      <div className="w-full text-center py-12">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="h-8 w-8 text-red-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Failed to load schedules
        </h3>
        <p className="text-gray-600">
          There was an error loading the program requirement schedules. Please refresh the
          page to try again.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {schedules?.data?.length ? (
        schedules.data.map((schedule) => (
          <ScheduleCard key={schedule.id} schedule={schedule} />
        ))
      ) : (
        <div className="w-full text-center py-12">
          <p className="text-gray-600">No schedules found.</p>
        </div>
      )}
    </div>
  );
};

export default SchedulesPage;
