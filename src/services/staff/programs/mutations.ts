import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProgram, updateProgram, archiveProgram } from "./apis";
import type { ApiError, ApiResponse } from "@/services/api/types";
import type {
  ProgramFormSchemaType,
  UpdateProgramFormSchemaType,
} from "@/types/staff/program.types";
import type { ProgramResponse } from "./types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useProgramStore } from "@/stores/staff/program.stores";

export const useCreateProgram = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    ApiResponse<ProgramResponse>,
    ApiError,
    ProgramFormSchemaType
  >({
    mutationFn: createProgram,
    onSuccess: () => {
      toast.success("Program created successfully");
      queryClient.invalidateQueries({ queryKey: ["programs"] });
      navigate("/staff/student-management/dashboard/programs");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create program");
    },
  });
};

export const useUpdateProgram = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    ApiResponse<ProgramResponse>,
    ApiError,
    UpdateProgramFormSchemaType
  >({
    mutationFn: updateProgram,
    onSuccess: () => {
      toast.success("Program updated successfully");
      queryClient.invalidateQueries({ queryKey: ["programs"] });
      navigate("/staff/student-management/dashboard/programs");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update program");
    },
  });
};

export const useArchiveProgram = () => {
  const queryClient = useQueryClient();
  const { setArchiveConfirmModalState, setArchiveProgramId } =
    useProgramStore();

  return useMutation<ApiResponse<ProgramResponse>, ApiError, string>({
    mutationFn: archiveProgram,
    onSuccess: () => {
      toast.success("Program archived successfully");
      queryClient.invalidateQueries({ queryKey: ["programs"] });
      setArchiveConfirmModalState(false);
      setArchiveProgramId(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to archive program");
    },
  });
};
