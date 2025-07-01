import * as React from "react";
import { Bell, CheckCircle, AlertTriangle, Info, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "success" | "warning" | "info" | "error";
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Certificate Verified",
    description: "Your CS degree certificate has been successfully verified.",
    time: "2 hours ago",
    read: false,
    type: "success",
  },
  {
    id: "2",
    title: "Review Required",
    description: "Your transcript needs manual review by staff.",
    time: "1 day ago",
    read: false,
    type: "warning",
  },
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "success":
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-amber-600" />;
    case "error":
      return <X className="h-4 w-4 text-red-600" />;
    default:
      return <Info className="h-4 w-4 text-blue-600" />;
  }
};

export function NotificationMenu() {
  const [notifications, setNotifications] =
    React.useState<Notification[]>(mockNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors relative">
          <Bell className="h-5 w-5 text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 p-0" align="end" forceMount>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all read
              </Button>
            )}
          </div>
        </div>
        <ScrollArea className="h-80">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 text-center p-4">
              <Bell className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm font-medium text-gray-900">
                No notifications
              </p>
            </div>
          ) : (
            <div className="p-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="group relative rounded-xl p-3 mb-2 cursor-pointer transition-all duration-200 hover:bg-gray-50"
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {notification.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
