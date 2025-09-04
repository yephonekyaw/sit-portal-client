import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ScheduleForm from "@/components/staff/schedules/schedule-form";
import { useGetSchedules } from "@/services/staff/schedules/queries";
import { useScheduleStore } from "@/stores/staff/schedules.stores";
import { toast } from "sonner";
import DefaultLoader from "@/components/ui/default-loader";

const ScheduleFormPage = () => {
  const { scheduleId } = useParams();
  const isEdit = !!scheduleId;

  const { data: schedules, isLoading, isError, isSuccess } = useGetSchedules();
  const { setSelectedSchedule } = useScheduleStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load schedule data");
      navigate("/staff/schedules/new");
    }
  }, [isError, navigate]);

  useEffect(() => {
    if (!isEdit || !isSuccess) return;

    const schedule = schedules?.data?.find((sched) => sched.id === scheduleId);

    if (!schedule) {
      toast.error("Schedule ID not found to edit");
      navigate("/staff/schedules/new");
      return;
    }

    setSelectedSchedule(schedule);
  }, [
    isEdit,
    isSuccess,
    scheduleId,
    schedules?.data,
    navigate,
    setSelectedSchedule,
  ]);

  if (isLoading) {
    return <DefaultLoader label="Loading schedule data..." />;
  }

  return <ScheduleForm isEdit={isEdit} scheduleId={scheduleId} />;
};

export default ScheduleFormPage;