import { FeaturePlaceholder } from "@/components/dashboard/placeholder";
import { Package } from "lucide-react";

export const metadata = {
    title: 'Live Stock Reservation',
    description: 'Reserve specific slabs for your projects in real-time.'
}

export default function StockReservationPage() {
    return (
       <FeaturePlaceholder 
            title="Live Stock Reservation"
            description="Secure the perfect materials for your project. This tool will allow you to view our live inventory and reserve specific slabs or batches for a limited time, ensuring they are available when you need them."
            icon={Package}
       />
    )
}
