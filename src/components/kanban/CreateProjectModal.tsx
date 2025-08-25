"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";

export type UserRole = "admin" | "coordinator" | "staff";
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  assignedUsers: string[];
  createdAt: Date;
  updatedAt: Date;
}
interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (project: Omit<Project, "id" | "createdAt" | "updatedAt">) => void;
  users: any
}

export function CreateProjectModal({
  open,
  onClose,
  onSubmit,
  users,
}: CreateProjectModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    assignedUsers: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    onSubmit(formData);
    setFormData({ name: "", description: "", assignedUsers: [] });
    onClose();
  };

  const handleUserToggle = (userId: string) => {
    setFormData((prev) => ({
      ...prev,
      assignedUsers: prev.assignedUsers.includes(userId)
        ? prev.assignedUsers.filter((id) => id !== userId)
        : [...prev.assignedUsers, userId],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Project Name *
            </label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Enter project name..."
              required
            />
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
              placeholder="Enter project description..."
              rows={3}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Assign Users
            </label>
            <ScrollArea className="h-32 border border-gray-200 rounded-md p-3">
              <div className="space-y-2">
                {users?.map((user) => (
                  <div key={user.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={user.id}
                      checked={formData.assignedUsers.includes(user.id)}
                      onCheckedChange={() => handleUserToggle(user.id)}
                    />
                    <label
                      htmlFor={user.id}
                      className="text-sm text-gray-700 flex-1 cursor-pointer"
                    >
                      <span className="font-medium">{user.firstName} {user.lastName}</span>
                      <span className="text-gray-500 ml-2">({user.role})</span>
                    </label>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-black text-white hover:bg-gray-800"
              disabled={!formData.name.trim()}
            >
              Create Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
