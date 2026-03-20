import { FeaturePlaceholder } from "@/components/dashboard/placeholder";
import { FileOutput } from "lucide-react";

export const metadata = {
    title: 'Export Design Package',
    description: 'Export project materials and details into a single PDF package.'
}

export default function ExportPackagePage() {
    return (
       <FeaturePlaceholder 
            title="Export Design Package"
            description="Compile all your project information into a professional document. This tool will allow you to export selected materials, technical details, and layout plans into a single, shareable PDF package for clients or contractors."
            icon={FileOutput}
       />
    )
}
