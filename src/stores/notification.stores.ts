import type { NotificationStoreState } from "@/types/notification.types";
import { create } from "zustand";

export const useNotificationStore = create<NotificationStoreState>(
  (set, get) => ({
    notifications: [],
    unreadNotifications: [],
    readNotifications: [],
    unreadCount: 0,

    setReceivedNotifications: (notifications) => {
      const { unreadNotifications, readNotifications } = get();
      const existingIds = new Set(unreadNotifications.map((n) => n.id));
      const newNotifications = notifications.filter(
        (n) => !existingIds.has(n.id)
      );

      if (newNotifications.length > 0) {
        const updatedUnread = [...newNotifications, ...unreadNotifications];
        const allNotifications = [...updatedUnread, ...readNotifications];
        
        set({
          unreadNotifications: updatedUnread,
          notifications: allNotifications,
          unreadCount: updatedUnread.length,
        });
      }
    },

    markAsRead: (notificationId: string) => {
      const { unreadNotifications, readNotifications } = get();

      const notificationToMove = unreadNotifications.find(
        (n) => n.id === notificationId
      );
      if (notificationToMove) {
        const readNotification = {
          ...notificationToMove,
          status: "READ" as const,
          readAt: new Date().toISOString(),
        };
        const updatedUnread = unreadNotifications.filter(
          (n) => n.id !== notificationId
        );
        const updatedRead = [readNotification, ...readNotifications];
        const allNotifications = [...updatedUnread, ...updatedRead];
        
        set({
          unreadNotifications: updatedUnread,
          readNotifications: updatedRead,
          notifications: allNotifications,
          unreadCount: updatedUnread.length,
        });
      }
    },
    markAllAsRead: () => {
      const { unreadNotifications, readNotifications } = get();
      if (unreadNotifications.length > 0) {
        const nowReadNotifications = unreadNotifications.map(
          (notification) => ({
            ...notification,
            status: "READ" as const,
            readAt: new Date().toISOString(),
          })
        );

        const updatedRead = [...nowReadNotifications, ...readNotifications];
        const allNotifications = [...updatedRead]; // Only read notifications now

        set({
          unreadNotifications: [],
          readNotifications: updatedRead,
          notifications: allNotifications,
          unreadCount: 0,
        });
      }
    },
    clearAll: () => {
      set({
        notifications: [],
        unreadNotifications: [],
        readNotifications: [],
        unreadCount: 0,
      });
    },
  })
);
