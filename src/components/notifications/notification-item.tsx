import * as React from "react";
import { Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";
import type { GetUserNotificationItem } from "@/services/notification/types";
import {
  getNotificationTypeIcon,
  getNotificationTypeColor,
  getNotificationPriorityColor,
  isNotificationUnread,
  getNotificationTitle,
  getNotificationDescription,
  shouldShowPriorityBadge,
  formatNotificationPriority,
} from "@/utils/notification.utils";

interface NotificationItemProps {
  notification: GetUserNotificationItem;
  onMarkAsRead: (notificationId: string) => void;
  onDelete: (notificationId: string) => void;
  className?: string;
}

export function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
  className,
}: NotificationItemProps) {
  const isUnread = isNotificationUnread(notification);
  const timeAgo = formatDistanceToNow(new Date(notification.createdAt), {
    addSuffix: true,
  });

  const handleMarkAsRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isUnread) {
      onMarkAsRead(notification.id);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(notification.id);
  };

  const title = getNotificationTitle(notification);
  const description = getNotificationDescription(notification);
  const TypeIcon = getNotificationTypeIcon(notification.notificationCode);
  const typeColor = getNotificationTypeColor(notification.notificationCode);
  const priorityColor = getNotificationPriorityColor(notification.priority);

  return (
    <div
      className={cn(
        "group relative p-4 hover:bg-gray-50 cursor-pointer transition-colors",
        isUnread && "bg-blue-50/50 border-l-4 border-l-blue-500",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div
          className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full shrink-0 mt-0.5",
            typeColor
          )}
        >
          <TypeIcon className="h-4 w-4" />
        </div>

        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <p className={cn("text-sm leading-5 font-semibold text-gray-900")}>
              {title}
            </p>
            {shouldShowPriorityBadge(notification.priority) && (
              <Badge
                variant="outline"
                className={cn(
                  "text-xs shrink-0",
                  priorityColor
                )}
              >
                {formatNotificationPriority(notification.priority)}
              </Badge>
            )}
          </div>

          <div className="text-xs text-gray-600 leading-4">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <span className="block text-xs text-gray-800 leading-relaxed">
                    {children}
                  </span>
                ),

                code: ({ children }) => (
                  <span className="font-medium italic text-gray-800">
                    {children}
                  </span>
                ),

                strong: ({ children }) => (
                  <span className="font-semibold text-gray-900">
                    {children}
                  </span>
                ),
              }}
            >
              {description}
            </ReactMarkdown>
          </div>

          <div className="flex items-center justify-between pt-1">
            <p className="text-xs text-gray-500">{timeAgo}</p>

            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              {isUnread && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMarkAsRead}
                  className="h-6 w-6 p-0 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  title="Mark as read"
                >
                  <Check className="h-3 w-3" />
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                className="h-6 w-6 p-0 text-gray-500 hover:text-red-600 hover:bg-red-50"
                title="Delete notification"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isUnread && (
        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full" />
      )}
    </div>
  );
}
