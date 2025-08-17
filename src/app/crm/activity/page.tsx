"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { format, formatDistanceToNow } from "date-fns";
import {
  Activity,
  ArrowDown,
  Filter,
  RefreshCw,
  Search,
  ExternalLink,
  UserPlus,
  Users,
  MessageSquare,
  Upload,
  Database,
  FileText,
  Calendar as CalendarIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MainLayout } from "@/components/layout/main-layout";
import { PageHeader } from "@/components/layout/page-header";

interface ActivityItem {
  id: string;
  type: string;
  description: string;
  userId?: string | null;
  userRole?: string | null;
  userName?: string | null;
  createdAt: string;
  status: string;
  targetType?: string | null;
  targetId?: string | null;
  meta?: Record<string, any> | null;
  actionUrl?: string;
}

export default function ActivityPage() {
  const router = useRouter();
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<ActivityItem[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  const fetchActivities = useCallback(
    async (pageNum: number = 1, reset: boolean = false) => {
      if (pageNum === 1) setIsLoading(true);
      else setIsLoadingMore(true);

      try {
        const token = localStorage.getItem("accessToken");
        const res = await fetch(
          `https://primebackend.onrender.com/api/activities?page=${pageNum}&limit=20`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch activities");
        const data = await res.json();
        console.log("Fetched activities:", data);

        const fetched: ActivityItem[] = data.data.activities.map((a: any) => ({
          id: a.id,
          type: a.type,
          description: a.description,
          userId: a.userId,
          userRole: a.userRole,
          userName: a.userName || "System",
          createdAt: a.createdAt,
          status: a.status,
          targetType: a.targetType,
          targetId: a.targetId,
          meta: a.meta,
          actionUrl:
            a.targetType && a.targetId
              ? `/${a.targetType}s/${a.targetId}`
              : undefined,
        }));

        if (reset || pageNum === 1) setActivities(fetched);
        else setActivities((prev) => [...prev, ...fetched]);

        setHasMore(fetched.length === 20);
        setPage(pageNum);
      } catch (error) {
        toast.error("Failed to load activities");
        console.error("Error fetching activities:", error);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchActivities(1, true);
  }, [fetchActivities]);

  useEffect(() => {
    let filtered = activities;

    if (searchQuery) {
      filtered = filtered.filter(
        (activity) =>
          activity.description
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          activity.userName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((activity) => activity.type === typeFilter);
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter(
        (activity) => activity.userRole === roleFilter
      );
    }

    setFilteredActivities(filtered);
  }, [activities, searchQuery, typeFilter, roleFilter]);

  const handleLoadMore = () => {
    if (!isLoadingMore && hasMore) {
      fetchActivities(page + 1, false);
    }
  };

  const handleRefresh = () => {
    setSearchQuery("");
    setTypeFilter("all");
    setRoleFilter("all");
    fetchActivities(1, true);
    toast.success("Activities refreshed");
  };

  // Restored getActivityTypeLabel for friendly type names
  const getActivityTypeLabel = (type: string) => {
    switch (type) {
      case "USER_CREATED":
        return "User Management";
      case "USER_LOGIN":
        return "Authentication";
      case "CLIENT_ADDED":
        return "Client Management";
      case "MESSAGE_RECEIVED":
        return "Communication";
      case "APPOINTMENT_SCHEDULED":
        return "Scheduling";
      case "DOCUMENT_UPLOADED":
        return "Documents";
      case "SYSTEM_BACKUP":
        return "System";
      case "REPORT_GENERATED":
        return "Reports";
      default:
        return "Activity";
    }
  };

  // Restored full getActivityIcon including appointment and other icons
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "USER_CREATED":
      case "USER_LOGIN":
        return <UserPlus className="h-4 w-4 text-blue-500" />;
      case "CLIENT_ADDED":
        return <Users className="h-4 w-4 text-green-500" />;
      case "MESSAGE_RECEIVED":
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      case "APPOINTMENT_SCHEDULED":
        return <CalendarIcon className="h-4 w-4 text-orange-500" />;
      case "DOCUMENT_UPLOADED":
        return <Upload className="h-4 w-4 text-indigo-500" />;
      case "SYSTEM_BACKUP":
        return <Database className="h-4 w-4 text-gray-500" />;
      case "REPORT_GENERATED":
        return <FileText className="h-4 w-4 text-teal-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRoleColor = (role?: string | null) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "COORDINATOR":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "STAFF":
        return "bg-green-100 text-green-800";
      case "CLIENT":
        return "bg-orange-100 text-orange-800";
      case "SYSTEM":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatActivityTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    return diffInHours < 24
      ? formatDistanceToNow(date, { addSuffix: true })
      : format(date, "MMM dd, yyyy 'at' HH:mm");
  };

  const handleActivityClick = (activity: ActivityItem) => {
    if (activity.actionUrl) {
      router.push(activity.actionUrl);
    }
  };

  const uniqueTypes = Array.from(new Set(activities.map((a) => a.type)));
  const uniqueRoles = Array.from(
    new Set(activities.map((a) => a.userRole || ""))
  );

  return (
    <MainLayout>
      <PageHeader
        title="Activity Feed"
        description="Monitor all system activities and user actions in real-time"
      >
        <Button onClick={handleRefresh} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh
        </Button>
      </PageHeader>

      <Card>
        <CardContent className="p-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <div className="relative w-[300px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search activities..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {uniqueTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {getActivityTypeLabel(type)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {uniqueRoles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Activity Feed */}
          <ScrollArea className="h-[600px]">
            {isLoading ? (
              <p>Loading...</p>
            ) : filteredActivities.length === 0 ? (
              <div className="text-center py-12">
                <Activity className="mx-auto h-12 w-12 mb-4 text-muted-foreground" />
                <p>No activities found</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className={cn(
                      "group flex items-start space-x-4 p-4 rounded-lg border transition hover:bg-accent",
                      activity.actionUrl && "cursor-pointer"
                    )}
                    onClick={() => handleActivityClick(activity)}
                  >
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                          <AvatarImage
                            src=""
                            className="object-cover h-full w-full"
                            alt={activity.userName || "System"}
                          />
                          <AvatarFallback className="w-full h-full flex items-center justify-center rounded-full bg-gray-200 text-sm font-medium">
                            {activity.userName
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("") || "SYS"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-background border-2 border-background flex items-center justify-center">
                          {getActivityIcon(activity.type)}
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">
                        {activity.description}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-medium">
                          {activity.userName}
                        </span>
                        <Badge className={getRoleColor(activity.userRole)}>
                          {activity.userRole || "System"}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {getActivityTypeLabel(activity.type)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {formatActivityTime(activity.createdAt)}
                        </span>
                        {activity.actionUrl && (
                          <ExternalLink className="h-3 w-3 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {hasMore && (
                  <div className="flex justify-center pt-4">
                    <Button
                      variant="outline"
                      onClick={handleLoadMore}
                      disabled={isLoadingMore}
                    >
                      {isLoadingMore ? "Loading..." : "Load More"}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
