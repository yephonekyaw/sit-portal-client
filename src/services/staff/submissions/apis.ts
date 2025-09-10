import axiosClient from "@/services/api/client";
import type { ApiResponse } from "@/services/api/types";
import type {
  GetListOfSubmissions,
  VerificationHistoryListResponse,
  VerificationHistoryResponse,
} from "./types";
import type { ManualVerificationFormSchemaType } from "@/types/staff/submission.types";

export const getAllSubmissionsByScheduleId = async (scheduleId: string) =>
  axiosClient
    .get<ApiResponse<GetListOfSubmissions>>(
      `/staff/submissions/schedule/${encodeURIComponent(scheduleId)}`
    )
    .then((res) => res.data);

export const getVerificationHistory = async (submissionId: string) =>
  axiosClient
    .get<ApiResponse<VerificationHistoryListResponse>>(
      `/staff/submissions/${encodeURIComponent(
        submissionId
      )}/verification-history`
    )
    .then((res) => res.data);

export const postVerifySubmission = async (
  data: ManualVerificationFormSchemaType
) => {
  return axiosClient
    .post<ApiResponse<VerificationHistoryResponse>>(
      `/staff/submissions/${encodeURIComponent(data.submissionId)}/verify`,
      data
    )
    .then((res) => res.data);
};
