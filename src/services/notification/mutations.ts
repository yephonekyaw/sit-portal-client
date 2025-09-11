import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  markNotificationAsRead,
  markAllNotificationsAsRead,
  clearAllNotifications,
} from "./apis";
import { toast } from "sonner";
import type { ApiError, ApiResponse } from "@/services/api/types";
import type {
  MarkAsReadApiResponse,
  MarkAllAsReadApiResponse,
  ClearAllApiResponse,
} from "./types";

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<MarkAsReadApiResponse>,
    ApiError,
    string // notificationId
  >({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data.message || "Failed to mark notification as read"
      );
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<MarkAllAsReadApiResponse>, ApiError, void>({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data.message ||
          "Failed to mark all notifications as read"
      );
    },
  });
};

export const useClearAllNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<ClearAllApiResponse>, ApiError, void>({
    mutationFn: clearAllNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
    },
    onError: (error) => {
      toast.error(
        error.response?.data.message || "Failed to clear notifications"
      );
    },
  });
};
