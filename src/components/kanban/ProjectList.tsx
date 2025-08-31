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
    <div className="bg-white dark:bg-background/80 border border-gray-200 dark:border-gray-700 rounded-lg">
      {" "}
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900 dark:text-white">
          Projects
        </h2>
      </div>
      {/* Custom slim scrollbar using Tailwind and custom styles */}
      <ScrollArea className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="p-2 flex flex-col gap-1">
          {projects?.map((project) => (
            <div
              key={project.id}
              className={`relative group rounded-md flex items-center transition ${
                selectedProject === project.id
                  ? "bg-black text-white"
                  : "hover:bg-gray-50"
              }`}
            >
              <Button
                variant="ghost"
                className={`
    flex-1 text-left h-auto p-3 flex flex-row items-start gap-3 transition-colors duration-150 rounded-md
    ${
      selectedProject === project.id
        ? `bg-gray-900 dark:bg-gray-100 text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200`
        : `bg-transparent text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white`
    }
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
    active:bg-gray-200 dark:active:bg-gray-600
  `}
                onClick={() => onSelectProject(project.id)}
              >
                {selectedProject === project.id ? (
                  <FolderOpen className="w-4 h-4 mt-0.5 text-white dark:text-black flex-shrink-0" />
                ) : (
                  <Folder className="w-4 h-4 mt-0.5 text-gray-400 dark:text-gray-400 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div
                    className={`font-medium text-sm truncate ${
                      selectedProject === project.id
                        ? "text-white dark:text-black"
                        : "text-gray-900 dark:text-gray-200 hover:text-gray-700 dark:hover:text-white"
                    }`}
                  >
                    {project.name}
                  </div>
                  <div
                    className={`text-xs mt-1 line-clamp-2 ${
                      selectedProject === project.id
                        ? "text-gray-300 dark:text-gray-600"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {project.description}
                  </div>
                </div>
              </Button>

              {canManageProjects && (
                <div className="flex px-2 absolute right-2 lg:left-48 top-2 h-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-6 w-6 p-0 opacity-100 transition-opacity ${
                          selectedProject === project.id
                            ? "text-white hover:bg-gray-700"
                            : "text-gray-500 hover:bg-gray-100"
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="w-4 h-4" />
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
