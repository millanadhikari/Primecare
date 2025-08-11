"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "sonner";

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

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (
    notification: Omit<Notification, "id" | "createdAt" | "readStatus">
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
}

interface NotificationProviderProps {
  children: ReactNode;
}

// Sample notifications for demo
const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "New appointment scheduled",
    message:
      "James Wilson has scheduled an appointment for tomorrow at 9:00 AM",
    type: "appointment",
    readStatus: false,
    createdAt: "2025-01-12T10:30:00.000Z",
    actionUrl: "/appointments",
    metadata: {
      clientName: "James Wilson",
      appointmentTime: "9:00 AM",
    },
  },
  {
    id: "2",
    title: "New message received",
    message: "Sarah Johnson sent a message about her upcoming therapy session",
    type: "message",
    readStatus: false,
    createdAt: "2025-01-12T09:15:00.000Z",
    actionUrl: "/messages/2",
    metadata: {
      senderName: "Sarah Johnson",
    },
  },
  {
    id: "3",
    title: "Document uploaded",
    message: "Medical records have been uploaded for Michael Chen",
    type: "success",
    readStatus: true,
    createdAt: "2025-01-12T08:45:00.000Z",
    actionUrl: "/clients/3",
    metadata: {
      clientName: "Michael Chen",
      documentName: "Medical Records",
    },
  },
  {
    id: "4",
    title: "System maintenance",
    message: "Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM",
    type: "warning",
    readStatus: false,
    createdAt: "2025-01-11T16:00:00.000Z",
    actionUrl: "/settings",
  },
  {
    id: "5",
    title: "Payment processed",
    message:
      "Payment of $250 has been successfully processed for Emma Rodriguez",
    type: "success",
    readStatus: true,
    createdAt: "2025-01-11T14:30:00.000Z",
    metadata: {
      clientName: "Emma Rodriguez",
    },
  },
];
const production = "https://primebackend.onrender.com";
// const production = "http://localhost:3000";


export function NotificationProvider({ children }: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // ✅ Fetch existing notifications from backend on load
  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const res = await fetch(`${production}/api/notifications`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          cache: "no-store", // Optional: disable Next.js caching
        });
        if (!res.ok) throw new Error("Failed to fetch notifications");
        const data = await res.json();
        setNotifications(data);
        console.log("Fetched notifications:", data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);
  const unreadCount = notifications.filter((n) => !n.readStatus).length;
  const addNotification = (
    data: Omit<Notification, "id" | "createdAt" | "readStatus">
  ) => {
    const newNotification: Notification = {
      ...data,
      id: Date.now().toString(), // This ID will be real from backend for persisted notifications
      createdAt: new Date().toISOString(),
      readStatus: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);

    toast(data.title, {
      description: data.message,
      action: data.actionUrl
        ? {
            label: "View",
            onClick: () => (window.location.href = data.actionUrl!),
          }
        : undefined,
    });
  };

  const markAsRead = async (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, readStatus: true } : n))
    );
    const token = localStorage.getItem("accessToken");
    try {
      const res = await fetch(
        `${production}/api/notifications/${id}/read`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        // If unauthorized or another error
        console.error("Failed to mark as read, status:", res.status);
        // Optionally revert UI change or notify user
      }
    } catch (e) {
      console.error("Failed to mark as read", e);
    }
  };

  const markAllAsRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, readStatus: true })));
    const token = localStorage.getItem("accessToken");
    try {
      const res = await fetch(
        `${production}/api/notifications/read-all`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        // If unauthorized or another error
        console.error("Failed to mark as read all, status:", res.status);
        // Optionally revert UI change or notify user
      }
    } catch (e) {
      console.error("Failed to mark as read all", e);
    }
  };

  const deleteNotification = async (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    const token = localStorage.getItem("accessToken");
    try {
      const res = await fetch(`${production}/api/notifications/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        // If unauthorized or another error
        console.error("Failed to delete notification", res.status);
        // Optionally revert UI change or notify user
      }
    } catch (e) {
      console.error("Failed to delete notification", e);
    }
  };

  const clearAll = async () => {
    setNotifications([]);
    const token = localStorage.getItem("accessToken");
    try {
      const res = await fetch(`${production}/api/notifications/clear`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        // If unauthorized or another error
        console.error("Failed to clear all notification", res.status);
        // Optionally revert UI change or notify user
      }
    } catch (e) {
      console.error("Failed to clear all notification", e);
    }
  };
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
