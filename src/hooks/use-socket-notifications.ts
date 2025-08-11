"use client";

import { useEffect } from "react";
import socketManager from "@/lib/socket";
import { useNotifications } from "@/components/notifications/notification-provider";

export function useSocketNotifications(userId?: string) {
  const { addNotification } = useNotifications();

  useEffect(() => {
    // Connect to socket
    const socket = socketManager.connect(userId);

    if (!socket) {
      console.error("Failed to connect to socket");
      return;
    }

    // Handle socket notifications
    const handleSocketNotification = (event: CustomEvent) => {
      const notificationData = event.detail;
      addNotification({
        title: notificationData.title,
        message: notificationData.message,
        type: notificationData.type,
        actionUrl: notificationData.actionUrl,
        metadata: notificationData.metadata,
      });
    };

    // Handle appointment updates
    const handleAppointmentUpdate = (event: CustomEvent) => {
      const data = event.detail;
      addNotification({
        title: "Appointment Updated",
        message: `Appointment status changed to ${data.status}`,
        type: "appointment",
        actionUrl: `/appointments/${data.id}`,
        metadata: {
          clientName: data.clientName,
          appointmentTime: data.time,
        },
      });
    };

    // Handle new messages
    const handleMessageReceived = (event: CustomEvent) => {
      const data = event.detail;
      addNotification({
        title: "New Message",
        message: `You have a new message from ${data.senderName}`,
        type: "message",
        actionUrl: `/messages/${data.id}`,
        metadata: {
          senderName: data.senderName,
        },
      });
    };

    // Handle system alerts
    const handleSystemAlert = (event: CustomEvent) => {
      const data = event.detail;
      addNotification({
        title: data.title || "System Alert",
        message: data.message,
        type: data.type || "warning",
        actionUrl: data.actionUrl,
      });
    };

    // Add event listeners
    window.addEventListener("socket-notification", handleSocketNotification as EventListener);
    window.addEventListener("appointment-update", handleAppointmentUpdate as EventListener);
    window.addEventListener("message-received", handleMessageReceived as EventListener);
    window.addEventListener("system-alert", handleSystemAlert as EventListener);

    // Join user-specific room for targeted notifications
    if (userId) {
      socketManager.joinRoom(`user_${userId}`);
    }

    // Cleanup
    return () => {
      window.removeEventListener("socket-notification", handleSocketNotification as EventListener);
      window.removeEventListener("appointment-update", handleAppointmentUpdate as EventListener);
      window.removeEventListener("message-received", handleMessageReceived as EventListener);
      window.removeEventListener("system-alert", handleSystemAlert as EventListener);
      
      if (userId) {
        socketManager.leaveRoom(`user_${userId}`);
      }
    };
  }, [userId, addNotification]);

  return {
    sendNotification: socketManager.sendNotification.bind(socketManager),
    markAsRead: socketManager.markNotificationAsRead.bind(socketManager),
    isConnected: socketManager.isConnected.bind(socketManager),
  };
}