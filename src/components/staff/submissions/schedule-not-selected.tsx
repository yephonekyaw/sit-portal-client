import { Calendar, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ScheduleNotSelected = () => {
  const navigate = useNavigate();

  const handleNavigateToSchedules = () => {
    navigate("/staff/dashboard/schedules");
  };

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
            <Calendar className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-amber-900">
              No Schedule Selected
            </h3>
            <p className="text-sm text-amber-700 mt-1">
              Please select a schedule to view and manage student submissions.
            </p>
          </div>
        </div>
        <button
          onClick={handleNavigateToSchedules}
          className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex-shrink-0"
        >
          View Schedules
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ScheduleNotSelected;
