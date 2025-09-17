import type { programFormSchema } from "@/schemas/staff/program.schemas";
import type { GetProgramsItem } from "@/services/staff/programs/types";
import type z from "zod";

type ProgramFormSchemaType = z.infer<typeof programFormSchema>;

type UpdateProgramFormSchemaType = Omit<ProgramFormSchemaType, "isActive"> & {
  id: string;
};

interface ProgramStoreState {
  selectedProgram: GetProgramsItem | null;
  archiveConfirmModalState: boolean;
  archiveProgramId: string | null;

  setSelectedProgram: (program: GetProgramsItem | null) => void;
  clearSelectedProgram: () => void;
  setArchiveConfirmModalState: (state: boolean) => void;
  setArchiveProgramId: (id: string | null) => void;
  clearProgramStore: () => void;
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
