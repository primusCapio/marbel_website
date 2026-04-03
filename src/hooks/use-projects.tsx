'use client';

import type { Project, ProjectStatus } from '@/lib/types';
import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useToast } from './use-toast';

interface ProjectsContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id' | 'createdAt' | 'status'>) => void;
  updateProjectStatus: (projectId: string, status: ProjectStatus) => void;
  getProjectById: (projectId: string) => Project | undefined;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export function ProjectsProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedProjects = localStorage.getItem('projects');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  const addProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'status'>) => {
    const newProject: Project = {
      ...projectData,
      id: `proj_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Draft',
    };

    setProjects(prevProjects => [newProject, ...prevProjects]);
    
    toast({
      title: "Project Created!",
      description: `"${projectData.projectName}" has been added to your workspace.`,
    });
  };

  const updateProjectStatus = (projectId: string, status: ProjectStatus) => {
    setProjects(prevProjects =>
      prevProjects.map(p =>
        p.id === projectId ? { ...p, status } : p
      )
    );
    toast({
        title: "Project Status Updated",
    });
  };

  const getProjectById = useCallback((projectId: string) => {
      return projects.find(p => p.id === projectId);
  }, [projects]);


  const value = { projects, addProject, updateProjectStatus, getProjectById };

  return <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>;
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
}
