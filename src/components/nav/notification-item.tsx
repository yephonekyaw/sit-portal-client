import * as React from "react";
import {
  Check,
  Clock,
  FileText,
  ShieldCheck,
  ShieldX,
  Trash2,
  AlertTriangle,
  Calendar,
  Upload,
  Edit3,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import ReactMarkdown from "react-markdown";
import type {
  Notification,
  NotificationPriority,
} from "@/types/notification.types";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (notificationId: string) => void;
  onDelete: (notificationId: string) => void;
  className?: string;
}

const getTypeIcon = (notificationTypeId: string) => {
  switch (notificationTypeId) {
    case "cert-submission-new":
    case "cert-submission-success":
      return <Upload className="h-4 w-4" />;
    case "cert-submission-updated":
      return <Edit3 className="h-4 w-4" />;
    case "cert-submission-approved":
    case "cert-verification-request":
      return <ShieldCheck className="h-4 w-4" />;
    case "cert-submission-rejected":
      return <ShieldX className="h-4 w-4" />;
    case "student-query":
      return <HelpCircle className="h-4 w-4" />;
    case "requirement-reminder":
      return <Clock className="h-4 w-4" />;
    case "requirement-warning":
      return <AlertTriangle className="h-4 w-4" />;
    case "requirement-overdue":
      return <Calendar className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

const getPriorityColor = (priority: NotificationPriority) => {
  switch (priority) {
    case "urgent":
      return "bg-red-100 border-red-300 text-red-900";
    case "high":
      return "bg-orange-100 border-orange-300 text-orange-900";
    case "medium":
      return "bg-yellow-100 border-yellow-300 text-yellow-900";
    case "low":
      return "bg-blue-100 border-blue-300 text-blue-900";
    default:
      return "bg-gray-100 border-gray-300 text-gray-900";
  }
};

const getTypeColor = (notificationTypeId: string) => {
  switch (notificationTypeId) {
    case "cert-submission-new":
    case "cert-submission-success":
    case "cert-submission-updated":
      return "text-blue-700 bg-blue-100";
    case "cert-submission-approved":
    case "cert-verification-request":
      return "text-green-700 bg-green-100";
    case "cert-submission-rejected":
      return "text-red-700 bg-red-100";
    case "student-query":
      return "text-purple-700 bg-purple-100";
    case "requirement-reminder":
      return "text-blue-700 bg-blue-100";
    case "requirement-warning":
      return "text-orange-700 bg-orange-100";
    case "requirement-overdue":
      return "text-red-700 bg-red-100";
    default:
      return "text-gray-700 bg-gray-100";
  }
};

const getFormattedTitle = (notification: Notification): string => {
  // Use the subject from the backend templates directly
  return notification.subject;
};

const getFormattedDescription = (notification: Notification): string => {
  // Use the body from the backend templates directly
  return notification.body;
};

export function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
  className,
}: NotificationItemProps) {
  const isUnread = notification.recipient_status !== "read";
  const timeAgo = formatDistanceToNow(new Date(notification.created_at), {
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

  const title = getFormattedTitle(notification);
  const description = getFormattedDescription(notification);

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
            getTypeColor(notification.notification_type_id)
          )}
        >
          {getTypeIcon(notification.notification_type_id)}
        </div>

        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <p className={cn("text-sm leading-5 font-semibold text-gray-900")}>
              {title}
            </p>
            {notification.priority !== "medium" && (
              <Badge
                variant="outline"
                className={cn(
                  "text-xs shrink-0",
                  getPriorityColor(notification.priority)
                )}
              >
                {notification.priority}
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
