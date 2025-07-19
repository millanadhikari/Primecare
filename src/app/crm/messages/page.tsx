"use client";

import { MainLayout } from "@/components/layout/main-layout";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState, useMemo, use, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Filter,
  MoreVertical,
  Eye,
  Mail,
  MailOpen,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Search,
  Archive,
  Star,
  StarOff,
  Reply,
  Forward,
  Phone,
  MessageSquare,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { format } from "date-fns";
import { get } from "http";
import {
  deleteMessage,
  getMessages,
  updateMessage,
} from "@/app/lib/messageApi";
import { SkeletonRow } from "@/components/layout/SkeletonRow";

// Sample messages data
const initialMessages = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 234-5678",
    service: "NDIS Support Coordination",
    message:
      "Hello, I'm interested in learning more about your NDIS support coordination services. I'm a new participant and would like to understand how you can help me implement my plan effectively. Could we schedule a consultation?",
    preferredContact: "Email",
    isRead: false,
    isStarred: false,
    isArchived: false,
    priority: "High",
    receivedAt: "2025-01-10T14:30:00.000Z",
    category: "Inquiry",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "+1 (555) 345-6789",
    service: "Physical Therapy",
    message:
      "I need to reschedule my upcoming physical therapy appointment due to a family emergency. Please let me know available slots for next week. Thank you for your understanding.",
    preferredContact: "Phone",
    isRead: true,
    isStarred: true,
    isArchived: false,
    priority: "Medium",
    receivedAt: "2025-01-10T11:15:00.000Z",
    category: "Appointment",
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    email: "emma.r@email.com",
    phone: "+1 (555) 456-7890",
    service: "Mental Health Support",
    message:
      "I'm reaching out regarding mental health support services for my teenage daughter. She has been struggling lately and we think professional support would be beneficial. What programs do you offer for adolescents?",
    preferredContact: "Email",
    isRead: false,
    isStarred: false,
    isArchived: false,
    priority: "High",
    receivedAt: "2025-01-10T09:45:00.000Z",
    category: "Inquiry",
  },
  {
    id: "4",
    name: "David Thompson",
    email: "david.thompson@email.com",
    phone: "+1 (555) 567-8901",
    service: "Occupational Therapy",
    message:
      "Thank you for the excellent occupational therapy session yesterday. My mobility has improved significantly. I wanted to provide feedback and inquire about continuing the program.",
    preferredContact: "Email",
    isRead: true,
    isStarred: false,
    isArchived: false,
    priority: "Low",
    receivedAt: "2025-01-09T16:20:00.000Z",
    category: "Feedback",
  },
  {
    id: "5",
    name: "Lisa Williams",
    email: "lisa.w@email.com",
    phone: "+1 (555) 678-9012",
    service: "Accessibility Assessment",
    message:
      "I need an accessibility assessment for my home. I'm planning some modifications and want to ensure they meet all requirements. When would be the earliest available appointment?",
    preferredContact: "Phone",
    isRead: false,
    isStarred: true,
    isArchived: false,
    priority: "Medium",
    receivedAt: "2025-01-09T13:10:00.000Z",
    category: "Assessment",
  },
  {
    id: "6",
    name: "Robert Garcia",
    email: "robert.garcia@email.com",
    phone: "+1 (555) 789-0123",
    service: "Care Coordination",
    message:
      "I'm writing to express my gratitude for the exceptional care coordination services. The team has been incredibly helpful in managing my care plan. Keep up the excellent work!",
    preferredContact: "Email",
    isRead: true,
    isStarred: false,
    isArchived: true,
    priority: "Low",
    receivedAt: "2025-01-08T10:30:00.000Z",
    category: "Feedback",
  },
];

export default function MessagesPage() {
  const router = useRouter();
  const [messages, setMessages] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false)

  const handleMarkAsRead = async (id: string) => {
    try {
      const response = await updateMessage(id, { isRead: true });
      if (response) {
        fetchMessages();
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
    try {
      const response = await updateMessage(id, { isRead: false });
      if (response) {
        fetchMessages();
        toast.success("Message marked as unread");
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
      const message = messages?.find((msg) => msg.id === id);
      if (!message) {
        toast.error("Message not found");
        return;
      }

      // Toggle the isStarred value
      const updated = await updateMessage(id, {
        isStarred: !message.isStarred,
      });

      if (updated) {
        fetchMessages(); // Refresh messages after successful update
        toast.success(
          !message.isStarred ? "Added to starred" : "Removed from starred"
        );
      }
    } catch (error) {
      console.error("Failed to update star status:", error);
      toast.error("Failed to update star status");
    }
  };

  const handleArchive = async (id: string) => {
    setMessages(
      messages?.map((msg) =>
        msg.id === id ? { ...msg, isArchived: true } : msg
      )
    );
    toast.success("Message archived");
  };

  const handleDelete = async (id: string) => {
    toast.success("Message deleted");

    try {
      const res = await deleteMessage(id);
      if (res) {
        setMessages(messages?.filter((msg) => msg.id !== id));
        toast.success("Message deleted successfully");
        // Optionally, you can refetch messages here
        fetchMessages();
      } else {
        toast.error("Failed to delete message");
      }
    } catch (error) {
      console.error("Failed to delete message:", error);
      toast.error("Failed to delete message");
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedMessages.length === 0) {
      toast.error("Please select messages? first");
      return;
    }

    switch (action) {
      case "read":
        setMessages(
          messages?.map((msg) =>
            selectedMessages.includes(msg.id) ? { ...msg, isRead: true } : msg
          )
        );
        toast.success(`${selectedMessages.length} messages? marked as read`);
        break;
      case "unread":
        setMessages(
          messages?.map((msg) =>
            selectedMessages.includes(msg.id) ? { ...msg, isRead: false } : msg
          )
        );
        toast.success(`${selectedMessages.length} messages? marked as unread`);
        break;
      case "archive":
        setMessages(
          messages?.map((msg) =>
            selectedMessages.includes(msg.id)
              ? { ...msg, isArchived: true }
              : msg
          )
        );
        toast.success(`${selectedMessages.length} messages? archived`);
        break;
      case "delete":
        setMessages(
          messages?.filter((msg) => !selectedMessages.includes(msg.id))
        );
        toast.success(`${selectedMessages.length} messages? deleted`);
        break;
    }
    setSelectedMessages([]);
  };

  // Filter and search logic
  const filteredMessages = useMemo(() => {
    return messages?.filter((message) => {
      const matchesSearch =
        message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.message.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        (statusFilter === "Unread" && !message.isRead) ||
        (statusFilter === "Read" && message.isRead) ||
        (statusFilter === "Starred" && message.isStarred) ||
        (statusFilter === "Archived" && message.isArchived);

      const matchesPriority =
        priorityFilter === "All" || message.priority === priorityFilter;
      const matchesCategory =
        categoryFilter === "All" || message.category === categoryFilter;

      return (
        matchesSearch && matchesStatus && matchesPriority && matchesCategory
      );
    });
  }, [messages, searchQuery, statusFilter, priorityFilter, categoryFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredMessages?.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentMessages = filteredMessages?.slice(startIndex, endIndex);

  const handleFilterChange = (filterType: string, value: string) => {
    setCurrentPage(1);
    if (filterType === "status") {
      setStatusFilter(value);
    } else if (filterType === "priority") {
      setPriorityFilter(value);
    } else if (filterType === "category") {
      setCategoryFilter(value);
    }
  };

  const handleRecordsPerPageChange = (value: string) => {
    setRecordsPerPage(parseInt(value));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSelectMessage = (id: string) => {
    setSelectedMessages((prev) =>
      prev.includes(id) ? prev.filter((msgId) => msgId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedMessages.length === currentMessages.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(currentMessages.map((msg) => msg.id));
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy 'at' h:mm a");
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
        return <Eye className="h-4 w-4" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  const unreadCount = messages?.filter(
    (msg) => !msg.isRead && !msg.isArchived
  ).length;

  const fetchMessages = async () => {
    const token = localStorage.getItem("token");
    setLoading(true)
    // if (!token) {
    //   toast.error("You must be logged in to view messages");
    //   return;
    // }
    try {
      const response = await getMessages({
        searchQuery,
        statusFilter,
        type: categoryFilter,
        page: currentPage,
        limit: recordsPerPage,
      });
      console.log("Fetched messages:", response);
      setMessages(response?.data?.messages);
      setLoading(false)
      console.log("Messages set:", messages);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      toast.error("Failed to fetch messages");
    }
  };

  useEffect(() => {
    fetchMessages();
    console.log("Messages fetched:", messages);
  }, []);
  //   if (!messages) {
  //     return <div>...Loading msg</div>;
  //   }
  return (
    <MainLayout>
      <PageHeader
        title="Messages"
        description={`Manage customer inquiries and communications. ${unreadCount} unread messages.`}
      >
        <div className="flex items-center gap-2">
          {selectedMessages.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Actions ({selectedMessages.length})
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleBulkAction("read")}>
                  <MailOpen className="mr-2 h-4 w-4" />
                  Mark as Read
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkAction("unread")}>
                  <Mail className="mr-2 h-4 w-4" />
                  Mark as Unread
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleBulkAction("archive")}>
                  <Archive className="mr-2 h-4 w-4" />
                  Archive
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleBulkAction("delete")}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </PageHeader>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="flex w-full items-center space-x-2 sm:w-auto">
                <div className="relative w-full sm:w-[300px]">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search messages..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Select
                  value={statusFilter}
                  onValueChange={(value) => handleFilterChange("status", value)}
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Status</SelectItem>
                    <SelectItem value="Unread">Unread</SelectItem>
                    <SelectItem value="Read">Read</SelectItem>
                    <SelectItem value="Starred">Starred</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={priorityFilter}
                  onValueChange={(value) =>
                    handleFilterChange("priority", value)
                  }
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Priority</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={categoryFilter}
                  onValueChange={(value) =>
                    handleFilterChange("category", value)
                  }
                >
                  <SelectTrigger className="w-[120px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Categories</SelectItem>
                    <SelectItem value="Inquiry">Inquiry</SelectItem>
                    <SelectItem value="Appointment">Appointment</SelectItem>
                    <SelectItem value="Feedback">Feedback</SelectItem>
                    <SelectItem value="Assessment">Assessment</SelectItem>
                  </SelectContent>
                </Select>
                {/* <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button> */}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <input
                        type="checkbox"
                        checked={
                          selectedMessages?.length ===
                            currentMessages?.length &&
                          currentMessages?.length > 0
                        }
                        onChange={handleSelectAll}
                        className="rounded border border-input"
                      />
                    </TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Message Preview
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Priority
                    </TableHead>
                    <TableHead className="hidden lg:table-cell">
                      Category
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                      Received
                    </TableHead>
                    <TableHead className="w-[100px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading
                    ? // Render 5 skeleton rows
                      Array.from({ length: 5 }).map((_, i) => (
                        <SkeletonRow key={i} />
                      ))
                    :
                     currentMessages?.map((message) => (
                        <TableRow
                          key={message.id}
                          className={`cursor-pointer transition-colors hover:bg-accent ${
                            !message.isRead
                              ? "bg-blue-50 dark:bg-blue-950/20"
                              : ""
                          }`}
                          //   onClick={() => router.push(`/crm/messages/${message.id}`)}
                          onClick={async () => {
                            try {
                              await handleMarkAsRead(message.id);
                              router.push(`/crm/messages/${message.id}`);
                            } catch (error) {
                              console.error(
                                "Error handling message action:",
                                error
                              );
                              toast.error("Something went wrong.");
                            }
                          }}
                        >
                          <TableCell onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={selectedMessages.includes(message.id)}
                              onChange={() => handleSelectMessage(message.id)}
                              className="rounded border border-input"
                            />
                          </TableCell>
                          <TableCell onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center gap-1">
                              {!message.isRead && (
                                <div className="h-2 w-2 rounded-full bg-blue-500" />
                              )}
                              <button
                                onClick={() => handleToggleStar(message.id)}
                                className="text-muted-foreground hover:text-yellow-500"
                              >
                                {message.isStarred ? (
                                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                ) : (
                                  <StarOff className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10 bg-gray-100">
                                <AvatarFallback className="text-xs ">
                                  {message.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div
                                  className={`font-medium ${
                                    !message.isRead ? "font-semibold" : ""
                                  }`}
                                >
                                  {message.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {message.email}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getCategoryIcon(message.category)}
                              <span
                                className={
                                  !message.isRead ? "font-semibold" : ""
                                }
                              >
                                {message.service}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div
                              className={`line-clamp-2 text-sm ${
                                !message.isRead
                                  ? "font-medium"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {message.message}
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <Badge variant={getPriorityColor(message.priority)}>
                              {message.priority}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <Badge variant="outline">{message.category}</Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="text-sm text-muted-foreground">
                              {formatDate(message.receivedAt)}
                            </div>
                          </TableCell>
                          <TableCell onClick={(e) => e.stopPropagation()}>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() =>
                                    router.push(`/messages/${message.id}`)
                                  }
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    message.isRead
                                      ? handleMarkAsUnread(message.id)
                                      : handleMarkAsRead(message.id)
                                  }
                                >
                                  {message.isRead ? (
                                    <>
                                      <Mail className="mr-2 h-4 w-4" />
                                      Mark as Unread
                                    </>
                                  ) : (
                                    <>
                                      <MailOpen className="mr-2 h-4 w-4" />
                                      Mark as Read
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleToggleStar(message.id)}
                                >
                                  {message.isStarred ? (
                                    <>
                                      <StarOff className="mr-2 h-4 w-4" />
                                      Remove Star
                                    </>
                                  ) : (
                                    <>
                                      <Star className="mr-2 h-4 w-4" />
                                      Add Star
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    (window.location.href = `mailto:${message.email}`)
                                  }
                                >
                                  <Reply className="mr-2 h-4 w-4" />
                                  Reply
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleArchive(message.id)}
                                >
                                  <Archive className="mr-2 h-4 w-4" />
                                  Archive
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive"
                                  onClick={() => handleDelete(message.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>
                  Showing {startIndex + 1} to{" "}
                  {Math.min(endIndex, filteredMessages?.length)} of{" "}
                  {filteredMessages?.length} messages
                </span>
                <Select
                  value={recordsPerPage.toString()}
                  onValueChange={handleRecordsPerPageChange}
                >
                  <SelectTrigger className="w-[80px] h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="40">40</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span>per page</span>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      return (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      );
                    })
                    .map((page, index, array) => (
                      <div key={page} className="flex items-center">
                        {index > 0 && array[index - 1] !== page - 1 && (
                          <span className="px-2 text-muted-foreground">
                            ...
                          </span>
                        )}
                        <Button
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          className="w-8 h-8 p-0"
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </Button>
                      </div>
                    ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
