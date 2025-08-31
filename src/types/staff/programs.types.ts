import type { programFormSchema } from "@/schemas/staff/programs.schemas";
import type { GetProgramsItem } from "@/services/staff/programs/types";
import type z from "zod";

type ProgramFormSchemaType = z.infer<typeof programFormSchema>;

type UpdateProgramFormSchemaType = Omit<ProgramFormSchemaType, "isActive"> & {
  id: string;
};

interface ProgramStoreState {
  selectedProgram: GetProgramsItem | null;
  setSelectedProgram: (program: GetProgramsItem | null) => void;
  clearSelectedProgram: () => void;

  deleteConfirmModalState: boolean;
  setDeleteConfirmModalState: (state: boolean) => void;

  archiveProgramId: string | null;
  setArchiveProgramId: (id: string | null) => void;
}

interface ProgramFormProps {
  isEdit: boolean;
  programId?: string;
}

export type {
  ProgramFormSchemaType,
  ProgramStoreState,
  ProgramFormProps,
  UpdateProgramFormSchemaType,
};
