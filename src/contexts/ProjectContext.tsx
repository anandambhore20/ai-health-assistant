import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

export type TaskStatus = 'backlog' | 'todo' | 'in-progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';
export type ProjectType = 'patient-care' | 'equipment' | 'research' | 'compliance' | 'general';
export type SprintStatus = 'planned' | 'active' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: string;
  assigneeName?: string;
  projectId: string;
  sprintId?: string;
  createdAt: string;
  dueDate?: string;
  estimatedHours?: number;
  actualHours?: number;
  labels: string[];
  medicalData?: {
    patientId?: string;
    patientName?: string;
    departmentId?: string;
    equipmentId?: string;
  };
}

export interface Sprint {
  id: string;
  name: string;
  goal: string;
  projectId: string;
  status: SprintStatus;
  startDate: string;
  endDate: string;
  capacity: number;
  tasks: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  type: ProjectType;
  status: 'planning' | 'active' | 'on-hold' | 'completed';
  ownerId: string;
  ownerName: string;
  teamMembers: string[];
  createdAt: string;
  dueDate?: string;
  sprints: string[];
  medicalContext?: {
    department?: string;
    facilityId?: string;
    patientCaseId?: string;
  };
}

export interface ProjectComment {
  id: string;
  taskId: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

interface ProjectContextType {
  projects: Project[];
  tasks: Task[];
  sprints: Sprint[];
  comments: ProjectComment[];
  
  // Projects
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'ownerId' | 'ownerName'>) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  // Tasks
  createTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, newStatus: TaskStatus, sprintId?: string) => void;
  
  // Sprints
  createSprint: (sprint: Omit<Sprint, 'id' | 'tasks'>) => void;
  updateSprint: (id: string, updates: Partial<Sprint>) => void;
  deleteSprint: (id: string) => void;
  startSprint: (id: string) => void;
  completeSprint: (id: string) => void;
  
  // Comments
  addComment: (comment: Omit<ProjectComment, 'id' | 'createdAt' | 'userId' | 'userName'>) => void;
  
  // Utilities
  getProjectTasks: (projectId: string) => Task[];
  getSprintTasks: (sprintId: string) => Task[];
  getTasksByAssignee: (assigneeId: string) => Task[];
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [comments, setComments] = useState<ProjectComment[]>([]);

  // Initialize with sample data on first load
  useEffect(() => {
    if (user && projects.length === 0) {
      const sampleProjects: Project[] = [
        {
          id: '1',
          name: 'Emergency Department Workflow',
          description: 'Optimize patient flow and reduce wait times in emergency department',
          type: 'patient-care',
          status: 'active',
          ownerId: user.id,
          ownerName: user.name,
          teamMembers: [user.id],
          createdAt: new Date().toISOString(),
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          sprints: ['sprint-1'],
          medicalContext: {
            department: 'Emergency',
            facilityId: 'facility-1'
          }
        },
        {
          id: '2',
          name: 'MRI Equipment Maintenance',
          description: 'Regular maintenance and calibration schedule for MRI machines',
          type: 'equipment',
          status: 'planning',
          ownerId: user.id,
          ownerName: user.name,
          teamMembers: [user.id],
          createdAt: new Date().toISOString(),
          dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
          sprints: ['sprint-2'],
        }
      ];

      const sampleSprints: Sprint[] = [
        {
          id: 'sprint-1',
          name: 'Sprint 1 - Triage Process',
          goal: 'Implement new triage system to reduce patient wait times',
          projectId: '1',
          status: 'active',
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          capacity: 80,
          tasks: ['task-1', 'task-2']
        },
        {
          id: 'sprint-2',
          name: 'Sprint 1 - Equipment Audit',
          goal: 'Complete comprehensive audit of all MRI equipment',
          projectId: '2',
          status: 'planned',
          startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
          capacity: 60,
          tasks: ['task-3']
        }
      ];

      const sampleTasks: Task[] = [
        {
          id: 'task-1',
          title: 'Analyze Current Triage Process',
          description: 'Document current patient flow and identify bottlenecks',
          status: 'in-progress',
          priority: 'high',
          assigneeId: user.id,
          assigneeName: user.name,
          projectId: '1',
          sprintId: 'sprint-1',
          createdAt: new Date().toISOString(),
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          estimatedHours: 16,
          actualHours: 8,
          labels: ['research', 'analysis'],
          medicalData: {
            departmentId: 'emergency'
          }
        },
        {
          id: 'task-2',
          title: 'Design New Triage Form',
          description: 'Create standardized triage assessment form',
          status: 'todo',
          priority: 'medium',
          assigneeId: user.id,
          assigneeName: user.name,
          projectId: '1',
          sprintId: 'sprint-1',
          createdAt: new Date().toISOString(),
          dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
          estimatedHours: 12,
          labels: ['design', 'forms'],
          medicalData: {
            departmentId: 'emergency'
          }
        },
        {
          id: 'task-3',
          title: 'MRI Machine Safety Check',
          description: 'Perform comprehensive safety inspection of MRI Unit A',
          status: 'todo',
          priority: 'critical',
          assigneeId: user.id,
          assigneeName: user.name,
          projectId: '2',
          sprintId: 'sprint-2',
          createdAt: new Date().toISOString(),
          dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          estimatedHours: 24,
          labels: ['maintenance', 'safety'],
          medicalData: {
            equipmentId: 'mri-a'
          }
        }
      ];

      setProjects(sampleProjects);
      setSprints(sampleSprints);
      setTasks(sampleTasks);
    }
  }, [user]);

  // Project management
  const createProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'ownerId' | 'ownerName'>) => {
    if (!user) return;
    
    const newProject: Project = {
      ...projectData,
      id: `project-${Date.now()}`,
      ownerId: user.id,
      ownerName: user.name,
      createdAt: new Date().toISOString(),
      sprints: []
    };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
    setTasks(prev => prev.filter(t => t.projectId !== id));
    setSprints(prev => prev.filter(s => s.projectId !== id));
  };

  // Task management
  const createTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    setComments(prev => prev.filter(c => c.taskId !== id));
  };

  const moveTask = (taskId: string, newStatus: TaskStatus, sprintId?: string) => {
    setTasks(prev => prev.map(t => 
      t.id === taskId ? { ...t, status: newStatus, sprintId } : t
    ));
  };

  // Sprint management
  const createSprint = (sprintData: Omit<Sprint, 'id' | 'tasks'>) => {
    const newSprint: Sprint = {
      ...sprintData,
      id: `sprint-${Date.now()}`,
      tasks: []
    };
    setSprints(prev => [...prev, newSprint]);
    
    // Update project to include this sprint
    setProjects(prev => prev.map(p => 
      p.id === sprintData.projectId ? { ...p, sprints: [...p.sprints, newSprint.id] } : p
    ));
  };

  const updateSprint = (id: string, updates: Partial<Sprint>) => {
    setSprints(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const deleteSprint = (id: string) => {
    setSprints(prev => prev.filter(s => s.id !== id));
    setTasks(prev => prev.map(t => t.sprintId === id ? { ...t, sprintId: undefined } : t));
  };

  const startSprint = (id: string) => {
    setSprints(prev => prev.map(s => 
      s.id === id ? { ...s, status: 'active' as SprintStatus } : s
    ));
  };

  const completeSprint = (id: string) => {
    setSprints(prev => prev.map(s => 
      s.id === id ? { ...s, status: 'completed' as SprintStatus } : s
    ));
  };

  // Comments
  const addComment = (commentData: Omit<ProjectComment, 'id' | 'createdAt' | 'userId' | 'userName'>) => {
    if (!user) return;
    
    const newComment: ProjectComment = {
      ...commentData,
      id: `comment-${Date.now()}`,
      userId: user.id,
      userName: user.name,
      createdAt: new Date().toISOString()
    };
    setComments(prev => [...prev, newComment]);
  };

  // Utilities
  const getProjectTasks = (projectId: string) => {
    return tasks.filter(t => t.projectId === projectId);
  };

  const getSprintTasks = (sprintId: string) => {
    return tasks.filter(t => t.sprintId === sprintId);
  };

  const getTasksByAssignee = (assigneeId: string) => {
    return tasks.filter(t => t.assigneeId === assigneeId);
  };

  const value: ProjectContextType = {
    projects,
    tasks,
    sprints,
    comments,
    createProject,
    updateProject,
    deleteProject,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    createSprint,
    updateSprint,
    deleteSprint,
    startSprint,
    completeSprint,
    addComment,
    getProjectTasks,
    getSprintTasks,
    getTasksByAssignee
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};