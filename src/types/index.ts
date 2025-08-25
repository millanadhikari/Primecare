export type UserRole = "ADMIN" | "COORDINATOR" | "STAFF";
export type TaskStatus = 'TODO' | 'IN-PROGRESS' | 'REVIEW' | 'DONE'
export type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: UserRole
}

export interface Project {
  id: string
  name: string
  description: string
  assignedUsers: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Task {
  id: string
  title: string
  description?: string
  clientName: string
  assignedUserId: string
  projectId: string
  status: TaskStatus
  priority: TaskPriority
  dueDate?: Date
  createdAt: Date
  updatedAt: Date
  comments?: TaskComment[]
}

export interface TaskComment {
  id: string
  taskId: string
  userId: string
  content: string
  createdAt: Date
}