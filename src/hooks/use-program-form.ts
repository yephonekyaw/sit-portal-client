import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useProgramStore } from "@/stores/staff/program.stores";
import {
  useCreateProgram,
  useUpdateProgram,
} from "@/services/staff/programs/mutations";
import { programFormSchema } from "@/schemas/staff/program.schemas";
import type {
  ProgramFormProps,
  ProgramFormSchemaType,
} from "@/types/staff/program.types";

export const useProgramForm = ({ isEdit, programId }: ProgramFormProps) => {
  const navigate = useNavigate();
  const { selectedProgram } = useProgramStore();
  const { mutateAsync: create, isPending: isCreating } = useCreateProgram();
  const { mutateAsync: update, isPending: isUpdating } = useUpdateProgram();

  const form = useForm<ProgramFormSchemaType>({
    resolver: zodResolver(programFormSchema),
    defaultValues: {
      programCode: "",
      programName: "",
      description: "",
      durationYears: 4,
      isActive: true,
    },
  });

  // Populate form when program data is loaded
  useEffect(() => {
    if (selectedProgram && isEdit) {
      form.reset({
        programCode: selectedProgram.programCode,
        programName: selectedProgram.programName,
        description: selectedProgram.description,
        durationYears: selectedProgram.durationYears,
        isActive: selectedProgram.isActive,
      });
    }
  }, [selectedProgram, isEdit, form]);

  const onSubmit = async (data: ProgramFormSchemaType) => {
    if (isEdit && programId) {
      await update({
        id: programId,
        ...data,
        durationYears: data.durationYears === 0 ? 4 : data.durationYears,
      });
    } else {
      await create({
        ...data,
        durationYears: data.durationYears === 0 ? 4 : data.durationYears,
      });
    }
  };

  const handleGoBack = () => {
    navigate("/staff/dashboard/programs");
  };

  return {
    form,
    selectedProgram,
    isCreating,
    isUpdating,
    onSubmit,
    handleGoBack,
  };
};
