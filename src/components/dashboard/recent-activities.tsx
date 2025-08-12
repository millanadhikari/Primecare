import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  description: string;
  user: string;
  time: string;
  type: "info" | "success" | "warning" | "error";
}

interface RecentActivitiesProps {
  activities: Activity[];
  className?: string;
}

export function RecentActivities({ activities, className }: RecentActivitiesProps) {
  return (
    <Card className={cn("col-span-2", className)}>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="relative pl-6">
              <div
                className={cn(
                  "absolute left-0 top-1 h-3 w-3 rounded-full",
                  activity.type === "info" && "bg-blue-500",
                  activity.type === "success" && "bg-green-500",
                  activity.type === "warning" && "bg-yellow-500",
                  activity.type === "error" && "bg-red-500"
                )}
              />
              <div className="space-y-1">
                <p className="text-sm">{activity.description}</p>
                <p className="text-xs text-muted-foreground">
                  {activity.user} • {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}