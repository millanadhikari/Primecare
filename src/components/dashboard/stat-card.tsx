import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cva, type VariantProps } from "class-variance-authority";

const statCardVariants = cva("", {
  variants: {
    variant: {
      default: "",
      success: "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/50",
      warning: "border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/50",
      danger: "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/50",
      info: "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/50",
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

interface StatCardProps extends VariantProps<typeof statCardVariants> {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: {
    value: string;
    trend: "up" | "down" | "neutral";
  };
  className?: string;
}

export function StatCard({
  title,
  value,
  icon,
  change,
  variant,
  className,
}: StatCardProps) {
  return (
    <Card className={cn(statCardVariants({ variant }), className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="text-xs text-muted-foreground">
            <span
              className={cn(
                "mr-1 font-medium",
                change.trend === "up" && "text-green-600 dark:text-green-400",
                change.trend === "down" && "text-red-600 dark:text-red-400"
              )}
            >
              {change.value}
            </span>
            from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}