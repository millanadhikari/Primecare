"use client";

import { useMemo } from "react";
import { useDroppable, DragOverlay } from "@dnd-kit/core";

import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { TaskCard } from "./TaskCard";

import { Task, User, TaskStatus, UserRole } from "@/types";

interface KanbanColumnProps {
  id: TaskStatus;
  title: string;
  tasks: Task[];
  users: User[];
  onEditTask: (task: Task) => void;
  onDeleteTask?: (task: Task) => void;
  userRole: UserRole;
  currentUserId: string;
}

function KanbanColumn({
  id,
  title,
  tasks,
  users,
  onEditTask,
  onDeleteTask,
  userRole,
  currentUserId,
}: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="flex-1 min-w-80">
      {/* {tasks.map((task) => (
        <div id={task.id}>{task.title} </div>
      ))} */}
      <div className="bg-gray-50 rounded-lg border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 flex items-center justify-between">
            {title}
            <span className="text-sm font-normal text-gray-500 bg-white px-2 py-1 rounded">
              {tasks.length}
            </span>
          </h3>
        </div>

        <div ref={setNodeRef} className="p-4 min-h-96">
          <SortableContext
            items={tasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  users={users}
                  onEdit={() => onEditTask(task)}
                  onDelete={() => onDeleteTask?.(task)}
                  userRole={userRole}
                  currentUserId={currentUserId}
                />
              ))}
            </div>
          </SortableContext>
        </div>
      </div>
    </div>
  );
}

interface KanbanBoardProps {
  tasks: Task[];
  users: User[];
  onEditTask: (task: Task) => void;
  onDeleteTask?: (task: Task) => void;
  activeId: string | null;
  userRole: UserRole;
  currentUserId: string;
  dragging?: boolean;
}

export function KanbanBoard({
  tasks,
  users,
  onEditTask,
  onDeleteTask,
  activeId,
  userRole,
  currentUserId,
  dragging,
}: KanbanBoardProps) {
  const columns = useMemo(
    () => [
      { id: "TODO" as TaskStatus, title: "To Do" },
      { id: "IN_PROGRESS" as TaskStatus, title: "In Progress" },
      { id: "REVIEW" as TaskStatus, title: "Review" },
      { id: "DONE" as TaskStatus, title: "Done" },
    ],
    []
  );
  const activeTask = activeId
    ? tasks.find((task) => task.id === activeId)
    : null;

  const tasksByStatus = useMemo(() => {
    return columns.reduce((acc, column) => {
      acc[column.id] = tasks.filter((task) => task.status === column.id);
      return acc;
    }, {} as Record<TaskStatus, Task[]>);
  }, [tasks, columns]);

  return (
    <div className="flex gap-6 overflow-x-auto pb-4">
      {/* {tasks.map((task) => (
        <div id={task.id}>{task.id} </div>
      ))} */}
      {columns.map((column) => (
        <KanbanColumn
          key={column.id}
          id={column.id}
          title={column.title}
          tasks={tasksByStatus[column.id]}
          users={users}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
          userRole={userRole}
          currentUserId={currentUserId}
        />
      ))}
      <DragOverlay>
        {dragging && activeTask ? (
          <TaskCard
            task={activeTask}
            users={users}
            onEdit={() => onEditTask(activeTask)}
            onDelete={() => onDeleteTask?.(activeTask)}
            userRole={userRole}
            currentUserId={currentUserId}
          />
        ) : null}
      </DragOverlay>
    </div>
  );
}
