import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProjects, Sprint, SprintStatus } from '@/contexts/ProjectContext';
import KanbanBoard from '@/components/project/KanbanBoard';
import { 
  ArrowLeft, 
  Plus, 
  Calendar, 
  Target, 
  Users,
  Clock,
  Activity,
  PlayCircle,
  PauseCircle,
  CheckCircle2,
  BarChart3,
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sprintStatusColors = {
  planned: 'bg-gray-100 text-gray-800',
  active: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800'
};

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    projects, 
    sprints, 
    getProjectTasks,
    createSprint,
    updateSprint,
    startSprint,
    completeSprint,
    addComment
  } = useProjects();
  
  const [activeTab, setActiveTab] = useState('board');
  const [isCreateSprintOpen, setIsCreateSprintOpen] = useState(false);
  const [newSprint, setNewSprint] = useState({
    name: '',
    goal: '',
    startDate: '',
    endDate: '',
    capacity: ''
  });

  const project = projects.find(p => p.id === id);
  const projectSprints = sprints.filter(s => s.projectId === id);
  const activeSprint = projectSprints.find(s => s.status === 'active');
  const projectTasks = getProjectTasks(id || '');

  if (!project) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
          <Button onClick={() => navigate('/projects')}>
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  const completedTasks = projectTasks.filter(t => t.status === 'done').length;
  const progress = projectTasks.length > 0 ? (completedTasks / projectTasks.length) * 100 : 0;

  const handleCreateSprint = () => {
    if (!newSprint.name.trim() || !id) return;

    createSprint({
      name: newSprint.name,
      goal: newSprint.goal,
      projectId: id,
      status: 'planned',
      startDate: newSprint.startDate,
      endDate: newSprint.endDate,
      capacity: parseInt(newSprint.capacity) || 40
    });

    setNewSprint({
      name: '',
      goal: '',
      startDate: '',
      endDate: '',
      capacity: ''
    });
    setIsCreateSprintOpen(false);
  };

  const SprintCard: React.FC<{ sprint: Sprint }> = ({ sprint }) => {
    const sprintTasks = projectTasks.filter(t => t.sprintId === sprint.id);
    const sprintProgress = sprintTasks.length > 0 
      ? (sprintTasks.filter(t => t.status === 'done').length / sprintTasks.length) * 100 
      : 0;
    const totalHours = sprintTasks.reduce((sum, task) => sum + (task.estimatedHours || 0), 0);

    return (
      <Card className="mb-4">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">{sprint.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{sprint.goal}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={cn("text-xs", sprintStatusColors[sprint.status])}>
                {sprint.status}
              </Badge>
              {sprint.status === 'planned' && (
                <Button size="sm" onClick={() => startSprint(sprint.id)}>
                  <PlayCircle className="h-4 w-4 mr-1" />
                  Start
                </Button>
              )}
              {sprint.status === 'active' && (
                <Button size="sm" onClick={() => completeSprint(sprint.id)}>
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  Complete
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <div>{new Date(sprint.startDate).toLocaleDateString()}</div>
                <div className="text-muted-foreground">Start Date</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <div>{new Date(sprint.endDate).toLocaleDateString()}</div>
                <div className="text-muted-foreground">End Date</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <div>{sprintTasks.length} tasks</div>
                <div className="text-muted-foreground">Total Tasks</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm">
                <div>{totalHours}h</div>
                <div className="text-muted-foreground">Estimated</div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Sprint Progress</span>
              <span className="font-medium">{Math.round(sprintProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all"
                style={{ width: `${sprintProgress}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const ProjectOverview = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Status</div>
              <Badge className={cn("text-sm", 
                project.status === 'active' ? 'bg-green-100 text-green-800' :
                project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                project.status === 'on-hold' ? 'bg-orange-100 text-orange-800' :
                'bg-gray-100 text-gray-800'
              )}>
                {project.status}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Due Date</div>
              <div className="text-sm font-medium">
                {project.dueDate ? new Date(project.dueDate).toLocaleDateString() : 'Not set'}
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Team Members</div>
              <div className="text-sm font-medium">{project.teamMembers.length} members</div>
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <div className="text-sm text-muted-foreground">Overall Progress</div>
            <div className="flex items-center justify-between text-sm">
              <span>{completedTasks} of {projectTasks.length} tasks completed</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-primary to-primary-foreground h-3 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {project.medicalContext && (
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Medical Context</h4>
              <div className="text-sm text-blue-700 space-y-1">
                {project.medicalContext.department && (
                  <div>Department: {project.medicalContext.department}</div>
                )}
                {project.medicalContext.facilityId && (
                  <div>Facility ID: {project.medicalContext.facilityId}</div>
                )}
                {project.medicalContext.patientCaseId && (
                  <div>Patient Case: {project.medicalContext.patientCaseId}</div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Sprints</CardTitle>
          <Button onClick={() => setIsCreateSprintOpen(true)} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            New Sprint
          </Button>
        </CardHeader>
        <CardContent>
          {projectSprints.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No sprints created yet. Create your first sprint to get started.
            </div>
          ) : (
            projectSprints.map(sprint => (
              <SprintCard key={sprint.id} sprint={sprint} />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/projects')}
          className="p-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <p className="text-muted-foreground">{project.description}</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="board">Task Board</TabsTrigger>
          {activeSprint && (
            <TabsTrigger value="sprint">
              Active Sprint: {activeSprint.name}
            </TabsTrigger>
          )}
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <ProjectOverview />
        </TabsContent>

        <TabsContent value="board">
          <Card>
            <CardHeader>
              <CardTitle>Project Task Board</CardTitle>
              <p className="text-sm text-muted-foreground">
                Manage all tasks across the project
              </p>
            </CardHeader>
            <CardContent>
              <KanbanBoard projectId={project.id} />
            </CardContent>
          </Card>
        </TabsContent>

        {activeSprint && (
          <TabsContent value="sprint">
            <Card>
              <CardHeader>
                <CardTitle>Sprint Board: {activeSprint.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {activeSprint.goal}
                </p>
              </CardHeader>
              <CardContent>
                <KanbanBoard projectId={project.id} sprintId={activeSprint.id} />
              </CardContent>
            </Card>
          </TabsContent>
        )}

        <TabsContent value="reports">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Task Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['backlog', 'todo', 'in-progress', 'review', 'done'].map(status => {
                    const statusTasks = projectTasks.filter(t => t.status === status);
                    const percentage = projectTasks.length > 0 ? (statusTasks.length / projectTasks.length) * 100 : 0;
                    
                    return (
                      <div key={status} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{status.replace('-', ' ')}</span>
                          <span>{statusTasks.length} tasks ({Math.round(percentage)}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sprint Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-gray-600">
                        {projectSprints.filter(s => s.status === 'planned').length}
                      </div>
                      <div className="text-xs text-muted-foreground">Planned</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {projectSprints.filter(s => s.status === 'active').length}
                      </div>
                      <div className="text-xs text-muted-foreground">Active</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {projectSprints.filter(s => s.status === 'completed').length}
                      </div>
                      <div className="text-xs text-muted-foreground">Completed</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Sprint Dialog */}
      <Dialog open={isCreateSprintOpen} onOpenChange={setIsCreateSprintOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Sprint</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Sprint name"
              value={newSprint.name}
              onChange={(e) => setNewSprint(prev => ({ ...prev, name: e.target.value }))}
            />
            <Textarea
              placeholder="Sprint goal"
              value={newSprint.goal}
              onChange={(e) => setNewSprint(prev => ({ ...prev, goal: e.target.value }))}
            />
            <div className="grid grid-cols-3 gap-4">
              <Input
                type="date"
                placeholder="Start date"
                value={newSprint.startDate}
                onChange={(e) => setNewSprint(prev => ({ ...prev, startDate: e.target.value }))}
              />
              <Input
                type="date"
                placeholder="End date"
                value={newSprint.endDate}
                onChange={(e) => setNewSprint(prev => ({ ...prev, endDate: e.target.value }))}
              />
              <Input
                type="number"
                placeholder="Capacity (hours)"
                value={newSprint.capacity}
                onChange={(e) => setNewSprint(prev => ({ ...prev, capacity: e.target.value }))}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreateSprintOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateSprint}>
                Create Sprint
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectDetails;