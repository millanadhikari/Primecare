// SkeletonActivityRow.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function SkeletonActivityRow() {
  return (
    <div
      className={cn("flex items-start space-x-4 p-4 rounded-lg border mb-2")}
    >
      {/* Avatar skeleton */}
      <Skeleton className="h-10 w-10 rounded-full" />

      {/* Text skeletons */}
      <div className="flex-1 min-w-0 space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-3 w-[320px]" />
        <div className="flex gap-2 mt-1">
          <Skeleton className="h-5 w-[80px]" />
          <Skeleton className="h-3 w-[90px]" />
          <Skeleton className="h-3 w-[50px]" />
        </div>
      </div>

      {/* Icon skeleton */}
      <Skeleton className="h-6 w-6 rounded" />
    </div>
  );
}
