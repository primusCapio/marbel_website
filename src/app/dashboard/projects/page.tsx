import { FeaturePlaceholder } from "@/components/dashboard/placeholder";
import { Briefcase } from "lucide-react";

export const metadata = {
    title: 'Multi-Project Workspace',
    description: 'Create and manage multiple projects, saving selected materials for each one.'
}

export default function ProjectsPage() {
    return (
       <FeaturePlaceholder 
            title="Multi-Project Workspace"
            description="A dedicated space to create and manage multiple projects. You'll be able to save selected materials, track progress, and organize everything for different clients or sites."
            icon={Briefcase}
       />
    )
}
