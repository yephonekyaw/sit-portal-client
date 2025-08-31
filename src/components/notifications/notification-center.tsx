import * as React from "react";
import { Bell, BellRing, Check, Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NotificationItem } from "./notification-item";
import { useNotificationStore } from "@/stores/notification.stores";
import { useNavConfigStore } from "@/stores/nav.stores";

interface NotificationCenterProps {
  className?: string;
}

export function NotificationCenter({ className }: NotificationCenterProps) {
  const { currentRole } = useNavConfigStore();
  const {
    notifications,
    unreadCount,
    isLoading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
  } = useNotificationStore();

  const [open, setOpen] = React.useState(false);

  // Fetch notifications when component mounts or role changes
  React.useEffect(() => {
    if (currentRole && (currentRole === "student" || currentRole === "staff")) {
      fetchNotifications(currentRole);
    }
  }, [currentRole, fetchNotifications]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn(
            "relative",
            unreadCount > 0 && "text-blue-600",
            className
          )}
        >
          {unreadCount > 0 ? (
            <BellRing className="h-5 w-5" />
          ) : (
            <Bell className="h-5 w-5" />
          )}
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs flex items-center justify-center"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
          <span className="sr-only">Open notifications</span>
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:min-w-[600px] p-0">
        <div className="flex flex-col h-full">
          {/* Compact Header */}
          <div className="p-4 border-b border-gray-200 pr-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SheetTitle className="text-lg font-semibold text-gray-900">
                  Notifications
                </SheetTitle>
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="bg-red-600 text-white text-xs px-1.5 py-0.5"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </div>
            </div>

            {notifications.length > 0 && (
              <div className="flex items-center gap-1 mt-2">
                {unreadCount > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={markAllAsRead}
                    className="h-7 px-2 text-xs font-medium text-gray-600 hover:bg-gray-100"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Mark all read
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearAll}
                  className="h-7 px-2 text-xs font-medium text-red-600 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Clear all
                </Button>
              </div>
            )}
          </div>

          <SheetDescription className="sr-only">
            View and manage your notifications
          </SheetDescription>

          {/* Notifications Content */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              {isLoading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                  <div className="h-16 w-16 text-red-300 mb-4">⚠️</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Failed to load notifications
                  </h3>
                  <p className="text-sm text-gray-600 max-w-sm mb-4">{error}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      currentRole &&
                      fetchNotifications(currentRole as "student" | "staff")
                    }
                  >
                    Try again
                  </Button>
                </div>
              ) : notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                  <Bell className="h-16 w-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No notifications yet
                  </h3>
                  <p className="text-sm text-gray-600 max-w-sm">
                    We'll notify you when something important happens with your
                    certificates and requirements.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                      onMarkAsRead={markAsRead}
                      onDelete={deleteNotification}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
