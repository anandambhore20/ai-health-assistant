import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProjects, Task, TaskStatus, TaskPriority } from '@/contexts/ProjectContext';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Plus, 
  Clock, 
  User, 
  Calendar,
  AlertCircle,
  Activity,
  CheckCircle2,
  Eye,
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface KanbanBoardProps {
  projectId: string;
  sprintId?: string;
}

const statusConfig = {
  backlog: { 
    title: 'Backlog', 
    icon: Clock, 
    color: 'bg-muted',
    textColor: 'text-muted-foreground'
  },
  todo: { 
    title: 'To Do', 
    icon: AlertCircle, 
    color: 'bg-blue-50 border-blue-200',
    textColor: 'text-blue-700'
  },
  'in-progress': { 
    title: 'In Progress', 
    icon: Activity, 
    color: 'bg-orange-50 border-orange-200',
    textColor: 'text-orange-700'
  },
  review: { 
    title: 'Review', 
    icon: Eye, 
    color: 'bg-purple-50 border-purple-200',
    textColor: 'text-purple-700'
  },
  done: { 
    title: 'Done', 
    icon: CheckCircle2, 
    color: 'bg-green-50 border-green-200',
    textColor: 'text-green-700'
  }
};

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800'
};

const KanbanBoard: React.FC<KanbanBoardProps> = ({ projectId, sprintId }) => {
  const { user } = useAuth();
  const { 
    tasks, 
    moveTask, 
    createTask, 
    updateTask, 
    deleteTask,
    getProjectTasks,
    getSprintTasks 
  } = useProjects();
  
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>('todo');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as TaskPriority,
    estimatedHours: '',
    dueDate: '',
    labels: ''
  });

  // Get tasks based on context (project or sprint)
  const relevantTasks = sprintId ? getSprintTasks(sprintId) : getProjectTasks(projectId);
  
  const getTasksByStatus = (status: TaskStatus) => {
    return relevantTasks.filter(task => task.status === status);
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    moveTask(taskId, status, sprintId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleCreateTask = () => {
    if (!newTask.title.trim() || !user) return;

    const labelsArray = newTask.labels.split(',').map(label => label.trim()).filter(Boolean);
    
    createTask({
      title: newTask.title,
      description: newTask.description,
      status: selectedStatus,
      priority: newTask.priority,
      assigneeId: user.id,
      assigneeName: user.name,
      projectId,
      sprintId,
      estimatedHours: newTask.estimatedHours ? parseInt(newTask.estimatedHours) : undefined,
      dueDate: newTask.dueDate || undefined,
      labels: labelsArray
    });

    // Reset form
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      estimatedHours: '',
      dueDate: '',
      labels: ''
    });
    setIsCreateTaskOpen(false);
  };

  const handleUpdateTask = () => {
    if (!editingTask) return;

    updateTask(editingTask.id, editingTask);
    setEditingTask(null);
  };

  const TaskCard: React.FC<{ task: Task }> = ({ task }) => (
    <Card 
      className="mb-3 cursor-move hover:shadow-md transition-shadow border-l-4 border-l-primary"
      draggable
      onDragStart={(e) => handleDragStart(e, task.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h4 className="font-medium text-sm leading-tight">{task.title}</h4>
          <div className="flex items-center space-x-1 ml-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditingTask(task)}
              className="h-6 w-6 p-0"
            >
              <Edit className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => deleteTask(task.id)}
              className="h-6 w-6 p-0 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        {task.description && (
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
            {task.description}
          </p>
        )}

        <div className="flex flex-wrap gap-1 mb-3">
          <Badge variant="outline" className={cn("text-xs", priorityColors[task.priority])}>
            {task.priority}
          </Badge>
          {task.labels.map((label, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {label}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-2">
            {task.assigneeName && (
              <div className="flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span>{task.assigneeName}</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {task.estimatedHours && (
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{task.estimatedHours}h</span>
              </div>
            )}
            {task.dueDate && (
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>

        {task.medicalData && (
          <div className="mt-2 p-2 bg-blue-50 rounded-md">
            <div className="text-xs text-blue-700">
              {task.medicalData.patientName && (
                <div>Patient: {task.medicalData.patientName}</div>
              )}
              {task.medicalData.departmentId && (
                <div>Department: {task.medicalData.departmentId}</div>
              )}
              {task.medicalData.equipmentId && (
                <div>Equipment: {task.medicalData.equipmentId}</div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="h-full">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 h-full">
        {Object.entries(statusConfig).map(([status, config]) => {
          const Icon = config.icon;
          const tasksInColumn = getTasksByStatus(status as TaskStatus);
          
          return (
            <div
              key={status}
              className="flex flex-col"
              onDrop={(e) => handleDrop(e, status as TaskStatus)}
              onDragOver={handleDragOver}
            >
              <Card className={cn("flex-1 min-h-96", config.color)}>
                <CardHeader className="pb-3">
                  <CardTitle className={cn("text-sm flex items-center justify-between", config.textColor)}>
                    <div className="flex items-center space-x-2">
                      <Icon className="h-4 w-4" />
                      <span>{config.title}</span>
                      <Badge variant="secondary" className="text-xs">
                        {tasksInColumn.length}
                      </Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedStatus(status as TaskStatus);
                        setIsCreateTaskOpen(true);
                      }}
                      className="h-6 w-6 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {tasksInColumn.map(task => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Create Task Dialog */}
      <Dialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
            />
            <Textarea
              placeholder="Task description"
              value={newTask.description}
              onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
            />
            <div className="grid grid-cols-2 gap-4">
              <Select 
                value={newTask.priority} 
                onValueChange={(value) => setNewTask(prev => ({ ...prev, priority: value as TaskPriority }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Estimated hours"
                value={newTask.estimatedHours}
                onChange={(e) => setNewTask(prev => ({ ...prev, estimatedHours: e.target.value }))}
              />
            </div>
            <Input
              type="date"
              value={newTask.dueDate}
              onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
            />
            <Input
              placeholder="Labels (comma-separated)"
              value={newTask.labels}
              onChange={(e) => setNewTask(prev => ({ ...prev, labels: e.target.value }))}
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreateTaskOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTask}>
                Create Task
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Task Dialog */}
      <Dialog open={!!editingTask} onOpenChange={() => setEditingTask(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          {editingTask && (
            <div className="space-y-4">
              <Input
                value={editingTask.title}
                onChange={(e) => setEditingTask(prev => prev ? ({ ...prev, title: e.target.value }) : null)}
              />
              <Textarea
                value={editingTask.description}
                onChange={(e) => setEditingTask(prev => prev ? ({ ...prev, description: e.target.value }) : null)}
              />
              <div className="grid grid-cols-2 gap-4">
                <Select 
                  value={editingTask.priority} 
                  onValueChange={(value) => setEditingTask(prev => prev ? ({ ...prev, priority: value as TaskPriority }) : null)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="number"
                  value={editingTask.estimatedHours || ''}
                  onChange={(e) => setEditingTask(prev => prev ? ({ 
                    ...prev, 
                    estimatedHours: e.target.value ? parseInt(e.target.value) : undefined 
                  }) : null)}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditingTask(null)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateTask}>
                  Update Task
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KanbanBoard;