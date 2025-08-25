"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Task, TaskStatus, TaskPriority } from "@/types";
import {
  Calendar as CalendarIcon,
  User as UserIcon,
  Clock,
} from "lucide-react";
import { format } from "date-fns";

interface EditTaskModalProps {
  task: Task;
  open: boolean;
  onClose: () => void;
  onSubmit: (updates: Partial<Task>) => void;
  users: User[];
}

export function EditTaskModal({
  task,
  open,
  onClose,
  onSubmit,
  users,
}: EditTaskModalProps) {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description || "",
    clientName: task.clientName,
    assignedUserId: task.assignedUserId,
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate ? format(task.dueDate, "yyyy-MM-dd") : "",
  });

  useEffect(() => {
    setFormData({
      title: task.title,
      description: task.description || "",
      clientName: task.clientName,
      assignedUserId: task.assignedUserId,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate ? format(task.dueDate, "yyyy-MM-dd") : "",
    });
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.clientName.trim()) return;

    onSubmit({
      ...formData,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Task Title *
              </label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="Enter task title..."
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Client Name *
              </label>
              <Input
                value={formData.clientName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    clientName: e.target.value,
                  }))
                }
                placeholder="Enter client name..."
                required
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2 flex items-center">
                <UserIcon className="w-4 h-4 mr-1" />
                Assigned User *
              </label>
              <Select
                value={formData.assignedUserId}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, assignedUserId: value }))
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select user..." />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user?.firstName} {user?.lastName} ({user.role})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Status
              </label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: value as TaskStatus,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TODO">To Do</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="REVIEW">Review</SelectItem>
                  <SelectItem value="DONE">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Priority
              </label>
              <Select
                value={formData.priority}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    priority: value as TaskPriority,
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOW">Low</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HIGH">High</SelectItem>
                  <SelectItem value="URGENT">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2 flex items-center">
                <CalendarIcon className="w-4 h-4 mr-1" />
                Due Date
              </label>
              <Input
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, dueDate: e.target.value }))
                }
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Description
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Enter task description..."
              rows={3}
            />
          </div>

          <div className="text-xs text-gray-500 flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              Created: {format(task.createdAt, "MMM d, yyyy")}
            </div>
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              Updated: {format(task.updatedAt, "MMM d, yyyy")}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-black text-white hover:bg-gray-800"
              disabled={!formData.title.trim() || !formData.clientName.trim()}
            >
              Update Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
