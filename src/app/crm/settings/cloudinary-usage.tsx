"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Cloud,
  HardDrive,
  Activity,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Info,
  TrendingUp,
} from "lucide-react";

interface CloudinaryData {
  plan: string;
  last_updated: string;
  storage: {
    usage: number; // in bytes
    limit: number; // in bytes
  };
  requests: {
    usage: number;
    limit: number;
  };
  bandwidth: {
    usage: number; // in bytes
    limit: number; // in bytes
  };
  transformations: {
    usage: number;
    limit: number;
  };
}

export function CloudinaryUsage() {
  const [data, setData] = useState<CloudinaryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Known plan limits (adjust as needed)
  const PLAN_LIMITS: Record<string, Partial<CloudinaryData>> = {
    free: {
      storage: { usage: 0, limit: 50 * 1024 * 1024 * 1024 }, // 50 GB
      bandwidth: { usage: 0, limit: 20 * 1024 * 1024 * 1024 }, // 20 GB (example)
      transformations: { usage: 0, limit: 25000 },
      requests: { usage: 0, limit: 1000 },
      plan: "Free",
      last_updated: "",
    },
    // add other plans if you want here
  };

  const allowedBadgeVariants = [
    "default",
    "secondary",
    "destructive",
    "outline",
  ] as const;
  type BadgeVariant = (typeof allowedBadgeVariants)[number];

  function isBadgeVariant(value: string): value is BadgeVariant {
    return allowedBadgeVariants.includes(value as BadgeVariant);
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://primebackend.onrender.com/api/cloudinary");
        if (!response.ok) {
          throw new Error("Failed to fetch Cloudinary usage");
        }
        const rawData = await response.json();

        // Fill limits based on plan
        const planKey = rawData.plan?.toLowerCase() || "free";
        const limits = PLAN_LIMITS[planKey] || PLAN_LIMITS["free"];

        // Build data with limits
        const dataWithLimits: CloudinaryData = {
          plan: rawData.plan || "Free",
          last_updated: rawData.last_updated || new Date().toISOString(),
          storage: {
            usage: rawData.storage?.usage || 0,
            limit: limits.storage?.limit || 0,
          },
          bandwidth: {
            usage: rawData.bandwidth?.usage || 0,
            limit: limits.bandwidth?.limit || 0,
          },
          transformations: {
            usage: rawData.transformations?.usage || 0,
            limit: limits.transformations?.limit || 0,
          },
          requests: {
            usage: rawData.requests || 0,
            limit: limits.requests?.limit || 0,
          },
        };

        setData(dataWithLimits);
      } catch (error) {
        console.error("Error fetching Cloudinary usage:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch("http://localhost:3000/api/cloudinary");
      if (!response.ok) {
        throw new Error("Failed to refresh Cloudinary usage");
      }

      const rawData = await response.json();

      // Get plan limits
      const planKey = rawData.plan?.toLowerCase() || "free";
      const limits = PLAN_LIMITS[planKey] || PLAN_LIMITS["free"];

      const updatedData: CloudinaryData = {
        plan: rawData.plan || "Free",
        last_updated: rawData.last_updated || new Date().toISOString(),
        storage: {
          usage: rawData.storage?.usage || 0,
          limit: limits.storage?.limit || 0,
        },
        bandwidth: {
          usage: rawData.bandwidth?.usage || 0,
          limit: limits.bandwidth?.limit || 0,
        },
        transformations: {
          usage: rawData.transformations?.usage || 0,
          limit: limits.transformations?.limit || 0,
        },
        requests: {
          usage: rawData.requests || 0,
          limit: limits.requests?.limit || 0,
        },
      };

      setData(updatedData);
      toast.success("Usage data refreshed");
    } catch (error) {
      console.error("Error refreshing usage:", error);
      toast.error("Failed to refresh usage data");
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat().format(num);
  };

  const getUsagePercentage = (usage: number, limit: number): number => {
    if (limit === 0) return 0;
    return Math.round((usage / limit) * 100);
  };

  const getUsageStatus = (percentage: number) => {
    if (percentage >= 90)
      return { color: "destructive", icon: AlertTriangle, text: "Critical" };
    if (percentage >= 75)
      return { color: "secondary", icon: Info, text: "Warning" };
    return { color: "default", icon: CheckCircle, text: "Good" };
  };

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

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cloud className="h-5 w-5" />
              <CardTitle>Cloudinary Usage</CardTitle>
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-2 w-full" />
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  const storagePercentage = getUsagePercentage(
    data.storage.usage,
    data.storage.limit
  );
  const requestsPercentage = getUsagePercentage(
    data.requests.usage,
    data.requests.limit
  );
  const bandwidthPercentage = getUsagePercentage(
    data.bandwidth.usage,
    data.bandwidth.limit
  );
  const transformationsPercentage = getUsagePercentage(
    data.transformations.usage,
    data.transformations.limit
  );

  const storageStatus = getUsageStatus(storagePercentage);
  const requestsStatus = getUsageStatus(requestsPercentage);
  const bandwidthStatus = getUsageStatus(bandwidthPercentage);
  const transformationsStatus = getUsageStatus(transformationsPercentage);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-blue-500" />
            <CardTitle>Cloudinary Usage</CardTitle>
            <Badge
              variant={getPlanBadgeVariant(data.plan)}
              className="capitalize"
            >
              {data.plan} Plan
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              Last updated:{" "}
              {data.last_updated
                ? format(new Date(data.last_updated), "MMM dd, HH:mm")
                : "Unknown"}
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
        <div className="grid gap-6 md:grid-cols-2">
          {/* Storage Usage */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-blue-500" />
                <span className="font-medium">Storage</span>
                <Badge
                  variant={
                    isBadgeVariant(storageStatus.color)
                      ? storageStatus.color
                      : "default"
                  }
                  className="text-xs"
                >
                  <storageStatus.icon className="h-3 w-3 mr-1" />
                  {storageStatus.text}
                </Badge>
              </div>
              <span className="text-sm font-medium">{storagePercentage}%</span>
            </div>
            <Progress
              value={storagePercentage}
              className="h-2"
              // @ts-ignore
              style={
                {
                  "--progress-background":
                    storagePercentage >= 90
                      ? "hsl(var(--destructive))"
                      : storagePercentage >= 75
                      ? "hsl(var(--warning))"
                      : "hsl(var(--primary))",
                } as React.CSSProperties & { [key: string]: string }
              }
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatBytes(data.storage.usage)} used</span>
              <span>{formatBytes(data.storage.limit)} total</span>
            </div>
          </div>

          {/* API Requests */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-500" />
                <span className="font-medium">API Requests</span>
                <Badge
                  variant={
                    isBadgeVariant(requestsStatus.color)
                      ? requestsStatus.color
                      : "default"
                  }
                  className="text-xs"
                >
                  <requestsStatus.icon className="h-3 w-3 mr-1" />
                  {requestsStatus.text}
                </Badge>
              </div>
              <span className="text-sm font-medium">{requestsPercentage}%</span>
            </div>
            <Progress value={requestsPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatNumber(data.requests.usage)} used</span>
              <span>{formatNumber(data.requests.limit)} total</span>
            </div>
          </div>

          {/* Bandwidth */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-500" />
                <span className="font-medium">Bandwidth</span>
                <Badge
                  variant={
                    isBadgeVariant(bandwidthStatus.color)
                      ? bandwidthStatus.color
                      : "default"
                  }
                  className="text-xs"
                >
                  <bandwidthStatus.icon className="h-3 w-3 mr-1" />
                  {bandwidthStatus.text}
                </Badge>
              </div>
              <span className="text-sm font-medium">
                {bandwidthPercentage}%
              </span>
            </div>
            <Progress value={bandwidthPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatBytes(data.bandwidth.usage)} used</span>
              <span>{formatBytes(data.bandwidth.limit)} total</span>
            </div>
          </div>

          {/* Transformations */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 text-orange-500" />
                <span className="font-medium">Transformations</span>
                <Badge
                  variant={
                    isBadgeVariant(transformationsStatus.color)
                      ? transformationsStatus.color
                      : "default"
                  }
                  className="text-xs"
                >
                  <transformationsStatus.icon className="h-3 w-3 mr-1" />
                  {transformationsStatus.text}
                </Badge>
              </div>
              <span className="text-sm font-medium">
                {transformationsPercentage}%
              </span>
            </div>
            <Progress value={transformationsPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{formatNumber(data.transformations.usage)} used</span>
              <span>{formatNumber(data.transformations.limit)} total</span>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="rounded-lg bg-muted/50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <Info className="h-4 w-4 text-blue-500" />
            <span className="font-medium text-sm">Usage Summary</span>
          </div>
          <div className="grid gap-2 text-xs text-muted-foreground md:grid-cols-2">
            <div>
              • Storage: {formatBytes(data.storage.limit - data.storage.usage)}{" "}
              remaining
            </div>
            <div>
              • Requests:{" "}
              {formatNumber(data.requests.limit - data.requests.usage)}{" "}
              remaining
            </div>
            <div>
              • Bandwidth:{" "}
              {formatBytes(data.bandwidth.limit - data.bandwidth.usage)}{" "}
              remaining
            </div>
            <div>
              • Transformations:{" "}
              {formatNumber(
                data.transformations.limit - data.transformations.usage
              )}{" "}
              remaining
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
