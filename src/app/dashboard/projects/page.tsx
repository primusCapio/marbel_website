'use client';

import { Briefcase, Download, FilePlus } from "lucide-react";
import { useProjects } from "@/hooks/use-projects";
import { CreateProjectDialog } from "@/components/dashboard/create-project-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProjectStatus } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { projectStatuses } from "@/lib/types";

const statusBadgeVariant: Record<ProjectStatus, 'default' | 'secondary' | 'outline' | 'success' | 'destructive'> = {
  'Draft': 'outline',
  'Quote Requested': 'secondary',
  'Quote Sent': 'default',
  'Confirmed': 'success',
  'Delivered': 'success',
  'Completed': 'outline',
};

export default function ProjectsPage() {
    const { projects, updateProjectStatus } = useProjects();
    const { toast } = useToast();

    const handleDownload = () => {
        toast({
            title: "Coming Soon!",
            description: "PDF export functionality is under development.",
        });
    }

    return (
       <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold font-headline flex items-center gap-3">
                    <Briefcase className="h-8 w-8" />
                    Multi-Project Workspace
                </h1>
                <CreateProjectDialog />
            </div>
            
            {projects.length === 0 ? (
                 <div className="text-center py-20 bg-secondary rounded-lg border-dashed border-2">
                    <FilePlus className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h2 className="mt-4 text-xl font-semibold">No Projects Yet</h2>
                    <p className="mt-2 text-sm text-muted-foreground">Get started by creating your first project.</p>
                    <div className="mt-6">
                        <CreateProjectDialog />
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <Card key={project.id} className="flex flex-col">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-xl">{project.projectName}</CardTitle>
                                     <Badge variant={statusBadgeVariant[project.status]}>
                                        {project.status}
                                    </Badge>
                                </div>
                                <CardDescription>Client: {project.clientName}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow space-y-3 text-sm">
                                <p><strong>Location:</strong> {project.siteLocation}</p>
                                <p><strong>Delivery City:</strong> {project.deliveryCity}</p>
                                <p><strong>Area:</strong> {project.areaRequired} sq.ft.</p>
                                {project.timeline && <p><strong>Timeline:</strong> {project.timeline}</p>}
                                <p className="text-xs text-muted-foreground pt-2">
                                    Created: {new Date(project.createdAt).toLocaleDateString()}
                                </p>
                            </CardContent>
                            <CardFooter className="justify-between">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline">Update Status</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>Set Status</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        {projectStatuses.map(status => (
                                             <DropdownMenuItem key={status} onClick={() => updateProjectStatus(project.id, status)}>
                                                {status}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                
                                <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="icon" onClick={handleDownload}>
                                            <Download className="h-5 w-5" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Download Project Summary (PDF)</p>
                                    </TooltipContent>
                                </Tooltip>
                                </TooltipProvider>

                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
       </div>
    )
}
