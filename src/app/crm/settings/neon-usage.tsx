"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Database,
  BarChart2,
  Users,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Info,
  HardDrive,
} from "lucide-react";

interface NeonUsageData {
  project_name: string;
  last_updated: string;
  storage: {
    usage: number; // in bytes
    limit: number; // in bytes
  };
  bandwidth: {
    usage: number; // in bytes
    limit: number; // in bytes
  };
  active_connections: {
    usage: number;
    limit: number;
  };
}
export function NeonUsage() {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    const mockNeonUsageData: NeonUsageData = {
      project_name: "my-neon-project",
      last_updated: new Date().toISOString(),
      storage: {
        usage: 1_073_741_824, // 1 GB
        limit: 5_368_709_120, // 5 GB
      },
      bandwidth: {
        usage: 2_147_483_648, // 2 GB
        limit: 10_737_418_240, // 10 GB
      },
      active_connections: {
        usage: 15,
        limit: 100,
      },
    };
    setIsLoading(true);
    try {
      const res = await fetch("https://primebackend.onrender.com/api/cloudinary/neon");
      const json = await res.json();
    //   console.log(res)
      setData(json);
      //   setData(mockNeonUsageData);
    } catch (error) {
      console.error("Failed to load Neon usage:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
    toast.success("Neon usage refreshed");
  };

  const formatBytes = (bytes: number): string => {
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
  };

  const getUsagePercentage = (usage: number, limit: number) =>
    Math.round((usage / limit) * 100);

  const getStatus = (percentage: number) => {
    if (percentage >= 90)
      return { variant: "destructive", icon: AlertTriangle, text: "Critical" };
    if (percentage >= 75)
      return { variant: "secondary", icon: Info, text: "Warning" };
    return { variant: "default", icon: CheckCircle, text: "Healthy" };
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-600" />
            Neon DB Usage
          </CardTitle>
          <Skeleton className="h-6 w-16" />
        </CardHeader>
        <CardContent className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-2 w-full" />
              <div className="flex justify-between">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  const storagePct = getUsagePercentage(data.storage.usage, data.storage.limit);
  const bandwidthPct = getUsagePercentage(
    data.bandwidth.usage,
    data.bandwidth.limit
  );
  const connPct = getUsagePercentage(
    data.active_connections.usage,
    data.active_connections.limit
  );

  const storageStatus = getStatus(storagePct);
  const bandwidthStatus = getStatus(bandwidthPct);
  const connStatus = getStatus(connPct);
  const getPlanBadgeVariant = (plan: string) => {
    switch (plan.toLowerCase()) {
      case "free":
        return "outline";
      case "basic":
        return "secondary";
      case "pro":
        return "default";
      case "enterprise":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Card>
      <CardHeader className="">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-600" />
            <CardTitle>Neon DB Usage</CardTitle>
            <Badge variant="outline">{data.project_name}</Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              Last updated:{" "}
              {format(new Date(data.last_updated), "MMM dd, HH:mm")}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw
                className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Storage */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <div className="flex gap-2 items-center">
              <HardDrive className="w-4 h-4 text-blue-500" />
              <span className="font-medium text-sm">Storage</span>
              <Badge
                variant={getPlanBadgeVariant(storageStatus.variant)}
                className="text-xs"
              >
                <storageStatus.icon className="w-3 h-3 mr-1" />
                {storageStatus.text}
              </Badge>
            </div>
            <span className="text-sm">{storagePct}%</span>
          </div>
          <Progress value={storagePct} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatBytes(data.storage.usage)} used</span>
            <span>{formatBytes(data.storage.limit)} total</span>
          </div>
        </div>

        {/* Bandwidth */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <div className="flex gap-2 items-center">
              <BarChart2 className="w-4 h-4 text-green-600" />
              <span className="font-medium text-sm">Bandwidth</span>
              <Badge
                variant={getPlanBadgeVariant(bandwidthStatus.variant)}
                className="text-xs"
              >
                <bandwidthStatus.icon className="w-3 h-3 mr-1" />
                {bandwidthStatus.text}
              </Badge>
            </div>
            <span className="text-sm">{bandwidthPct}%</span>
          </div>
          <Progress value={bandwidthPct} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatBytes(data.bandwidth.usage)} used</span>
            <span>{formatBytes(data.bandwidth.limit)} total</span>
          </div>
        </div>

        {/* Active Connections */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <div className="flex gap-2 items-center">
              <Users className="w-4 h-4 text-orange-500" />
              <span className="font-medium text-sm">Active Connections</span>
              <Badge
                variant={getPlanBadgeVariant(connStatus.variant)}
                //   variant={connStatus.variant}
                className="text-xs"
              >
                <connStatus.icon className="w-3 h-3 mr-1" />
                {connStatus.text}
              </Badge>
            </div>
            <span className="text-sm">{connPct}%</span>
          </div>
          <Progress value={connPct} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{data.active_connections.usage} used</span>
            <span>{data.active_connections.limit} total</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
