import { useEffect, useCallback } from "react";
import {
  useGetUnreadNotifications,
  useGetUnreadCount,
} from "@/services/notification/queries";
import {
  useMarkNotificationAsRead,
  useMarkAllNotificationsAsRead,
  useClearAllNotifications,
  useClearNotification,
} from "@/services/notification/mutations";
import { useNotificationStore } from "@/stores/notification.stores";
import type {
  UseNotificationOptions,
  UseNotificationHookState,
} from "@/types/notification.types";

export const useNotification = (
  options: UseNotificationOptions = {}
): UseNotificationHookState => {
  const { limit = 50, offset = 0, enabled = true } = options;

  const {
    notifications,
    unreadNotifications,
    readNotifications,
    unreadCount: storeUnreadCount,
    setReceivedNotifications,
    markAsRead: storeMarkAsRead,
    markAllAsRead: storeMarkAllAsRead,
    clear: storeClear,
    clearNotificationStore,
  } = useNotificationStore();

  // Query hooks
  const { data: notificationsData, isLoading: isLoadingNotifications } =
    useGetUnreadNotifications(limit, offset, enabled);
  const { data: unreadCountData, isLoading: isLoadingCount } =
    useGetUnreadCount(enabled);

  // Mutation hooks
  const markAsReadMutation = useMarkNotificationAsRead();
  const markAllAsReadMutation = useMarkAllNotificationsAsRead();
  const clearMutation = useClearNotification();
  const clearAllMutation = useClearAllNotifications();

  const unreadCount = unreadCountData?.data?.unreadCount || storeUnreadCount;
  const isLoading = isLoadingNotifications || isLoadingCount;

  // Add new unread notifications to store
  useEffect(() => {
    if (
      notificationsData?.data?.notifications &&
      notificationsData.data.notifications.length > 0
    ) {
      setReceivedNotifications(notificationsData.data.notifications);
    }
  }, [notificationsData, setReceivedNotifications]);

  // Mark single notification as read (update store + call API)
  const handleMarkAsRead = useCallback(
    (notificationId: string) => {
      storeMarkAsRead(notificationId);
      markAsReadMutation.mutate(notificationId);
    },
    [storeMarkAsRead, markAsReadMutation]
  );

  // Mark all notifications as read (update store + call API)
  const handleMarkAllAsRead = useCallback(() => {
    storeMarkAllAsRead();
    markAllAsReadMutation.mutate();
  }, [storeMarkAllAsRead, markAllAsReadMutation]);

  // Clear single notification (update store + call API)
  const handleClear = useCallback(
    (notificationId: string) => {
      storeClear(notificationId);
      clearMutation.mutate(notificationId);
    },
    [storeClear, clearMutation]
  );

  // Clear all notifications (update store + call API)
  const handleClearAll = useCallback(() => {
    clearNotificationStore();
    clearAllMutation.mutate();
  }, [clearNotificationStore, clearAllMutation]);

  return {
    // Data - use store data directly
    notifications,
    unreadNotifications,
    readNotifications,
    unreadCount,

    // Loading states
    isLoading,

    // Actions
    markAsRead: handleMarkAsRead,
    markAllAsRead: handleMarkAllAsRead,
    clear: handleClear,
    clearAll: handleClearAll,
  };
};
