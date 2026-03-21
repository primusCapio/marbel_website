import { SlabPlanner } from '@/components/dashboard/slab-planner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Square } from 'lucide-react';

export const metadata = {
    title: 'Slab Layout Planner',
    description: 'Visualize and optimize slab layouts to minimize wastage.'
}

export default function SlabPlannerPage() {
    return (
        <div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-headline mb-8 flex items-center gap-3">
                <Square className="h-8 w-8" />
                Slab Layout Planner
            </h1>
            <Card>
                <CardHeader>
                    <CardTitle>Optimize Your Slab Usage</CardTitle>
                    <CardDescription>
                        Enter your room and slab dimensions to get a basic wastage calculation. Visual layout generation is coming soon.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <SlabPlanner />
                </CardContent>
            </Card>
        </div>
    )
}
