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
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Project } from "@/types";
import { Users } from "lucide-react";

interface EditProjectModalProps {
  project: Project;
  open: boolean;
  onClose: () => void;
  onSubmit: (projectId: string, updates: Partial<Project>) => void;
  users: User[];
}
export function EditProjectModal({
  project,
  open,
  onClose,
  onSubmit,
  users,
}: EditProjectModalProps) {
  // Extract assignedUsers as an array of full user objects
  const getAssignedUsers = (assignedUsers: any[]) => {
    if (!assignedUsers) return [];
    // If they are objects with ids, return as is, else empty array
    return assignedUsers.every((u) => typeof u === "object" && u.id)
      ? assignedUsers
      : [];
  };

  const [formData, setFormData] = useState({
    name: project?.name ?? "",
    description: project?.description ?? "",
    assignedUsers: getAssignedUsers(project?.assignedUsers ?? []),
  });

  useEffect(() => {
    setFormData({
      name: project?.name ?? "",
      description: project?.description ?? "",
      assignedUsers: getAssignedUsers(project?.assignedUsers ?? []),
    });
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    onSubmit(project?.id, formData);
    onClose();
  };

  // Toggle full user objects in assignedUsers
  const handleUserToggle = (userId: string) => {
    setFormData((prev) => {
      const exists = prev.assignedUsers.some((u) => u.id === userId);

      if (exists) {
        // Remove user object
        return {
          ...prev,
          assignedUsers: prev.assignedUsers.filter((u) => u.id !== userId),
        };
      } else {
        // Add full user object from users list
        const userToAdd = users.find((u) => u.id === userId);
        if (!userToAdd) return prev;
        return {
          ...prev,
          assignedUsers: [...prev.assignedUsers, userToAdd],
        };
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Project Name */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Project Name *
            </label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              placeholder="Enter project name..."
              required
            />
          </div>

          {/* Description */}
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

          {/* Assign Users */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Assign Users
            </label>
            <ScrollArea className="h-32 border border-gray-200 rounded-md p-3 overflow-y-auto">
              <div className="space-y-2">
                {users.map((user) => {
                  const isChecked = formData.assignedUsers.some(
                    (assignedUser) => assignedUser.id === user.id
                  );
                  return (
                    <div key={user.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={user.id}
                        checked={isChecked}
                        onCheckedChange={() => handleUserToggle(user.id)}
                      />
                      <label
                        htmlFor={user.id}
                        className="text-sm text-gray-700 flex-1 cursor-pointer"
                      >
                        <span className="font-medium">
                          {user.firstName} {user.lastName}
                        </span>
                        <span className="text-gray-500 ml-2">
                          ({user.role})
                        </span>
                      </label>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-black text-white hover:bg-gray-800"
              disabled={!formData.name.trim()}
            >
              Update Project
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
