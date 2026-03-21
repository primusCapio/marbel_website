import { Briefcase } from "lucide-react";

export const metadata = {
    title: 'Multi-Project Workspace',
    description: 'Create and manage multiple projects, saving selected materials for each one.'
}

export default function ProjectsPage() {
    return (
       <div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-headline mb-8 flex items-center gap-3">
                <Briefcase className="h-8 w-8" />
                Multi-Project Workspace
            </h1>
             <p className="text-muted-foreground text-lg">
                This will be your dedicated space to create and manage multiple projects. You'll be able to save selected materials, track progress, and organize everything for different clients or sites.
             </p>
             <p className="text-muted-foreground mt-4">
                This feature requires a database connection and is currently under development. Check back later for updates.
             </p>
       </div>
    )
}
