import type { ProgramRequirementFormSchema } from "@/schemas/staff/prog-reqs.schemas";
import type { GetProgramRequirementsItem } from "@/services/staff/prog-reqs/types";
import type { UseFormReturn } from "react-hook-form";
import type z from "zod";

type ProgramRequirementFormSchemaType = z.infer<
  typeof ProgramRequirementFormSchema
>;

type UpdateProgramRequirementFormSchemaType =
  ProgramRequirementFormSchemaType & {
    id: string;
  };

interface ProgramRequirementStoreState {
  selectedRequirement: GetProgramRequirementsItem | null;
  setSelectedRequirement: (
    requirement: GetProgramRequirementsItem | null
  ) => void;
  clearSelectedRequirement: () => void;

  archiveConfirmModalState: boolean;
  setArchiveConfirmModalState: (state: boolean) => void;

  archiveRequirementId: string | null;
  setArchiveRequirementId: (id: string | null) => void;
}

interface ProgramRequirementFormProps {
  isEdit: boolean;
  requirementId?: string;
}

interface AdvancedSettingsSectionProps {
  form: UseFormReturn<ProgramRequirementFormSchemaType>;
  yearOptions: number[];
  currentYear: number;
}

interface BasicInformationSectionProps {
  form: UseFormReturn<ProgramRequirementFormSchemaType>;
  programs?: {
    data?: Array<{ id: string; programCode: string; programName: string }>;
  };
  certificates?: {
    data?: Array<{ id: string; certCode: string; certName: string }>;
  };
  isEdit: boolean;
  isLoadingPrograms: boolean;
  isLoadingCertificates: boolean;
}

interface DeadlineSettingsSectionProps {
  form: UseFormReturn<ProgramRequirementFormSchemaType>;
  maxTargetYear: number;
  availableDays: number[];
}

interface FormActionsProps {
  isEdit: boolean;
  isSubmitting: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  onGoBack: () => void;
}

interface FormHeaderProps {
  isEdit: boolean;
  onGoBack: () => void;
}

export type {
  ProgramRequirementFormSchemaType,
  UpdateProgramRequirementFormSchemaType,
  ProgramRequirementStoreState,
  DeadlineSettingsSectionProps,
  FormActionsProps,
  ProgramRequirementFormProps,
  AdvancedSettingsSectionProps,
  BasicInformationSectionProps,
  FormHeaderProps,
};
