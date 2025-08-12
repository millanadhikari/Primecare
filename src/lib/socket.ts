"use client";

import { io, Socket } from "socket.io-client";

class SocketManager {
  private socket: Socket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  connect(userId?: string) {
    console.log("Connecting to socket with userId:", userId);
    if (this.socket?.connected) {
      return this.socket;
    }

    try {
      this.socket = io(
        // process.env.NEXT_PUBLIC_SOCKET_URL ||
         "https://primebackend.onrender.com",
        {
          transports: ["websocket", "polling"],
          timeout: 20000,
          auth: {
            userId: userId || "anonymous",
          },
          query: {
            timestamp: Date.now(),
          },
        }
      );

      this.setupEventListeners();
      return this.socket;
    } catch (error) {
      console.error("Socket connection failed:", error);
      return null;
    }
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on("connect", () => {
      console.log("Socket connected:", this.socket?.id);
      this.reconnectAttempts = 0;
    });

    this.socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      this.handleReconnection();
    });

    this.socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      this.handleReconnection();
    });

    // Notification events
    this.socket.on("notification", (data) => {
      console.log("Received notification:", data);
      // This will be handled by the notification provider
      window.dispatchEvent(
        new CustomEvent("socket-notification", { detail: data })
      );
    });

    // Real-time updates
    this.socket.on("appointment_update", (data) => {
      console.log("Appointment update:", data);
      window.dispatchEvent(
        new CustomEvent("appointment-update", { detail: data })
      );
    });

    this.socket.on("message_received", (data) => {
      console.log("New message:", data);
      window.dispatchEvent(
        new CustomEvent("message-received", { detail: data })
      );
    });

    this.socket.on("client_update", (data) => {
      console.log("Client update:", data);
      window.dispatchEvent(new CustomEvent("client-update", { detail: data }));
    });

    this.socket.on("system_alert", (data) => {
      console.log("System alert:", data);
      window.dispatchEvent(new CustomEvent("system-alert", { detail: data }));
    });
  }

  private handleReconnection() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay =
        this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);

      console.log(
        `Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts})`
      );

      setTimeout(() => {
        this.socket?.connect();
      }, delay);
    } else {
      console.error("Max reconnection attempts reached");
    }
  }

  // Notification methods
  sendNotification(data: {
    userId: string;
    title: string;
    message: string;
    type: string;
    actionUrl?: string;
    metadata?: any;
  }) {
    this.socket?.emit("send_notification", data);
  }

  markNotificationAsRead(notificationId: string) {
    this.socket?.emit("mark_notification_read", { notificationId });
  }

  // Appointment methods
  updateAppointment(appointmentData: any) {
    this.socket?.emit("appointment_update", appointmentData);
  }

  // Message methods
  sendMessage(messageData: any) {
    this.socket?.emit("send_message", messageData);
  }

  // Join/Leave rooms for targeted notifications
  joinRoom(roomId: string) {
    this.socket?.emit("join_room", roomId);
  }

  leaveRoom(roomId: string) {
    this.socket?.emit("leave_room", roomId);
  }

  // Disconnect
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Get socket instance
  getSocket() {
    return this.socket;
  }

  // Check connection status
  isConnected() {
    return this.socket?.connected || false;
  }
}

// Create singleton instance
const socketManager = new SocketManager();

export default socketManager;

// Hook for using socket in components
export function useSocket() {
  return socketManager;
}

// Types for Socket.IO events
export interface NotificationData {
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
  actionUrl?: string;
  metadata?: {
    clientName?: string;
    appointmentTime?: string;
    senderName?: string;
    documentName?: string;
  };
}

export interface AppointmentUpdateData {
  id: string;
  clientId: string;
  status: string;
  time?: string;
  date?: string;
}

export interface MessageData {
  id: string;
  senderId: string;
  recipientId: string;
  content: string;
  type: string;
}
