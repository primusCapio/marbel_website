import { FeaturePlaceholder } from "@/components/dashboard/placeholder";
import { FileText } from "lucide-react";

export const metadata = {
    title: 'BOQ Generator',
    description: 'Automatically generate a Bill of Quantities for your projects.'
}

export default function BoqGeneratorPage() {
    return (
       <FeaturePlaceholder 
            title="BOQ Generator"
            description="Automatically calculate material quantities and costs for your projects. This tool will help you generate a detailed Bill of Quantities (BOQ) that can be exported to PDF for easy sharing and documentation."
            icon={FileText}
       />
    )
}
