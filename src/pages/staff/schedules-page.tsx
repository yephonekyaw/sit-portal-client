import ScheduleCard from "@/components/staff/schedules/schedule-card";
import { schedules } from "@/mock/schedules.mock";

const SchedulesPage = () => {
  return (
    <div className="space-y-4">
      {schedules.map((schedule) => (
        <ScheduleCard key={schedule.id} schedule={schedule} />
      ))}
    </div>
  );
};

export default SchedulesPage;
