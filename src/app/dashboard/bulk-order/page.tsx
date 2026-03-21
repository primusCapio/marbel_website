import { BulkOrderForm } from '@/components/forms/bulk-order-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PackageCheck } from 'lucide-react';

export const metadata = {
    title: 'Bulk Order Request',
    description: 'Request special pricing for large quantity orders.'
}

export default function BulkOrderPage() {
    return (
       <div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-headline mb-8 flex items-center gap-3">
                <PackageCheck className="h-8 w-8" />
                Bulk Order Request
            </h1>
             <Card>
                <CardHeader>
                    <CardTitle>Request a Quote</CardTitle>
                    <CardDescription>
                        Fill out the form below for special pricing on large quantity orders. Our team will get back to you within 24 hours.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <BulkOrderForm />
                </CardContent>
            </Card>
       </div>
    )
}
