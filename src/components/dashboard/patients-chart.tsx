"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";

// Sample data
const data = [
  { month: "Jan", new: 65, returning: 42 },
  { month: "Feb", new: 80, returning: 58 },
  { month: "Mar", new: 75, returning: 60 },
  { month: "Apr", new: 90, returning: 65 },
  { month: "May", new: 95, returning: 70 },
  { month: "Jun", new: 85, returning: 75 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-xs font-medium text-muted-foreground">
              Month
            </span>
            <span className="font-bold">{label}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium text-muted-foreground">
              Total
            </span>
            <span className="font-bold">
              {payload[0].value + payload[1].value}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-chart-1"></span>
              New
            </span>
            <span className="font-bold">{payload[0].value}</span>
          </div>
          <div className="flex flex-col">
            <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-chart-2"></span>
              Returning
            </span>
            <span className="font-bold">{payload[1].value}</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

interface PatientsChartProps {
  className?: string;
}

export function PatientsChart({ className }: PatientsChartProps) {
  return (
    <Card className={cn("col-span-5", className)}>
      <CardHeader>
        <CardTitle>Patient Visits</CardTitle>
        <CardDescription>New vs returning patients over time</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 5,
                right: 5,
                left: -5,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorReturning" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                vertical={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="new"
                stroke="hsl(var(--chart-1))"
                fillOpacity={1}
                fill="url(#colorNew)"
              />
              <Area
                type="monotone"
                dataKey="returning"
                stroke="hsl(var(--chart-2))"
                fillOpacity={1}
                fill="url(#colorReturning)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}