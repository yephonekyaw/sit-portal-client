export type NotificationPriority = "low" | "medium" | "high" | "urgent";

export type NotificationStatus =
  | "pending"
  | "delivered"
  | "read"
  | "failed"
  | "expired";

export type ActorType = "user" | "system" | "scheduled";

// Core notification data from the notifications table
export interface NotificationData {
  id: string;
  notification_type_id: string;
  entity_id: string;
  actor_type: ActorType;
  actor_id?: string;
  subject: string;
  body: string;
  priority: NotificationPriority;
  notification_metadata?: Record<string, unknown>;
  scheduled_for?: string;
  expires_at?: string;
  created_at: string;
  updated_at?: string;
}

// Notification recipient data from the notification_recipients table
export interface NotificationRecipientData {
  id: string;
  notification_id: string;
  recipient_id: string;
  in_app_enabled: boolean;
  microsoft_teams_enabled: boolean;
  status: NotificationStatus;
  microsoft_teams_sent_at?: string;
  delivered_at?: string;
  read_at?: string;
  created_at: string;
  updated_at?: string;
}

// Combined notification with recipient info (what we actually work with in the UI)
export interface NotificationWithRecipient {
  // Notification data
  id: string;
  notification_type_id: string;
  entity_id: string;
  actor_type: ActorType;
  actor_id?: string;
  subject: string;
  body: string;
  priority: NotificationPriority;
  notification_metadata?: Record<string, unknown>;
  scheduled_for?: string;
  expires_at?: string;
  created_at: string;
  updated_at?: string;

  // Recipient data (for the current user)
  recipient_id: string;
  recipient_status: NotificationStatus;
  delivered_at?: string;
  read_at?: string;
  in_app_enabled: boolean;
  microsoft_teams_enabled: boolean;
}

// For backward compatibility with existing components
export type Notification = NotificationWithRecipient;

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;

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

export interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (notificationId: string) => void;
  onDelete: (notificationId: string) => void;
  className?: string;
}
