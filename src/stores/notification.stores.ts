import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Notification,
  NotificationStatus,
} from "@/types/notification.types";
import {
  getCurrentUserId,
  mockNotificationsByUser,
} from "@/mock/notifications.mock";

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;

  // Data fetching
  fetchNotifications: (role: "student" | "staff") => Promise<void>;

  // Actions
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;

  // Computed
  getUnreadCount: () => number;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      isLoading: false,
      error: null,

      fetchNotifications: async (role: "student" | "staff") => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 300));

          const recipientId = getCurrentUserId(role);
          const allNotifications = mockNotificationsByUser[recipientId] || [];

          // Sort notifications (unread first, then by date)
          const sortedNotifications = allNotifications.sort((a, b) => {
            const aUnread = a.recipient_status !== "read";
            const bUnread = b.recipient_status !== "read";

            if (aUnread && !bUnread) return -1;
            if (!aUnread && bUnread) return 1;

            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          });

          set({ notifications: sortedNotifications, isLoading: false });
          get().getUnreadCount();
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Failed to fetch notifications",
            isLoading: false,
          });
        }
      },

      setNotifications: (notifications) => {
        set({ notifications });
        get().getUnreadCount();
      },

      addNotification: (notification) => {
        set((state) => ({
          notifications: [notification, ...state.notifications],
        }));
        get().getUnreadCount();
      },

      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((notification) =>
            notification.id === id
              ? {
                  ...notification,
                  recipient_status: "read" as NotificationStatus,
                  read_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                }
              : notification
          ),
        }));
        get().getUnreadCount();
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((notification) => ({
            ...notification,
            recipient_status: "read" as NotificationStatus,
            read_at:
              notification.recipient_status !== "read"
                ? new Date().toISOString()
                : notification.read_at,
            updated_at: new Date().toISOString(),
          })),
        }));
        set({ unreadCount: 0 });
      },

      deleteNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        }));
        get().getUnreadCount();
      },

      clearAll: () => {
        set({ notifications: [], unreadCount: 0 });
      },

      getUnreadCount: () => {
        const { notifications } = get();
        const unreadCount = notifications.filter(
          (n) => n.recipient_status !== "read"
        ).length;
        set({ unreadCount });
        return unreadCount;
      },
    }),
    {
      name: "notification-storage",
      partialize: (state) => ({
        notifications: state.notifications,
        unreadCount: state.unreadCount,
        // Don't persist loading states or errors
      }),
    }
  )
);
