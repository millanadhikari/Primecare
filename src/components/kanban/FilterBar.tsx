"use client";

import { Task, User } from "@/types";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";

interface FilterBarProps {
  filters: {
    client: string;
    assignedUser: string;
    priority: string;
    dueDate: string;
    search: string;
  };
  onFiltersChange: (filters: any) => void;
  users: User[];
  tasks: Task[];
}

export function FilterBar({
  filters,
  onFiltersChange,
  users,
  tasks,
}: FilterBarProps) {
  const clearFilters = () => {
    onFiltersChange({
      client: "",
      assignedUser: "",
      priority: "",
      dueDate: "",
      search: "",
    });
  };

  const hasActiveFilters = Object.values(filters).some(
    (filter) => filter !== ""
  );

  return (
    <div className="bg-white dark:bg-background/80 border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6">
      <div className="flex items-center space-x-2 mb-4 ">
        <Filter className="w-4 h-4 text-gray-500" />
        <h3 className="font-medium text-gray-900 dark:text-white">Filters</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs"
          >
            <X className="w-3 h-3 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search tasks..."
            value={filters.search}
            onChange={(e) =>
              onFiltersChange({ ...filters, search: e.target.value })
            }
            className="pl-10"
          />
        </div>

        <Input
          placeholder="Filter by client..."
          value={filters.client}
          onChange={(e) =>
            onFiltersChange({ ...filters, client: e.target.value })
          }
        />

        <Select
          value={filters.assignedUser}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, assignedUser: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Assigned user" />
          </SelectTrigger>
          <SelectContent>
            {users?.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                {user.firstName} {user.lastName} ({user.role})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.priority}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, priority: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="urgent">Urgent</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.dueDate}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, dueDate: value })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Due date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="today">Due today</SelectItem>
            <SelectItem value="week">Due this week</SelectItem>
            <SelectItem value="month">Due this month</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
