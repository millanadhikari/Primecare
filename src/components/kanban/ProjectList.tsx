"use client";

import { Project, UserRole } from "@/types";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Folder, FolderOpen, MoreVertical, Edit, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProjectListProps {
  projects: Project[];
  selectedProject: string;
  onSelectProject: (projectId: string) => void;
  userRole: UserRole;
  onEditProject?: (project: Project) => void;
  onDeleteProject?: (project: Project) => void;
}

export function ProjectList({
  projects,
  selectedProject,
  onSelectProject,
  userRole,
  onEditProject,
  onDeleteProject,
}: ProjectListProps) {
  const canManageProjects = userRole === "ADMIN" || userRole === "COORDINATOR";

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900">Projects</h2>
      </div>

      <ScrollArea className="max-h-96">
        <div className="p-2">
          {projects && projects?.map((project) => (
            <div
              key={project.id}
              className={`relative group rounded-md mb-1 ${
                selectedProject === project.id
                  ? "bg-black text-white"
                  : "hover:bg-gray-50"
              }`}
            >
              <Button
                variant="ghost"
                className={`w-full justify-start h-auto p-3 ${
                  selectedProject === project.id
                    ? "bg-black text-white hover:bg-gray-800"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => onSelectProject(project.id)}
              >
                <div className="flex items-start space-x-3 text-left flex-1">
                  {selectedProject === project.id ? (
                    <FolderOpen className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  ) : (
                    <Folder className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">
                      {project.name}
                    </div>
                    <div
                      className={`text-xs mt-1 line-clamp-2 ${
                        selectedProject === project.id
                          ? "text-gray-300"
                          : "text-gray-500"
                      }`}
                    >
                      {project.description}
                    </div>
                  </div>
                </div>
              </Button>

              {canManageProjects && (
                <div className="absolute top-2 right-2 lg:left-52">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                          selectedProject === project.id
                            ? "text-white hover:bg-gray-700"
                            : "text-gray-500 hover:bg-gray-100"
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="w-3 h-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onEditProject?.(project)}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Project
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDeleteProject?.(project)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
