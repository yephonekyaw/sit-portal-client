import axiosClient from "@/services/api/client";
import type { ApiResponse } from "@/services/api/types";
import type {
  UnreadNotificationsApiResponse,
  UnreadCountApiResponse,
  MarkAsReadApiResponse,
  MarkAllAsReadApiResponse,
  ClearAllApiResponse,
} from "./types";

export const getUnreadNotifications = async (
  limit: number = 50,
  offset: number = 0
) =>
  axiosClient
    .get<ApiResponse<UnreadNotificationsApiResponse>>(
      "/shared/notifications/unread",
      {
        params: { limit, offset },
      }
    )
    .then((res) => res.data);

export const getUnreadCount = async () =>
  axiosClient
    .get<ApiResponse<UnreadCountApiResponse>>("/shared/notifications/count")
    .then((res) => res.data);

export const markNotificationAsRead = async (notificationId: string) =>
  axiosClient
    .patch<ApiResponse<MarkAsReadApiResponse>>(
      `/shared/notifications/${encodeURIComponent(notificationId)}/read`
    )
    .then((res) => res.data);

export const markAllNotificationsAsRead = async () =>
  axiosClient
    .patch<ApiResponse<MarkAllAsReadApiResponse>>(
      "/shared/notifications/read-all"
    )
    .then((res) => res.data);

export const clearAllNotifications = async () =>
  axiosClient
    .patch<ApiResponse<ClearAllApiResponse>>("/shared/notifications/clear-all")
    .then((res) => res.data);
