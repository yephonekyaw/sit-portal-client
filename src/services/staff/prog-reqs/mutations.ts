import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createProgramRequirement,
  updateProgramRequirement,
  archiveProgramRequirement,
} from "./apis";
import type { ApiError, ApiResponse } from "@/services/api/types";
import type {
  ProgramRequirementFormSchemaType,
  UpdateProgramRequirementFormSchemaType,
} from "@/types/staff/prog-req.types";
import type { ProgramRequirementResponse } from "./types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useProgramRequirementStore } from "@/stores/staff/prog-req.stores";

export const useCreateProgramRequirement = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    ApiResponse<ProgramRequirementResponse>,
    ApiError,
    ProgramRequirementFormSchemaType
  >({
    mutationFn: createProgramRequirement,
    onSuccess: () => {
      toast.success("Program requirement created successfully");
      queryClient.invalidateQueries({ queryKey: ["program", "requirements"] });
      navigate("/staff/student-management/dashboard/requirements");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to create program requirement"
      );
    },
  });
};

export const useUpdateProgramRequirement = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    ApiResponse<ProgramRequirementResponse>,
    ApiError,
    UpdateProgramRequirementFormSchemaType
  >({
    mutationFn: updateProgramRequirement,
    onSuccess: () => {
      toast.success("Program requirement updated successfully");
      queryClient.invalidateQueries({ queryKey: ["program", "requirements"] });
      navigate("/staff/student-management/dashboard/requirements");
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to update program requirement"
      );
    },
  });
};

export const useArchiveProgramRequirement = () => {
  const queryClient = useQueryClient();
  const { setArchiveConfirmModalState, setArchiveRequirementId } =
    useProgramRequirementStore();

  return useMutation<ApiResponse<ProgramRequirementResponse>, ApiError, string>(
    {
      mutationFn: archiveProgramRequirement,
      onSuccess: () => {
        toast.success("Program requirement archived successfully");
        queryClient.invalidateQueries({
          queryKey: ["program", "requirements"],
        });
        setArchiveConfirmModalState(false);
        setArchiveRequirementId(null);
      },
      onError: (error) => {
        toast.error(
          error.response?.data?.message ||
            "Failed to archive program requirement"
        );
      },
    }
  );
};
