"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { StatCard } from "./stat-card";
import { PatientsChart } from "./patients-chart";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Users,
  UserCheck,
  MessageSquare,
  Activity,
  Server,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Plus,
  UserPlus,
  Settings,
  FileText,
  Megaphone,
  UserCog,
  Calendar,
  Shield,
  Database,
  Wifi,
  HardDrive,
  Cpu,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Bell,
  Mail,
  Phone,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample data for admin dashboard
const adminKPIs = {
  totalClients: { value: 1284, change: 8.2, trend: "up" as const },
  activeUsers: { value: 47, change: 12.5, trend: "up" as const },
  newMessages: { value: 23, change: -5.3, trend: "down" as const },
  todayActivities: { value: 156, change: 15.8, trend: "up" as const },
};

const systemHealth = {
  overall: 98,
  database: { status: "healthy", uptime: 99.9, responseTime: 45 },
  api: { status: "healthy", uptime: 99.8, responseTime: 120 },
  storage: { status: "warning", usage: 78, total: 100 },
  network: { status: "healthy", latency: 23 },
};

const recentActivities = [
  {
    id: "1",
    type: "user_created",
    description: "New user account created",
    user: "Sarah Johnson",
    userRole: "Care Coordinator",
    time: "5 minutes ago",
    status: "success",
  },
  {
    id: "2",
    type: "client_added",
    description: "New client registered",
    user: "Michael Chen",
    userRole: "Client",
    time: "12 minutes ago",
    status: "info",
  },
  {
    id: "3",
    type: "message_received",
    description: "Support message received",
    user: "Emma Rodriguez",
    userRole: "Client",
    time: "18 minutes ago",
    status: "info",
  },
  {
    id: "4",
    type: "appointment_scheduled",
    description: "New appointment scheduled",
    user: "Dr. Rebecca Chen",
    userRole: "Medical Director",
    time: "25 minutes ago",
    status: "success",
  },
  {
    id: "5",
    type: "system_alert",
    description: "Storage usage warning",
    user: "System",
    userRole: "System",
    time: "1 hour ago",
    status: "warning",
  },
];

const activeUsers = [
  {
    id: "1",
    name: "Dr. Rebecca Chen",
    role: "Medical Director",
    email: "rebecca.chen@medicare.com",
    lastActive: "2 minutes ago",
    status: "online",
    avatar: "",
  },
  {
    id: "2",
    name: "Dr. Mark Johnson",
    role: "Senior Physician",
    email: "mark.johnson@medicare.com",
    lastActive: "5 minutes ago",
    status: "online",
    avatar: "",
  },
  {
    id: "3",
    name: "Sarah Williams",
    role: "Registered Nurse",
    email: "sarah.williams@medicare.com",
    lastActive: "15 minutes ago",
    status: "away",
    avatar: "",
  },
  {
    id: "4",
    name: "Jennifer Martinez",
    role: "Care Coordinator",
    email: "jennifer.martinez@medicare.com",
    lastActive: "1 hour ago",
    status: "offline",
    avatar: "",
  },
];

const systemAlerts = [
  {
    id: "1",
    type: "warning",
    title: "Storage Usage High",
    message: "Storage usage is at 78%. Consider archiving old files.",
    time: "1 hour ago",
  },
  {
    id: "2",
    type: "info",
    title: "Scheduled Maintenance",
    message: "System maintenance scheduled for tonight 2:00 AM - 4:00 AM",
    time: "3 hours ago",
  },
  {
    id: "3",
    type: "success",
    title: "Backup Completed",
    message: "Daily backup completed successfully",
    time: "6 hours ago",
  },
];

export function AdminDashboard() {
  const router = useRouter();
  const [selectedTimeRange, setSelectedTimeRange] = useState("today");
  const [kpiData, setKpiData] = useState(null); // state for the API "data" object
  const [loading, setLoading] = useState(true); // for spinner/loading state
  const [error, setError] = useState(null); // for error handling

  const fetchKPIData = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`https://primebackend.onrender.com/api/admin-kpis`);
      const json = await res.json();

      // Set only the "data" field from the API
      setKpiData(json.data);
    } catch (err) {
      console.error("Error fetching KPI data:", err);
      setError("Failed to fetch KPI data");
    } finally {
      setLoading(false);
    }
  };

  // Fetch on component mount
  useEffect(() => {
    fetchKPIData();
  }, []);
  const handleQuickAction = (action: string) => {
    switch (action) {
      case "add_user":
        router.push("/crm/staff/new");
        break;
      case "create_announcement":
        toast.success("Announcement creation opened");
        break;
      case "manage_roles":
        router.push("/settings");
        break;
      case "view_logs":
        toast.info("System logs opened");
        break;
      case "assign_coordinator":
        router.push("/crm/clients");
        break;
      case "manage_templates":
        router.push("/documents");
        break;
      default:
        toast.info(`${action} clicked`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-500";
      case "warning":
        return "text-yellow-500";
      case "error":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getUserStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "away":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user_created":
        return <UserPlus className="h-4 w-4 text-blue-500" />;
      case "client_added":
        return <Users className="h-4 w-4 text-green-500" />;
      case "message_received":
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      case "appointment_scheduled":
        return <Calendar className="h-4 w-4 text-orange-500" />;
      case "system_alert":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Clients"
          value={kpiData?.totalClients?.value.toLocaleString()}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          change={{
            value: `+${kpiData?.totalClients?.change}%`,
            trend: kpiData?.totalClients?.trend,
          }}
        />
        <StatCard
          title="Active Users"
          value={kpiData?.activeUsers?.value.toString()}
          icon={<UserCheck className="h-4 w-4 text-muted-foreground" />}
          change={{
            value: `+${kpiData?.activeUsers?.change}%`,
            trend: kpiData?.activeUsers?.trend,
          }}
          variant="info"
        />
        <StatCard
          title="New Messages"
          value={kpiData?.newMessages?.value.toString()}
          icon={<MessageSquare className="h-4 w-4 text-muted-foreground" />}
          change={{
            value: `${kpiData?.newMessages?.change}%`,
            trend: kpiData?.newMessages?.trend,
          }}
          variant="warning"
        />
        <StatCard
          title="Today's Activities"
          value={adminKPIs.todayActivities.value.toString()}
          icon={<Activity className="h-4 w-4 text-muted-foreground" />}
          change={{
            value: `+${adminKPIs.todayActivities.change}%`,
            trend: adminKPIs.todayActivities.trend,
          }}
          variant="success"
        />
      </div>

      {/* System Health & Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* System Health */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                System Health
              </CardTitle>
              <Badge
                variant="default"
                className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
              >
                {systemHealth.overall}% Healthy
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    <span className="text-sm font-medium">Database</span>
                  </div>
                  {getStatusIcon(systemHealth.database.status)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Uptime: {systemHealth.database.uptime}% | Response:{" "}
                  {systemHealth.database.responseTime}ms
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wifi className="h-4 w-4" />
                    <span className="text-sm font-medium">API</span>
                  </div>
                  {getStatusIcon(systemHealth.api.status)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Uptime: {systemHealth.api.uptime}% | Response:{" "}
                  {systemHealth.api.responseTime}ms
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <HardDrive className="h-4 w-4" />
                    <span className="text-sm font-medium">Storage</span>
                  </div>
                  {getStatusIcon(systemHealth.storage.status)}
                </div>
                <Progress value={systemHealth.storage.usage} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {systemHealth.storage.usage}% of {systemHealth.storage.total}
                  GB used
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4" />
                    <span className="text-sm font-medium">Network</span>
                  </div>
                  {getStatusIcon(systemHealth.network.status)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Latency: {systemHealth.network.latency}ms
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              className="w-full justify-start"
              variant="outline"
              onClick={() => handleQuickAction("add_user")}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Add New User
            </Button>
            <Button
              className="w-full justify-start"
              variant="outline"
              onClick={() => handleQuickAction("create_announcement")}
            >
              <Megaphone className="mr-2 h-4 w-4" />
              Create Announcement
            </Button>
            <Button
              className="w-full justify-start"
              variant="outline"
              onClick={() => handleQuickAction("assign_coordinator")}
            >
              <UserCog className="mr-2 h-4 w-4" />
              Assign Coordinator
            </Button>
            <Button
              className="w-full justify-start"
              variant="outline"
              onClick={() => handleQuickAction("manage_templates")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Manage Templates
            </Button>
            <Separator />
            <Button
              className="w-full justify-start"
              variant="ghost"
              onClick={() => handleQuickAction("manage_roles")}
            >
              <Shield className="mr-2 h-4 w-4" />
              Manage Roles
            </Button>
            <Button
              className="w-full justify-start"
              variant="ghost"
              onClick={() => handleQuickAction("view_logs")}
            >
              <Eye className="mr-2 h-4 w-4" />
              View System Logs
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-7">
        <PatientsChart className="lg:col-span-4" />

        {/* System Alerts */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-3 p-3 rounded-lg border"
              >
                <div className="flex-shrink-0 mt-0.5">
                  {alert.type === "warning" && (
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  )}
                  {alert.type === "info" && (
                    <Bell className="h-4 w-4 text-blue-500" />
                  )}
                  {alert.type === "success" && (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{alert.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {alert.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {alert.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities and Active Users */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{activity.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-medium">{activity.user}</span>
                    <Badge variant="outline" className="text-xs">
                      {activity.userRole}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Active Users */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="text-xs">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${getUserStatusColor(
                        user.status
                      )}`}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {user.lastActive}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreVertical className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => router.push(`/staff/${user.id}`)}
                      >
                        <Eye className="mr-2 h-3 w-3" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          (window.location.href = `mailto:${user.email}`)
                        }
                      >
                        <Mail className="mr-2 h-3 w-3" />
                        Send Email
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-3 w-3" />
                        Edit User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
