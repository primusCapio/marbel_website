import { CalendarClock } from "lucide-react";

export const metadata = {
    title: 'Delivery Scheduling',
    description: 'Schedule and track your material deliveries.'
}

export default function DeliveryPage() {
    return (
       <div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-headline mb-8 flex items-center gap-3">
                <CalendarClock className="h-8 w-8" />
                Delivery Scheduling
            </h1>
            <p className="text-muted-foreground text-lg">
                This feature will allow you to select preferred delivery dates for your orders and track their status from our warehouse to your site.
            </p>
            <p className="text-muted-foreground mt-4">
                This feature requires integration with our logistics system and is currently under development. Please check back for updates.
            </p>
       </div>
    )
}
