import type { GetUserNotificationItem } from "@/services/notification/types";

export interface UseNotificationHookState {
  // Data
  notifications: GetUserNotificationItem[];
  unreadNotifications: GetUserNotificationItem[];
  readNotifications: GetUserNotificationItem[];
  unreadCount: number;

  // Loading states
  isLoading: boolean;

  // Actions
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

export interface UseNotificationOptions {
  limit?: number;
  offset?: number;
  enabled?: boolean;
}

export interface NotificationStoreState {
  notifications: GetUserNotificationItem[];
  unreadNotifications: GetUserNotificationItem[];
  readNotifications: GetUserNotificationItem[];
  unreadCount: number;

  setReceivedNotifications: (notifications: GetUserNotificationItem[]) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}
