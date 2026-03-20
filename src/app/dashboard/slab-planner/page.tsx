import { FeaturePlaceholder } from "@/components/dashboard/placeholder";
import { Square } from "lucide-react";

export const metadata = {
    title: 'Slab Layout Planner',
    description: 'Visualize and optimize slab layouts to minimize wastage.'
}

export default function SlabPlannerPage() {
    return (
       <FeaturePlaceholder 
            title="Slab Layout Planner"
            description="An interactive tool to plan your slab layouts. Input room dimensions and slab sizes to get an optimized visual layout that minimizes material wastage, saving you time and money."
            icon={Square}
       />
    )
}
