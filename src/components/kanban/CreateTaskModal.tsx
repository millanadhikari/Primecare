"use client";

import { useState } from "react";
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
import { Calendar as CalendarIcon, User as UserIcon } from "lucide-react";

export type UserRole = "ADMIN" | "COORDINATOR" | "STAFF";
export type TaskStatus = 'TODO' | 'IN-PROGRESS' | 'REVIEW' | 'DONE'
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  clientName: string;
  assignedUserId: string;
  projectId: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  comments?: TaskComment[];
}

export interface TaskComment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: Date;
}
interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => void;
  users: User[];
  projectId: string;
}

export function CreateTaskModal({
  open,
  onClose,
  onSubmit,
  users,
  projectId,
}: CreateTaskModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    clientName: "",
    assignedUserId: "",
    status: "TODO" as TaskStatus,
    priority: "MEDIUM" as TaskPriority,
    dueDate: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.title.trim() ||
      !formData.clientName.trim() ||
      !formData.assignedUserId
    )
      return;

    onSubmit({
      ...formData,
      projectId,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
    });

    setFormData({
      title: "",
      description: "",
      clientName: "",
      assignedUserId: "",
      status: "TODO",
      priority: "MEDIUM",
      dueDate: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
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
                      {user.firstName} ({user.role})
                    </SelectItem>
                  ))}
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

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-black text-white hover:bg-gray-800"
              disabled={
                !formData.title.trim() ||
                !formData.clientName.trim() ||
                !formData.assignedUserId
              }
            >
              Create Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
