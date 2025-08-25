import { Project, Task, User } from '@/types'

export const mockUsers: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'coordinator' },
  { id: '3', name: 'Mike Chen', email: 'mike@example.com', role: 'staff' },
  { id: '4', name: 'Lisa Rodriguez', email: 'lisa@example.com', role: 'staff' },
  { id: '5', name: 'David Wilson', email: 'david@example.com', role: 'coordinator' },
]

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Community Support Program',
    description: 'Providing comprehensive support services for individuals with disabilities in the community',
    assignedUserIds: ['1', '2', '3', '4'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Employment Assistance Initiative',
    description: 'Helping clients find and maintain employment opportunities',
    assignedUserIds: ['1', '2', '5'],
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '3',
    name: 'Housing Support Services',
    description: 'Assisting clients with housing applications and support',
    assignedUserIds: ['2', '3', '4'],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  }
]

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Initial assessment meeting',
    description: 'Conduct initial assessment and create support plan',
    clientName: 'John Smith',
    assignedUserId: '3',
    projectId: '1',
    status: 'todo',
    priority: 'high',
    dueDate: new Date('2024-12-30'),
    createdAt: new Date('2024-12-20'),
    updatedAt: new Date('2024-12-20')
  },
  {
    id: '2',
    title: 'Resume review and update',
    description: 'Review and update client resume for job applications',
    clientName: 'Mary Johnson',
    assignedUserId: '5',
    projectId: '2',
    status: 'in-progress',
    priority: 'medium',
    dueDate: new Date('2024-12-28'),
    createdAt: new Date('2024-12-18'),
    updatedAt: new Date('2024-12-22')
  },
  {
    id: '3',
    title: 'Housing application assistance',
    description: 'Help client complete housing application forms',
    clientName: 'Robert Brown',
    assignedUserId: '4',
    projectId: '3',
    status: 'review',
    priority: 'urgent',
    dueDate: new Date('2024-12-25'),
    createdAt: new Date('2024-12-15'),
    updatedAt: new Date('2024-12-23')
  },
  {
    id: '4',
    title: 'Monthly progress review',
    description: 'Review monthly progress and update support plan',
    clientName: 'Sarah Davis',
    assignedUserId: '3',
    projectId: '1',
    status: 'done',
    priority: 'low',
    dueDate: new Date('2024-12-20'),
    createdAt: new Date('2024-12-10'),
    updatedAt: new Date('2024-12-21')
  },
  {
    id: '5',
    title: 'Job interview preparation',
    description: 'Prepare client for upcoming job interviews',
    clientName: 'Michael Wilson',
    assignedUserId: '2',
    projectId: '2',
    status: 'in-progress',
    priority: 'high',
    dueDate: new Date('2024-12-27'),
    createdAt: new Date('2024-12-19'),
    updatedAt: new Date('2024-12-22')
  }
]