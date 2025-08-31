"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { format, formatDistanceToNow } from "date-fns";
import {
  Bell,
  X,
  Check,
  CheckCheck,
  Trash2,
  Settings,
  Calendar,
  MessageSquare,
  Users,
  FileText,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
  Clock,
  MoreHorizontal,
  FileChartColumn,
  ListTodo,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNotifications } from "./notification-provider";

interface Notification {
  id: string;
  title: string;
  message: string;
  type:
    | "info"
    | "success"
    | "warning"
    | "error"
    | "appointment"
    | "message"
    | "system";
  readStatus: boolean;
  createdAt: string;
  actionUrl?: string;
  avatar?: string;
  metadata?: {
    clientName?: string;
    appointmentTime?: string;
    senderName?: string;
    documentName?: string;
  };
}

export function NotificationDropdown() {
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
  } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return <Calendar className="h-4 w-4 text-blue-500" />;
      case "message":
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      case "client_assignment":
        return <Users className="h-4 w-4 text-purple-500" />;
      case "project_assignment":
        return <FileChartColumn  className="h-4 w-4 text-purple-500" />;
      case "task_assignment":
        return <ListTodo  className="h-4 w-4 text-purple-500" />;
      case "system":
        return <Settings className="h-4 w-4 text-gray-500" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getNotificationColor = (type: string, readStatus: boolean) => {
    if (readStatus) return "text-muted-foreground";

    switch (type) {
      case "error":
        return "text-red-600 dark:text-red-400";
      case "warning":
        return "text-yellow-600 dark:text-yellow-400";
      case "success":
        return "text-green-600 dark:text-green-400";
      default:
        return "text-foreground";
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    console.log("Notification clicked:", notification);
    if (!notification.readStatus) {
      markAsRead(notification.id);
    }

    if (notification.actionUrl) {
      window.location.href = `${notification.actionUrl}`;
    }
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    toast.success("All notifications marked as read");
  };

  const handleClearAll = () => {
    clearAll();
    toast.success("All notifications cleared");
  };

  const formatNotificationTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return formatDistanceToNow(date, { addSuffix: true });
    } else {
      return format(date, "MMM dd, HH:mm");
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative border-none">
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full p-0 text-xs flex items-center justify-center"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 p-0 flex flex-col max-h-[500px]"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b shrink-0 bg-background">
          <h3 className="font-semibold">Notifications</h3>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMarkAllAsRead}
                className="text-xs"
              >
                <CheckCheck className="h-3 w-3 mr-1" />
                Mark all read
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearAll}
                  className="w-full justify-start text-xs text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3 mr-2" />
                  Clear all
                </Button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* SCROLLABLE LIST */}
        <ScrollArea className="flex-1">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No notifications</p>
              <p className="text-xs text-muted-foreground">
                You're all caught up!
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "group relative p-4 hover:bg-accent cursor-pointer transition-colors",
                    !notification.readStatus && "bg-blue-50 dark:bg-blue-950/20"
                  )}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar/Icon */}
                    <div className="flex-shrink-0 mt-0.5">
                      {notification.avatar ? (
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={notification.avatar} />
                          <AvatarFallback className="text-xs">
                            {notification.metadata?.senderName
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("") || "N"}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                          {getNotificationIcon(notification.type)}
                        </div>
                      )}
                    </div>

                    {/* Text content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p
                            className={cn(
                              "text-sm font-medium line-clamp-1",
                              getNotificationColor(
                                notification.type,
                                notification.readStatus
                              )
                            )}
                          >
                            {notification.title}
                          </p>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                            {notification.message}
                          </p>

                          {/* Metadata badges */}
                          {notification.metadata && (
                            <div className="flex items-center gap-2 mt-2">
                              {notification.metadata.clientName && (
                                <Badge variant="outline" className="text-xs">
                                  <Users className="h-3 w-3 mr-1" />
                                  {notification.metadata.clientName}
                                </Badge>
                              )}
                              {notification.metadata.appointmentTime && (
                                <Badge variant="outline" className="text-xs">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {notification.metadata.appointmentTime}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-1">
                          {!notification.readStatus && (
                            <div className="h-2 w-2 rounded-full bg-blue-500" />
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                              toast.success("Notification deleted");
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      {/* Time + Mark as Read */}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-muted-foreground">
                          {formatNotificationTime(notification.createdAt)}
                        </span>

                        {!notification.readStatus && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification.id);
                              toast.success("Marked as read");
                            }}
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Mark read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {/* FIXED FOOTER */}
        {notifications.length > 0 && (
          <div className="shrink-0 border-t p-2 bg-background sticky bottom-0">
            <Button variant="ghost" size="sm" className="w-full text-xs">
              <Settings className="h-3 w-3 mr-2" />
              Notification Settings
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
