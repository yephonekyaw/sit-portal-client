import axiosClient from "@/services/api/client";
import type { ApiResponse } from "@/services/api/types";
import type {
  StudentRequirementWithSubmission,
  RequirementSubmissionRequest,
  RequirementSubmissionResponse,
} from "./types";

const getStudentRequirements = async (): Promise<
  ApiResponse<StudentRequirementWithSubmission[]>
> =>
  axiosClient
    .get<ApiResponse<StudentRequirementWithSubmission[]>>(
      "/student/requirements/all"
    )
    .then((res) => res.data);

const postSubmitRequirement = async (data: RequirementSubmissionRequest) =>
  axiosClient
    .postForm<ApiResponse<RequirementSubmissionResponse>>(
      "/student/requirements/submit",
      data
    )
    .then((res) => res.data);

export { getStudentRequirements, postSubmitRequirement };
