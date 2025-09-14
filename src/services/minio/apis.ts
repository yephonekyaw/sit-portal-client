import axiosClient from "@/services/api/client";
import type { ApiResponse } from "@/services/api/types";
import type { GetPresignedUrlParams, PresignedUrlApiResponse } from "./types";

export const generateFilePresignedUrl = async ({
  objectName,
  expiresInHours = 24,
}: GetPresignedUrlParams) =>
  axiosClient
    .get<ApiResponse<PresignedUrlApiResponse>>(
      `/shared/minio/files/${encodeURIComponent(objectName)}/presigned-url`,
      {
        params: { expires_in_hours: expiresInHours },
      }
    )
    .then((res) => res.data);
