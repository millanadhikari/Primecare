import React from "react";
import { TableCell, TableRow } from "@/components/ui/table"; // Adjust import path if needed

export function SkeletonRow() {
  // Tailwind gray boxes with pulse animation
  const skeletonClass =
    "h-4 rounded bg-gray-300 dark:bg-gray-700 animate-pulse";

  return (
    <TableRow>
      <TableCell>
        <div className={`w-4 ${skeletonClass}`} />
      </TableCell>
      <TableCell>
        <div className={`w-4 ${skeletonClass}`} />
      </TableCell>
      <TableCell>
        <div className={`w-20 ${skeletonClass}`} />
      </TableCell>
      <TableCell>
        <div className={`w-16 ${skeletonClass}`} />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <div className={`w-40 ${skeletonClass}`} />
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        <div className={`w-12 ${skeletonClass}`} />
      </TableCell>
      <TableCell className="hidden lg:table-cell">
        <div className={`w-16 ${skeletonClass}`} />
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <div className={`w-20 ${skeletonClass}`} />
      </TableCell>
      <TableCell>
        <div className={`w-4 ${skeletonClass}`} />
      </TableCell>
    </TableRow>
  );
}
