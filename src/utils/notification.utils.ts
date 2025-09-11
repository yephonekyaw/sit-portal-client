import type { LucideIcon } from "lucide-react";
import {
  TYPE_ICONS,
  TYPE_COLORS, 
  PRIORITY_COLORS,
  DEFAULT_ICON,
  DEFAULT_COLOR,
  DEFAULT_PRIORITY_COLOR,
} from "@/constants/notification.constants";
import type { GetUserNotificationItem } from "@/services/notification/types";

/**
 * Get the appropriate icon component for a notification type code
 */
export const getNotificationTypeIcon = (notificationCode: string): LucideIcon => {
  return TYPE_ICONS[notificationCode as keyof typeof TYPE_ICONS] || DEFAULT_ICON;
};

/**
 * Get the appropriate color classes for a notification type code
 */
export const getNotificationTypeColor = (notificationCode: string): string => {
  return TYPE_COLORS[notificationCode as keyof typeof TYPE_COLORS] || DEFAULT_COLOR;
};

/**
 * Get the appropriate color classes for a notification priority
 */
export const getNotificationPriorityColor = (priority: string): string => {
  const upperPriority = priority.toUpperCase();
  return PRIORITY_COLORS[upperPriority as keyof typeof PRIORITY_COLORS] || DEFAULT_PRIORITY_COLOR;
};

/**
 * Check if a notification is unread based on its status and read_at timestamp
 */
export const isNotificationUnread = (notification: GetUserNotificationItem): boolean => {
  return notification.status !== "READ" && !notification.readAt;
};

/**
 * Get formatted notification title from the notification data
 */
export const getNotificationTitle = (notification: GetUserNotificationItem): string => {
  return notification.subject || `Notification - ${notification.notificationName}`;
};

/**
 * Get formatted notification description from the notification data  
 */
export const getNotificationDescription = (notification: GetUserNotificationItem): string => {
  return notification.body || "No description available";
};

/**
 * Check if a priority badge should be shown (hide medium priority as it's default)
 */
export const shouldShowPriorityBadge = (priority: string): boolean => {
  return priority.toUpperCase() !== "MEDIUM";
};

/**
 * Format notification priority for display
 */
export const formatNotificationPriority = (priority: string): string => {
  return priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase();
};