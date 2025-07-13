"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  ArrowLeft,
  Star,
  StarOff,
  Archive,
  Trash2,
  Reply,
  Forward,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Globe,
  Monitor,
  Tag,
  Send,
  MoreVertical,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  deleteMessage,
  getMessageById,
  updateMessage,
} from "@/app/lib/messageApi";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  preferredContact: string;
  isRead: boolean;
  isStarred: boolean;
  isArchived: boolean;
  priority: string;
  receivedAt: string;
  category: string;
  ipAddress?: string;
  userAgent?: string;
  source?: string;
  tags?: string[];
}

interface MessageDetailsProps {
  message: Message;
}

export function MessageDetails({
  message: initialMessage,
}: MessageDetailsProps) {
  const router = useRouter();
  const [message, setMessage] = useState(initialMessage);
  const [replyText, setReplyText] = useState("");
  const [isReplying, setIsReplying] = useState(false);

  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await updateMessage(id, { isRead: true });
      if (response) {
        getMessageById(id).then((data) => setMessage(data.data.message));
        toast.success("Message marked as read");
      }
    } catch (error) {
      console.error("Failed to mark message as read:", error);
      toast.error("Failed to mark message as read");
    }
    toast.success("Message marked as read");
  };

  const handleMarkAsUnread = async (id: string) => {
    // setMessages(
    //   messages?.map((msg) => (msg.id === id ? { ...msg, isRead: false } : msg))
    // );
    console.log("ok", id);
    try {
      const response = await updateMessage(id, { isRead: false });
      if (response) {
        getMessageById(id).then((data) => setMessage(data.data.message));
        toast.success("Message marked as read");
      }
    } catch (error) {
      console.error("Failed to mark message as unread:", error);
      toast.error("Failed to mark message as unread");
    }
    toast.success("Message marked as unread");
  };

  const handleToggleStar = async (id: string) => {
    try {
      // Find the current message
      //   const message = messages?.find((msg) => msg.id === id);
      //   if (!message) {
      //     toast.error("Message not found");
      //     return;
      //   }

      // Toggle the isStarred value
      const updated = await updateMessage(id, {
        isStarred: !message.isStarred,
      });

      if (updated) {
        getMessageById(id).then((data) => setMessage(data.data.message));
        toast.success(
          !message.isStarred ? "Added to starred" : "Removed from starred"
        );
      }
    } catch (error) {
      console.error("Failed to update star status:", error);
      toast.error("Failed to update star status");
    }
  };

  const handleArchive = () => {
    setMessage({ ...message, isArchived: true });
    toast.success("Message archived");
    router.push("/crm/messages");
  };

  const handleDelete = async (id: string) => {
    toast.success("Message deleted");

    try {
      const res = await deleteMessage(id);
      if (res) {
        router.push("/crm/messages");
        toast.success("Message Succesfully Deleted!");
      } else {
        toast.error("Failed to delete message");
      }
    } catch (error) {
      console.error("Failed to delete message:", error);
      toast.error("Failed to delete message");
    }
  };

  const handleReply = () => {
    if (!replyText.trim()) {
      toast.error("Please enter a reply message");
      return;
    }

    // Here you would send the reply via email or preferred contact method
    toast.success("Reply sent successfully");
    setReplyText("");
    setIsReplying(false);
  };

  const handleCallClient = () => {
    window.location.href = `tel:${message.phone}`;
  };

  const handleEmailClient = () => {
    window.location.href = `mailto:${message.email}?subject=Re: ${message.service} Inquiry`;
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "EEEE, MMMM dd, yyyy 'at' h:mm a");
    } catch {
      return "Invalid date";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive";
      case "Medium":
        return "secondary";
      case "Low":
        return "outline";
      default:
        return "outline";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Inquiry":
        return <MessageSquare className="h-4 w-4" />;
      case "Appointment":
        return <Phone className="h-4 w-4" />;
      case "Feedback":
        return <Star className="h-4 w-4" />;
      case "Assessment":
        return <Monitor className="h-4 w-4" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  const getPreferredContactIcon = (contact: string) => {
    switch (contact.toLowerCase()) {
      case "phone":
        return <Phone className="h-4 w-4" />;
      case "email":
        return <Mail className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  // Mark as read when viewing (if not already read)
  //   useState(() => {
  //     if (!message.isRead) {
  //       handleMarkAsRead();
  //     }
  //   });

  return (
    <div className="space-y-6">
      {/* Header with Back Link */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/crm/messages")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Messages
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => handleToggleStar(message.id)}
          >
            {message.isStarred ? (
              <Star className="mr-2 h-4 w-4 fill-yellow-500 text-yellow-500" />
            ) : (
              <StarOff className="mr-2 h-4 w-4" />
            )}
            {message.isStarred ? "Starred" : "Star"}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  message.isRead
                    ? handleMarkAsUnread(message.id)
                    : handleMarkAsRead(message.id)
                }
              >
                <Mail className="mr-2 h-4 w-4" />
                Mark as {message.isRead ? "Unread" : "Read"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleArchive}>
                <Archive className="mr-2 h-4 w-4" />
                Archive
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDelete(message.id)}
                className="text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Message Header */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Sender Info */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="text-lg">
                    {message.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{message.name}</h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {message.email}
                    </div>
                    {message.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        {message.phone}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getPriorityColor(message.priority)}>
                  {message.priority} Priority
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  {getCategoryIcon(message.category)}
                  {message.category}
                </Badge>
              </div>
            </div>

            {/* Message Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {formatDate(message.receivedAt)}
              </div>
              <div className="flex items-center gap-1">
                {getPreferredContactIcon(message.preferredContact)}
                Prefers {message.preferredContact}
              </div>
              {message.source && (
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  {message.source}
                </div>
              )}
            </div>

            {/* Tags */}
            {message.tags && message.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {message.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs flex items-center gap-1"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Service & Message Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getCategoryIcon(message.category)}
            {message.service}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="whitespace-pre-wrap text-base leading-relaxed">
              {message.message}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleEmailClient}
              className="flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Send Email
            </Button>
            {message.phone && (
              <Button
                variant="outline"
                onClick={handleCallClient}
                className="flex items-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Call Client
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => setIsReplying(true)}
              className="flex items-center gap-2"
            >
              <Reply className="h-4 w-4" />
              Quick Reply
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Forward className="h-4 w-4" />
              Forward
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Reply */}
      {isReplying && (
        <Card>
          <CardHeader>
            <CardTitle>Quick Reply</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reply">Your Reply</Label>
              <Textarea
                id="reply"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your reply here..."
                className="min-h-[120px]"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={handleReply} className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Send Reply
              </Button>
              <Button variant="outline" onClick={() => setIsReplying(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Technical Details */}
      <Card>
        <CardHeader>
          <CardTitle>Technical Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Message ID:</span>
              <span className="ml-2 text-muted-foreground">{message.id}</span>
            </div>
            {message.ipAddress && (
              <div>
                <span className="font-medium">IP Address:</span>
                <span className="ml-2 text-muted-foreground">
                  {message.ipAddress}
                </span>
              </div>
            )}
            <div>
              <span className="font-medium">Status:</span>
              <span className="ml-2">
                <Badge variant={message.isRead ? "default" : "secondary"}>
                  {message.isRead ? "Read" : "Unread"}
                </Badge>
              </span>
            </div>
            <div>
              <span className="font-medium">Archived:</span>
              <span className="ml-2">
                <Badge variant={message.isArchived ? "outline" : "secondary"}>
                  {message.isArchived ? "Yes" : "No"}
                </Badge>
              </span>
            </div>
          </div>
          {message.userAgent && (
            <div className="pt-2 border-t">
              <span className="font-medium">User Agent:</span>
              <p className="text-xs text-muted-foreground mt-1 break-all">
                {message.userAgent}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
