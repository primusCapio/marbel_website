import { BillingSystem } from '@/components/dashboard/billing-system';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard } from 'lucide-react';

export const metadata = {
    title: 'Billing System',
    description: 'Generate and manage invoices for orders.'
}

export default function BillingPage() {
    return (
       <div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-headline mb-8 flex items-center gap-3">
                <CreditCard className="h-8 w-8" />
                Billing System
            </h1>
            <Card>
                <CardHeader>
                    <CardTitle>Invoice Management</CardTitle>
                    <CardDescription>
                        Create, view, and manage invoices for your clients.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <BillingSystem />
                </CardContent>
            </Card>
       </div>
    )
}
