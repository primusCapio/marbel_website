import { FeaturePlaceholder } from "@/components/dashboard/placeholder";
import { DollarSign } from "lucide-react";

export const metadata = {
    title: 'Cost Breakdown Analyzer',
    description: 'Get a detailed breakdown of project costs.'
}

export default function CostAnalyzerPage() {
    return (
       <FeaturePlaceholder 
            title="Cost Breakdown Analyzer"
            description="Get a clear picture of your project expenses. This tool will provide a detailed breakdown of costs, including materials, transport, and estimated installation, helping you manage budgets effectively."
            icon={DollarSign}
       />
    )
}
