"use client";

import { useState, useEffect, useRef } from "react";
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { KanbanBoard } from "@/components/kanban/KanbanBoard";
import { ProjectList } from "@/components/kanban/ProjectList";
import { FilterBar } from "@/components/kanban/FilterBar";
import { CreateProjectModal } from "@/components/kanban/CreateProjectModal";
import { CreateTaskModal } from "@/components/kanban/CreateTaskModal";
import { EditTaskModal } from "@/components/kanban/EditTaskModal";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus, Layout, List } from "lucide-react";
import { mockProjects, mockUsers, mockTasks } from "@/lib/mockData";
import {
  Project,
  Task,
  User,
  UserRole,
  TaskStatus,
  TaskPriority,
} from "@/types";
import { MainLayout } from "@/components/layout/main-layout";
import { useAuth } from "@/app/context/AuthContext";
import { create } from "domain";
import {
  createProject,
  createTask,
  deleteProject,
  deleteTask,
  getProjects,
  getTasks,
  updateProject,
  updateTask,
} from "@/app/lib/projectApi";
import { getStaffs } from "@/app/lib/staffApi";
import { get } from "http";
import { set } from "date-fns";
import { EditProjectModal } from "@/components/kanban/EditProjectModal";
import { DeleteConfirmModal } from "@/components/kanban/DeleteConfirmModal";

export default function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<"board" | "list">("board");
  const [projects, setProjects] = useState<Project[]>(null);
  const [tasks, setTasks] = useState<Task[]>(null);
  const [users, setUsers] = useState(null);
  const [selectedProject, setSelectedProject] = useState<string>("");
  const [showCreateProject, setShowCreateProject] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingItem, setDeletingItem] = useState<{
    type: "project" | "task";
    item: Project | Task;
  } | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const dragStartPosition = useRef<{ x: number; y: number } | null>(null);
  // Filter states
  const [filters, setFilters] = useState({
    client: "",
    assignedUser: "",
    priority: "",
    dueDate: "",
    search: "",
  });

  const canCreateProject =
    currentUser?.role === "ADMIN" || currentUser?.role === "COORDINATOR";
  const canCreateTask =
    currentUser?.role === "ADMIN" || currentUser?.role === "COORDINATOR";

  const filteredTasks = tasks?.filter((task) => {
    if (selectedProject && task.projectId !== selectedProject) return false;
    if (currentUser?.role === "STAFF" && task.assignedUserId !== currentUser.id)
      return false;
    if (
      filters.client &&
      !task.clientName.toLowerCase().includes(filters.client.toLowerCase())
    )
      return false;
    if (filters.assignedUser && task.assignedUserId !== filters.assignedUser)
      return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    if (
      filters.search &&
      !task.title.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;
    return true;
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Adjust as desired, e.g. 10 or 15
      },
    })
  );
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
    dragStartPosition.current = null; // Will set on first move
    setDragging(false);
  };

  const handleDragMove = (event: DragMoveEvent) => {
    if (!dragStartPosition.current) {
      dragStartPosition.current = { x: event.delta.x, y: event.delta.y };
    }
    const distance = Math.sqrt(
      Math.pow(event.delta.x - dragStartPosition.current.x, 2) +
        Math.pow(event.delta.y - dragStartPosition.current.y, 2)
    );

    if (distance > 5 && !dragging) {
      setDragging(true);
    }
  };
  const VALID_STATUSES = ["TODO", "IN_PROGRESS", "REVIEW", "DONE"];

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      setDragging(false);
      return;
    }
    const overId = typeof over.id === "string" ? over.id : String(over.id);
    // Simple check:
    if (!VALID_STATUSES.includes(overId)) {
      // Dropped on a task card or invalid target, ignore status update
      setActiveId(null);
      setDragging(false);
      return;
    }

    const taskId = active.id.toString();
    const newStatus = over.id as TaskStatus;

    console.log("Dragged task id:", active.id);
    console.log("Drop target id:", over?.id);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("No access token found");
        return;
      }
      console.log("newStatus:", newStatus);
      // Call your async API function to update the task status in backend
      await updateTask(taskId, { status: newStatus }, token);

      // Update frontend state only if the API call succeeds
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId
            ? { ...task, status: newStatus, updatedAt: new Date() }
            : task
        )
      );

      toast.success("Task status updated successfully");
    } catch (error) {
      console.error("Failed to update task status on drag end:", error);
      toast.error("Failed to update task status. Please try again.");
    } finally {
      setActiveId(null);
      setDragging(false);
    }
  };

  const handleCreateProject = async (
    projectData: Omit<Project, "id" | "createdAt" | "updatedAt">
  ) => {
    const newProject = {
      ...projectData,
      //   id: Date.now().toString(),
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
    };
    const addedProjects = await createProject(newProject, currentUser?.token);
    console.log("Added Projects:", addedProjects);
    setProjects((prev) => [...prev, addedProjects]);
    toast.success("Project created successfully");
  };
  const handleUpdateProject = async (
    projectId: string,
    updates: Partial<Project>
  ) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("No access token found");
        return;
      }
      // Call your API to update the project on the backend
      const updatedProject = await updateProject(projectId, updates, token);

      // Update local projects state with the updated project data
      setProjects((prev) =>
        prev.map((project) =>
          project.id === projectId
            ? { ...updatedProject, updatedAt: new Date() }
            : project
        )
      );

      toast.success("Project updated successfully");
    } catch (error) {
      console.error("Failed to update project:", error);
      toast.error("Failed to update project. Please try again.");
    }
  };

  const handleDeleteProject = async (project: Project) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("No access token found");
        return;
      }
      // Call API to delete the project
      await deleteProject(project.id, token);

      // Remove all tasks associated with the project locally
      setTasks((prev) => prev.filter((task) => task.projectId !== project.id));

      // Remove the project locally
      setProjects((prev) => prev.filter((p) => p.id !== project.id));

      // Clear selection if deleted project was selected
      if (selectedProject === project.id) {
        setSelectedProject("");
      }

      toast.success("Project deleted successfully");
    } catch (error) {
      console.error("Failed to delete project:", error);
      toast.error("Failed to delete project. Please try again.");
    }
  };

  const handleCreateTask = async (
    taskData: Omit<Task, "id" | "createdAt" | "updatedAt">
  ) => {
    const token = localStorage.getItem("accessToken");

    const newTask = {
      ...taskData,
      //   id: Date.now().toString(),
      //   createdAt: new Date(),
      //   updatedAt: new Date(),
    };
    console.log("Creating Task:", newTask);
    const addedTask = await createTask(newTask, token);
    console.log("Added Task:", addedTask);
    fetchTasks();
    // setTasks((prev) => [...prev, newTask]);
    toast.success("Task created successfully");
  };

  const handleUpdateTask = async (taskId: string, updates: Partial<Task>) => {
    try {
      // Call API to update the task
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("No access token found");
        return;
      }

      // Replace with your actual API function, e.g.:
      // const updatedTask = await updateTaskApi(taskId, updates, token);
      const updatedTask = await updateTask(taskId, updates, token);

      // Optimistically update frontend state
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId
            ? { ...task, ...updates, updatedAt: new Date() }
            : task
        )
      );

      toast.success("Task updated successfully");
    } catch (error) {
      console.error("Update task failed:", error);
      toast.error("Failed to update task");
    }
  };
  const handleDeleteTask = async (task: Task) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        toast.error("No access token found");
        return;
      }
      // Call your API to delete the task
      await deleteTask(task.id, token);

      // Update local state to remove the deleted task
      setTasks((prev) => prev.filter((t) => t.id !== task.id));

      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast.error("Failed to delete task. Please try again.");
    }
  };

  const handleConfirmDelete = () => {
    if (!deletingItem) return;

    if (deletingItem.type === "project") {
      handleDeleteProject(deletingItem.item as Project);
    } else {
      handleDeleteTask(deletingItem.item as Task);
    }
  };

  const selectedProjectData = projects?.find((p) => p.id === selectedProject);

  useEffect(() => {
    if (user) {
      setCurrentUser(user?.data?.user);
    }
    const fetchUsers = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const users = await getStaffs(token, {
          searchQuery: "",
          status: "All",
          page: 1,
          limit: 100,
        });
        console.log("Fetched Users:", users.data.users);
        setUsers(users?.data?.users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, [user]);

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;
      try {
        const data = await getProjects(token, {
          searchQuery: "",
          status: "All",
          page: 1,
          limit: 100,
        });
        console.log("Fetched Projects:", data);
        setProjects(data || []);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();

    // setProjects(projects?.data?.projects || []);
  }, []);

  const fetchTasks = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    try {
      const data = await getTasks(token, {
        projectId: selectedProject,
        status: "All",
        page: 1,
        limit: 100,
      });
      console.log("Fetched Tasks:", data);
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, [selectedProject]);

  useEffect(() => {
    console.log("Tasks:", tasks);
    console.log("FilteredTasks:", filteredTasks);
  }, [tasks, filteredTasks]);

  return (
    <MainLayout>
      <div className="min-h-screen bg-white">
        <div className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  Project Management
                </h1>
                {/* <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">
                  {currentUser?.role?.charAt(0).toUpperCase() +
                    currentUser?.role?.slice(1)}
                </span> */}
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex border border-gray-300 rounded-md">
                  <Button
                    variant={viewMode === "board" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("board")}
                    className="rounded-r-none"
                  >
                    <Layout className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                {canCreateProject && (
                  <Button
                    onClick={() => setShowCreateProject(true)}
                    className="bg-black text-white hover:bg-gray-800"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Project
                  </Button>
                )}

                {canCreateTask && selectedProject && (
                  <Button
                    onClick={() => setShowCreateTask(true)}
                    variant="outline"
                    className="border-black text-black hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Task
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {projects && (
              <div className="lg:w-64 flex-shrink-0">
                <ProjectList
                  projects={projects}
                  selectedProject={selectedProject}
                  onSelectProject={setSelectedProject}
                  userRole={currentUser?.role}
                  onEditProject={setEditingProject}
                  onDeleteProject={(project) =>
                    setDeletingItem({ type: "project", item: project })
                  }
                />
              </div>
            )}

            <div className="flex-1">
              {selectedProjectData ? (
                <>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      {selectedProjectData.name}
                    </h2>
                    <p className="text-gray-600">
                      {selectedProjectData.description}
                    </p>
                  </div>

                  <FilterBar
                    filters={filters}
                    onFiltersChange={setFilters}
                    users={users}
                    tasks={filteredTasks}
                  />

                  <DndContext
                    sensors={sensors}
                    onDragStart={handleDragStart}
                    onDragMove={handleDragMove}
                    onDragEnd={handleDragEnd}
                    onDragCancel={() => {
                      setActiveId(null);
                      setDragging(false);
                    }}
                    collisionDetection={closestCorners}
                  >
                    <KanbanBoard
                      tasks={filteredTasks}
                      dragging={dragging}
                      users={users}
                      onEditTask={setEditingTask}
                      onDeleteTask={(task) =>
                        setDeletingItem({ type: "task", item: task })
                      }
                      activeId={activeId}
                      userRole={currentUser?.role}
                      currentUserId={currentUser?.id}
                    />
                  </DndContext>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="max-w-md mx-auto">
                    <Layout className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {projects ? 'Select a Project' : 'Create a new Project'}
                    </h3>
                    <p className="text-gray-500 mb-6">
                     {projects ? ' Choose a project from the sidebar to view and manage its tasks' : 'Click on New Project on top right to create one.'}
                    </p>
                    {canCreateProject && (
                      <Button
                        onClick={() => setShowCreateProject(true)}
                        className="bg-black text-white hover:bg-gray-800"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Your First Project
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <CreateProjectModal
          open={showCreateProject}
          onClose={() => setShowCreateProject(false)}
          onSubmit={handleCreateProject}
          users={users}
        />

        {users && (
          <CreateTaskModal
            open={showCreateTask}
            onClose={() => setShowCreateTask(false)}
            onSubmit={handleCreateTask}
            users={users}
            projectId={selectedProject}
          />
        )}

        {editingProject && (
          <EditProjectModal
            project={editingProject}
            open={!!editingProject}
            onClose={() => setEditingProject(null)}
            onSubmit={handleUpdateProject}
            users={users}
          />
        )}

        {editingTask && (
          <EditTaskModal
            task={editingTask}
            open={!!editingTask}
            onClose={() => setEditingTask(null)}
            onSubmit={(updates) => handleUpdateTask(editingTask.id, updates)}
            users={users}
          />
        )}

        {deletingItem && (
          <DeleteConfirmModal
            open={true}
            onClose={() => setDeletingItem(null)}
            onConfirm={handleConfirmDelete}
            title={
              deletingItem.type === "project" ? "Delete Project" : "Delete Task"
            }
            description={
              deletingItem.type === "project"
                ? "Are you sure you want to delete this project? All associated tasks will also be deleted."
                : "Are you sure you want to delete this task?"
            }
            itemName={
              deletingItem.type === "project"
                ? (deletingItem.item as Project).name
                : (deletingItem.item as Task).title
            }
          />
        )}
        <Toaster position="top-right" />
      </div>
    </MainLayout>
  );
}
