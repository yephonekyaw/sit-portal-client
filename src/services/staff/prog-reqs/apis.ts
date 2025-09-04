import axiosClient from "@/services/api/client";
import type { ApiResponse } from "@/services/api/types";
import type {
  GetProgramRequirementsItem,
  ProgramRequirementResponse,
} from "./types";
import type {
  ProgramRequirementFormSchemaType,
  UpdateProgramRequirementFormSchemaType,
} from "@/types/staff/prog-reqs.types";

export const getProgramRequirements = async () =>
  axiosClient
    .get<ApiResponse<GetProgramRequirementsItem[]>>(
      "/staff/program-requirements"
    )
    .then((res) => res.data);

export const createProgramRequirement = async (
  data: ProgramRequirementFormSchemaType
) =>
  axiosClient
    .post<ApiResponse<ProgramRequirementResponse>>(
      "/staff/program-requirements",
      data
    )
    .then((res) => res.data);

export const updateProgramRequirement = async (
  data: UpdateProgramRequirementFormSchemaType
) =>
  axiosClient
    .put<ApiResponse<ProgramRequirementResponse>>(
      `/staff/program-requirements/${data.id}`,
      data
    )
    .then((res) => res.data);

export const archiveProgramRequirement = async (id: string) =>
  axiosClient
    .patch<ApiResponse<ProgramRequirementResponse>>(
      `/staff/program-requirements/${id}/archive`
    )
    .then((res) => res.data);
