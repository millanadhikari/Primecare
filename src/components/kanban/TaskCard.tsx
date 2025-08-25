"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task, User, UserRole } from "@/types";
import {
  Calendar,
  User as UserIcon,
  AlertCircle,
  GripVertical,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface TaskCardProps {
  task: Task;
  users: User[];
  onEdit: () => void;
  onDelete?: () => void;
  userRole: UserRole;
  currentUserId: string;
}

export function TaskCard({
  task,
  users,
  onEdit,
  onDelete,
  userRole,
  currentUserId,
}: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const assignedUser = users.find((user) => user.id === task.assignedUserId);
  const canEdit =
    userRole === "ADMIN" ||
    userRole === "COORDINATOR" ||
    task.assignedUserId === currentUserId;
  const canDrag =
    userRole === "ADMIN" ||
    userRole === "COORDINATOR" ||
    (userRole === "STAFF" && task.assignedUserId === currentUserId);
  const canDelete =
    userRole === "ADMIN" ||
    userRole === "COORDINATOR" ||
    task.assignedUserId === currentUserId;
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "URGENT":
        return "bg-red-100 text-red-800 border-red-200";
      case "HIGH":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "LOW":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "DONE";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 text-sm leading-tight">
            {task.title}
          </h4>
          <p className="text-xs text-gray-600 mt-1">
            Client: {task.clientName}
          </p>
        </div>

        <div className="flex items-center space-x-1 ml-2">
          {(canEdit || canDelete) && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="group">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="w-3 h-3" />
                  </Button>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {canEdit && (
                  <DropdownMenuItem onClick={onEdit}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Task
                  </DropdownMenuItem>
                )}
                {canDelete && (
                  <DropdownMenuItem
                    onClick={onDelete}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Task
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {canDrag && (
            <div
              {...attributes}
              {...listeners}
              className="cursor-grab hover:bg-gray-100 p-1 rounded"
            >
              <GripVertical className="w-3 h-3 text-gray-400" />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <Badge className={getPriorityColor(task.priority)}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </Badge>

          {isOverdue && (
            <div className="flex items-center text-red-600">
              <AlertCircle className="w-3 h-3 mr-1" />
              <span>Overdue</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center">
            <UserIcon className="w-3 h-3 mr-1" />
            <span className="truncate">{assignedUser?.firstName}</span>
          </div>

          {task.dueDate && (
            <div
              className={`flex items-center ${isOverdue ? "text-red-600" : ""}`}
            >
              <Calendar className="w-3 h-3 mr-1" />
              <span>{format(new Date(task.dueDate), "MMM d")}</span>
            </div>
          )}
        </div>

        {task.description && (
          <p className="text-xs text-gray-600 line-clamp-2 mt-2">
            {task.description}
          </p>
        )}
      </div>
    </div>
  );
}
