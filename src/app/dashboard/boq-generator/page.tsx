import { BoqGenerator } from '@/components/dashboard/boq-generator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export const metadata = {
    title: 'BOQ Generator',
    description: 'Automatically generate a Bill of Quantities for your projects.'
}

export default function BoqGeneratorPage() {
    return (
       <div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-headline mb-8 flex items-center gap-3">
                <FileText className="h-8 w-8" />
                BOQ Generator
            </h1>
            <Card>
                <CardHeader>
                    <CardTitle>Bill of Quantities Generator</CardTitle>
                    <CardDescription>
                        Select products and enter dimensions to calculate total quantities and costs for your project.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <BoqGenerator />
                </CardContent>
            </Card>
       </div>
    )
}
