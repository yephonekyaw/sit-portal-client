import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProgramRequirementStore } from "@/stores/staff/prog-req.stores";
import { useGetPrograms } from "@/services/staff/programs/queries";
import { useGetCertificates } from "@/services/staff/certificates/queries";
import {
  useCreateProgramRequirement,
  useUpdateProgramRequirement,
} from "@/services/staff/prog-reqs/mutations";
import {
  programRequirementFormSchema,
  ProgReqRecurrenceType,
} from "@/schemas/staff/prog-req.schemas";
import type {
  ProgramRequirementFormProps,
  ProgramRequirementFormSchemaType,
} from "@/types/staff/prog-req.types";
import {
  getDaysInMonth,
  getYearOptions,
  getMaxTargetYear,
} from "@/utils/staff/prog-req.utils";

export const useProgramRequirementForm = ({
  isEdit,
  requirementId,
}: ProgramRequirementFormProps) => {
  const navigate = useNavigate();
  const { selectedRequirement } = useProgramRequirementStore();
  const { mutateAsync: create, isPending: isCreating } =
    useCreateProgramRequirement();
  const { mutateAsync: update, isPending: isUpdating } =
    useUpdateProgramRequirement();

  const { data: programs, isLoading: isLoadingPrograms } = useGetPrograms();
  const { data: certificates, isLoading: isLoadingCertificates } =
    useGetCertificates();

  const currentYear = new Date().getFullYear();

  const form = useForm<ProgramRequirementFormSchemaType>({
    resolver: zodResolver(programRequirementFormSchema),
  });

  useEffect(() => {
    form.reset({
      programId: selectedRequirement?.programId || "",
      certTypeId: selectedRequirement?.certTypeId || "",
      name: selectedRequirement?.name || "",
      targetYear: selectedRequirement?.targetYear || 1,
      deadlineDay: selectedRequirement?.deadlineDate
        ? new Date(selectedRequirement.deadlineDate).getDate()
        : 1,
      // getMonth return 0-11
      deadlineMonth: selectedRequirement?.deadlineDate
        ? new Date(selectedRequirement.deadlineDate).getMonth() + 1
        : 1,
      gracePeriodDays: selectedRequirement?.gracePeriodDays || 7,
      notificationDaysBeforeDeadline:
        selectedRequirement?.notificationDaysBeforeDeadline || 90,
      isMandatory: selectedRequirement?.isMandatory ?? true,
      isActive: selectedRequirement?.isActive ?? true,
      specialInstruction: selectedRequirement?.specialInstruction || "",
      recurrenceType:
        selectedRequirement?.recurrenceType || ProgReqRecurrenceType.ANNUAL,
      effectiveFromYear: selectedRequirement?.effectiveFromYear || currentYear,
      effectiveUntilYear:
        selectedRequirement?.effectiveUntilYear || currentYear + 1,
      monthsBeforeDeadline: selectedRequirement?.monthsBeforeDeadline || 3,
    });
  }, [selectedRequirement, form, currentYear]);

  const maxTargetYear = getMaxTargetYear(
    programs?.data || [],
    form.watch("programId")
  );

  // Watch deadline month for dynamic day options
  const selectedMonth = form.watch("deadlineMonth");
  const availableDays = useMemo(
    () => getDaysInMonth(selectedMonth, currentYear),
    [selectedMonth, currentYear]
  );

  // Year options for effective years
  const yearOptions = useMemo(() => getYearOptions(currentYear), [currentYear]);

  // Adjust deadline day when month changes
  useEffect(() => {
    const currentDay = form.getValues("deadlineDay");
    const maxDayInMonth = availableDays.length;
    if (currentDay > maxDayInMonth) {
      form.setValue("deadlineDay", maxDayInMonth);
    }
  }, [selectedMonth, availableDays, form]);

  const onSubmit = async (data: ProgramRequirementFormSchemaType) => {
    if (isEdit && requirementId) {
      await update({
        id: requirementId,
        ...data,
        gracePeriodDays: data.gracePeriodDays == 0 ? 7 : data.gracePeriodDays,
        notificationDaysBeforeDeadline:
          data.notificationDaysBeforeDeadline == 0
            ? 90
            : data.notificationDaysBeforeDeadline,
      });
    } else {
      await create({
        ...data,
        gracePeriodDays: data.gracePeriodDays == 0 ? 7 : data.gracePeriodDays,
        notificationDaysBeforeDeadline:
          data.notificationDaysBeforeDeadline == 0
            ? 90
            : data.notificationDaysBeforeDeadline,
      });
    }
    form.reset();
  };

  const handleGoBack = () => {
    navigate("/staff/dashboard/requirements");
  };

  return {
    form,
    programs,
    certificates,
    isLoadingPrograms,
    isLoadingCertificates,
    isCreating,
    isUpdating,
    currentYear,
    maxTargetYear,
    availableDays,
    yearOptions,
    onSubmit,
    handleGoBack,
  };
};
