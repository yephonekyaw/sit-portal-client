export type GetUserNotificationItem = {
  id: string;
  notificationId: string;
  notificationCode: string;
  notificationName: string;
  entityId: string;
  entityType: string;
  subject: string;
  body: string;
  priority: string;
  status: string;
  inAppEnabled: boolean;
  lineAppEnabled: boolean;
  isRead: boolean;
  actorType: string;
  createdAt: string; // ISO format
  deliveredAt?: string | null; // ISO format
  readAt?: string | null; // ISO format
  scheduledFor?: string | null; // ISO format
  expiresAt?: string | null; // ISO format
  error?: string | null;
};

export type UnreadNotificationsApiResponse = {
  notifications: GetUserNotificationItem[];
  unreadCount: number;
  limit: number;
  offset: number;
  hasMore: boolean;
};

export type UnreadCountApiResponse = {
  unreadCount: number;
};

export type MarkAsReadApiResponse = {
  unreadCount: number;
};

export type MarkAllAsReadApiResponse = {
  allAsReadCount: number;
};

export type ClearAllApiResponse = {
  clearedCount: number;
};
