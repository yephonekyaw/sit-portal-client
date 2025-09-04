import axiosClient from "@/services/api/client";
import type { ApiResponse } from "@/services/api/types";
import type { GetAcademicYearsItem } from "./types";

const getAcademicYears = async () =>
  axiosClient
    .get<ApiResponse<GetAcademicYearsItem[]>>("/staff/academic-years")
    .then((res) => res.data);

export { getAcademicYears };