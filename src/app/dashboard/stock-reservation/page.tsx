import { Package } from "lucide-react";

export const metadata = {
    title: 'Live Stock Reservation',
    description: 'Reserve specific slabs for your projects in real-time.'
}

export default function StockReservationPage() {
    return (
       <div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-headline mb-8 flex items-center gap-3">
                <Package className="h-8 w-8" />
                Live Stock Reservation
            </h1>
             <p className="text-muted-foreground text-lg">
                This tool will allow you to view our live inventory and reserve specific slabs or batches for a limited time, ensuring they are available when you need them.
             </p>
             <p className="text-muted-foreground mt-4">
                This feature requires a direct connection to our inventory database and is currently under development.
             </p>
       </div>
    )
}
