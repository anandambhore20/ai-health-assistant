import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProjects, Project, ProjectType } from '@/contexts/ProjectContext';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Plus, 
  Calendar, 
  Users, 
  Activity, 
  Clock,
  Target,
  Stethoscope,
  Wrench,
  FlaskConical,
  Shield,
  FolderOpen,
  Eye,
  Edit,
  Trash2,
  PlayCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

const projectTypeConfig = {
  'patient-care': { 
    icon: Stethoscope, 
    color: 'bg-blue-50 border-blue-200 text-blue-800',
    label: 'Patient Care' 
  },
  'equipment': { 
    icon: Wrench, 
    color: 'bg-orange-50 border-orange-200 text-orange-800',
    label: 'Equipment' 
  },
  'research': { 
    icon: FlaskConical, 
    color: 'bg-purple-50 border-purple-200 text-purple-800',
    label: 'Research' 
  },
  'compliance': { 
    icon: Shield, 
    color: 'bg-green-50 border-green-200 text-green-800',
    label: 'Compliance' 
  },
  'general': { 
    icon: FolderOpen, 
    color: 'bg-gray-50 border-gray-200 text-gray-800',
    label: 'General' 
  }
};

const statusColors = {
  planning: 'bg-yellow-100 text-yellow-800',
  active: 'bg-green-100 text-green-800',
  'on-hold': 'bg-orange-100 text-orange-800',
  completed: 'bg-blue-100 text-blue-800'
};

const ProjectManagement = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { 
    projects, 
    createProject, 
    updateProject, 
    deleteProject,
    getProjectTasks 
  } = useProjects();
  
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    type: 'general' as ProjectType,
    dueDate: '',
    department: '',
    facilityId: ''
  });

  const handleCreateProject = () => {
    if (!newProject.name.trim()) return;

    createProject({
      name: newProject.name,
      description: newProject.description,
      type: newProject.type,
      status: 'planning',
      teamMembers: user ? [user.id] : [],
      dueDate: newProject.dueDate || undefined,
      sprints: [],
      medicalContext: {
        department: newProject.department || undefined,
        facilityId: newProject.facilityId || undefined
      }
    });

    // Reset form
    setNewProject({
      name: '',
      description: '',
      type: 'general',
      dueDate: '',
      department: '',
      facilityId: ''
    });
    setIsCreateProjectOpen(false);
  };

  const handleUpdateProject = () => {
    if (!editingProject) return;
    updateProject(editingProject.id, editingProject);
    setEditingProject(null);
  };

  const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    const typeConfig = projectTypeConfig[project.type];
    const Icon = typeConfig.icon;
    const tasks = getProjectTasks(project.id);
    const completedTasks = tasks.filter(t => t.status === 'done').length;
    const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

    return (
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <div className={cn("p-2 rounded-lg", typeConfig.color)}>
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <Badge className={cn("text-xs mt-1", statusColors[project.status])}>
                  {project.status}
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/projects/${project.id}`)}
                className="h-8 w-8 p-0"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditingProject(project)}
                className="h-8 w-8 p-0"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteProject(project.id)}
                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {project.description}
          </p>

          {project.medicalContext && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <div className="text-xs text-blue-700">
                {project.medicalContext.department && (
                  <div>Department: {project.medicalContext.department}</div>
                )}
                {project.medicalContext.facilityId && (
                  <div>Facility: {project.medicalContext.facilityId}</div>
                )}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary to-primary-foreground h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Target className="h-4 w-4" />
                <span>{tasks.length} tasks</span>
              </div>
              {project.dueDate && (
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(project.dueDate).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div className="flex -space-x-2">
                {project.teamMembers.slice(0, 3).map((_, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-white flex items-center justify-center text-xs text-white"
                  >
                    {index + 1}
                  </div>
                ))}
                {project.teamMembers.length > 3 && (
                  <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs">
                    +{project.teamMembers.length - 3}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const ProjectStats = () => {
    const activeProjects = projects.filter(p => p.status === 'active').length;
    const completedProjects = projects.filter(p => p.status === 'completed').length;
    const totalTasks = projects.reduce((sum, project) => sum + getProjectTasks(project.id).length, 0);

    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FolderOpen className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Projects</p>
                <p className="text-2xl font-bold">{projects.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Activity className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Projects</p>
                <p className="text-2xl font-bold">{activeProjects}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Tasks</p>
                <p className="text-2xl font-bold">{totalTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedProjects}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Project Management</h1>
          <p className="text-muted-foreground">
            Manage medical projects, patient cases, and facility operations
          </p>
        </div>
        <Button onClick={() => setIsCreateProjectOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      <ProjectStats />

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="patient-care">Patient Care</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>

        {Object.entries(projectTypeConfig).map(([type, config]) => (
          <TabsContent key={type} value={type}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .filter(project => project.type === type)
                .map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Create Project Dialog */}
      <Dialog open={isCreateProjectOpen} onOpenChange={setIsCreateProjectOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Project name"
              value={newProject.name}
              onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
            />
            <Textarea
              placeholder="Project description"
              value={newProject.description}
              onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
            />
            <div className="grid grid-cols-2 gap-4">
              <Select 
                value={newProject.type} 
                onValueChange={(value) => setNewProject(prev => ({ ...prev, type: value as ProjectType }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Project type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(projectTypeConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                type="date"
                value={newProject.dueDate}
                onChange={(e) => setNewProject(prev => ({ ...prev, dueDate: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Department (optional)"
                value={newProject.department}
                onChange={(e) => setNewProject(prev => ({ ...prev, department: e.target.value }))}
              />
              <Input
                placeholder="Facility ID (optional)"
                value={newProject.facilityId}
                onChange={(e) => setNewProject(prev => ({ ...prev, facilityId: e.target.value }))}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreateProjectOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateProject}>
                Create Project
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Project Dialog */}
      <Dialog open={!!editingProject} onOpenChange={() => setEditingProject(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          {editingProject && (
            <div className="space-y-4">
              <Input
                value={editingProject.name}
                onChange={(e) => setEditingProject(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
              />
              <Textarea
                value={editingProject.description}
                onChange={(e) => setEditingProject(prev => prev ? ({ ...prev, description: e.target.value }) : null)}
              />
              <Select 
                value={editingProject.status} 
                onValueChange={(value) => setEditingProject(prev => prev ? ({ ...prev, status: value as any }) : null)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planning">Planning</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setEditingProject(null)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateProject}>
                  Update Project
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectManagement;