import axiosClient from "@/services/api/client";
import type { ApiResponse } from "@/services/api/types";
import type {
  StudentRequirementWithSubmission,
  CertificateSubmissionResponse,
} from "./types";

const getStudentRequirements = async (): Promise<
  ApiResponse<StudentRequirementWithSubmission[]>
> =>
  axiosClient
    .get<ApiResponse<StudentRequirementWithSubmission[]>>(
      "/student/requirements/all"
    )
    .then((res) => res.data);

const postCertificate = async (
  data: FormData
): Promise<ApiResponse<CertificateSubmissionResponse>> =>
  axiosClient
    .post<ApiResponse<CertificateSubmissionResponse>>(
      "/student/requirements/certificate",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
    .then((res) => res.data);

export { getStudentRequirements, postCertificate };
