import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInDays } from "date-fns";
import { useScheduleStore } from "@/stores/staff/schedules.stores";
import { useGetProgramRequirements } from "@/services/staff/prog-reqs/queries";
import { useGetAcademicYears } from "@/services/staff/academic-years/queries";
import {
  useCreateSchedule,
  useUpdateSchedule,
} from "@/services/staff/schedules/mutations";
import { scheduleFormSchema } from "@/schemas/staff/schedules.schemas";
import type {
  ScheduleFormProps,
  ScheduleFormSchemaType,
} from "@/types/staff/schedules.types";

export const useScheduleForm = ({ isEdit, scheduleId }: ScheduleFormProps) => {
  const navigate = useNavigate();
  const { selectedSchedule } = useScheduleStore();
  const { mutateAsync: create, isPending: isCreating } = useCreateSchedule();
  const { mutateAsync: update, isPending: isUpdating } = useUpdateSchedule();

  const { data: programRequirements, isLoading: isLoadingProgramRequirements } =
    useGetProgramRequirements();
  const { data: academicYears, isLoading: isLoadingAcademicYears } =
    useGetAcademicYears();

  const form = useForm<ScheduleFormSchemaType>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      programRequirementId: "",
      academicYearId: "",
      submissionDate: "",
      submissionTime: "23:59:59",
      gracePeriodDays: 7,
      notificationDaysBeforeDeadline: 90,
    },
  });

  // Populate form when schedule data is loaded
  useEffect(() => {
    if (selectedSchedule && isEdit) {
      // Convert existing datetime to separate date and time strings
      const datetime = new Date(selectedSchedule.submissionDeadline);
      const submissionDate = datetime.toISOString().split("T")[0];
      const submissionTime = datetime.toTimeString().split(" ")[0]; // HH:MM:SS format

      // Convert datetime values to integer days if they exist
      let gracePeriodDays: number = 7;
      let notificationDaysBeforeDeadline: number = 90;

      if (selectedSchedule.gracePeriodDeadline) {
        const gracePeriodDate = new Date(selectedSchedule.gracePeriodDeadline);
        gracePeriodDays = differenceInDays(
          gracePeriodDate,
          selectedSchedule.submissionDeadline
        );
      }

      if (selectedSchedule.startNotifyAt) {
        const notificationDate = new Date(selectedSchedule.startNotifyAt);
        notificationDaysBeforeDeadline = differenceInDays(
          selectedSchedule.submissionDeadline,
          notificationDate
        );
      }

      form.reset({
        programRequirementId: selectedSchedule.programRequirementId,
        academicYearId: selectedSchedule.academicYearId,
        submissionDate: submissionDate,
        submissionTime: submissionTime,
        gracePeriodDays: gracePeriodDays,
        notificationDaysBeforeDeadline: notificationDaysBeforeDeadline,
      });
    }
  }, [selectedSchedule, isEdit, form]);

  const onSubmit = async (data: ScheduleFormSchemaType) => {
    // Combine date and time into UTC datetime
    const dateTimeString = `${data.submissionDate}T${data.submissionTime}`;
    const localDateTime = new Date(dateTimeString);
    const utcDateTime = localDateTime.toISOString().replace("Z", "");

    // Prepare the submission data with combined datetime
    const submissionData = {
      programRequirementId: data.programRequirementId,
      academicYearId: data.academicYearId,
      submissionDeadline: utcDateTime,
      gracePeriodDays: data.gracePeriodDays,
      notificationDaysBeforeDeadline: data.notificationDaysBeforeDeadline,
    };

    if (isEdit && scheduleId) {
      await update({
        id: scheduleId,
        ...submissionData,
      });
    } else {
      await create(submissionData);
    }
  };

  const handleGoBack = () => {
    navigate("/staff/student-management/dashboard/schedules");
  };

  return {
    form,
    programRequirements,
    academicYears,
    isLoadingProgramRequirements,
    isLoadingAcademicYears,
    isCreating,
    isUpdating,
    onSubmit,
    handleGoBack,
  };
};
