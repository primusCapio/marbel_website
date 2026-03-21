import { CostAnalyzer } from '@/components/dashboard/cost-analyzer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

export const metadata = {
    title: 'Cost Breakdown Analyzer',
    description: 'Get a detailed breakdown of project costs.'
}

export default function CostAnalyzerPage() {
    return (
        <div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-headline mb-8 flex items-center gap-3">
                <DollarSign className="h-8 w-8" />
                Cost Breakdown Analyzer
            </h1>
            <Card>
                <CardHeader>
                    <CardTitle>Project Cost Analyzer</CardTitle>
                    <CardDescription>
                        Enter your project costs to see a detailed breakdown and visualize your budget allocation.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <CostAnalyzer />
                </CardContent>
            </Card>
        </div>
    );
}
