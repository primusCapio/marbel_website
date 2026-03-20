import { FeaturePlaceholder } from "@/components/dashboard/placeholder";
import { FileText } from "lucide-react";

export const metadata = {
    title: 'Technical Specifications',
    description: 'Access detailed technical data for all our materials.'
}

export default function SpecsPage() {
    return (
       <FeaturePlaceholder 
            title="Technical Specifications"
            description="Find all the data you need in one place. This section will provide detailed technical specifications for all our stones, including thickness, finishes, durability ratings, and recommended usage."
            icon={FileText}
       />
    )
}
