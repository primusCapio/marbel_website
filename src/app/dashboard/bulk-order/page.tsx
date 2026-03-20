import { FeaturePlaceholder } from "@/components/dashboard/placeholder";
import { PackageCheck } from "lucide-react";

export const metadata = {
    title: 'Bulk Order Request',
    description: 'Request special pricing for large quantity orders.'
}

export default function BulkOrderPage() {
    return (
       <FeaturePlaceholder 
            title="Bulk Order Request"
            description="Streamline your procurement process. This feature will allow you to easily submit requests for bulk pricing on materials for your large-scale projects directly to our sales team."
            icon={PackageCheck}
       />
    )
}
