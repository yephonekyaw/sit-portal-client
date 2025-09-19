import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInDays, formatDate, parse } from "date-fns";
import { useScheduleStore } from "@/stores/staff/schedule.stores";
import { useGetProgramRequirements } from "@/services/staff/prog-reqs/queries";
import { useGetAcademicYears } from "@/services/staff/academic-years/queries";
import {
  useCreateSchedule,
  useUpdateSchedule,
} from "@/services/staff/schedules/mutations";
import { scheduleFormSchema } from "@/schemas/staff/schedule.schemas";
import type {
  ScheduleFormProps,
  ScheduleFormSchemaType,
} from "@/types/staff/schedule.types";
import { normalizeDateTimeStrFromServer } from "@/utils/common.utils";

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
      const datetime = new Date(
        normalizeDateTimeStrFromServer(selectedSchedule.submissionDeadline)
      );
      const submissionDate = formatDate(datetime, "yyyy-MM-dd");
      const submissionTime = formatDate(datetime, "HH:mm:ss");

      // Convert datetime values to integer days if they exist
      let gracePeriodDays: number = 7;
      let notificationDaysBeforeDeadline: number = 90;

      if (selectedSchedule.gracePeriodDeadline) {
        gracePeriodDays = differenceInDays(
          selectedSchedule.gracePeriodDeadline,
          selectedSchedule.submissionDeadline
        );
      }

      if (selectedSchedule.startNotifyAt) {
        notificationDaysBeforeDeadline = differenceInDays(
          selectedSchedule.submissionDeadline,
          selectedSchedule.startNotifyAt
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
    const dateTimeString = parse(
      `${data.submissionDate} ${data.submissionTime}`,
      "yyyy-MM-dd HH:mm:ss",
      new Date()
    );

    const submissionData = {
      programRequirementId: data.programRequirementId,
      academicYearId: data.academicYearId,
      submissionDeadline: dateTimeString.toISOString(),
      gracePeriodDays: data.gracePeriodDays == 0 ? 7 : data.gracePeriodDays,
      notificationDaysBeforeDeadline:
        data.notificationDaysBeforeDeadline == 0
          ? 90
          : data.notificationDaysBeforeDeadline,
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
    navigate("/staff/dashboard/schedules");
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
