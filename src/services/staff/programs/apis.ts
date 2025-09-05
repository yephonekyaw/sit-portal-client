import axiosClient from "@/services/api/client";
import type { ApiResponse } from "@/services/api/types";
import type { GetProgramsItem, ProgramResponse } from "./types";
import type {
  ProgramFormSchemaType,
  UpdateProgramFormSchemaType,
} from "@/types/staff/program.types";

const getPrograms = async () =>
  axiosClient
    .get<ApiResponse<GetProgramsItem[]>>("/staff/programs")
    .then((res) => res.data);

const createProgram = async (data: ProgramFormSchemaType) =>
  axiosClient
    .post<ApiResponse<ProgramResponse>>("/staff/programs", data)
    .then((res) => res.data);

const updateProgram = async (data: UpdateProgramFormSchemaType) =>
  axiosClient
    .put<ApiResponse<ProgramResponse>>(
      `/staff/programs/${encodeURIComponent(data.id)}`,
      data
    )
    .then((res) => res.data);

const archiveProgram = async (id: string) =>
  axiosClient
    .patch<ApiResponse<ProgramResponse>>(
      `/staff/programs/${encodeURIComponent(id)}/archive`
    )
    .then((res) => res.data);

export { getPrograms, createProgram, updateProgram, archiveProgram };
