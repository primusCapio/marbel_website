import { ClipboardList } from "lucide-react";
import { FeaturePlaceholder } from "@/components/dashboard/placeholder";

export const metadata = {
    title: 'Order Management',
    description: 'View and manage all customer orders and inquiries.'
}

export default function OrdersPage() {
    return (
       <FeaturePlaceholder 
        title="Order Management"
        description="This section will consolidate all incoming orders from the online store, bulk requests from professionals, and general inquiries from the contact form. You'll be able to view order details, update statuses (e.g., 'Processing', 'Shipped'), and manage the entire order fulfillment workflow from a single interface."
        icon={ClipboardList}
       />
    )
}
