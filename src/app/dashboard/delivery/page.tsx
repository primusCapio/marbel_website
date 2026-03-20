import { FeaturePlaceholder } from "@/components/dashboard/placeholder";
import { CalendarClock } from "lucide-react";

export const metadata = {
    title: 'Delivery Scheduling',
    description: 'Schedule and track your material deliveries.'
}

export default function DeliveryPage() {
    return (
       <FeaturePlaceholder 
            title="Delivery Scheduling"
            description="Manage your project timelines with ease. This feature will allow you to select preferred delivery dates for your orders and track their status from our warehouse to your site."
            icon={CalendarClock}
       />
    )
}
