import { FeaturePlaceholder } from "@/components/dashboard/placeholder";
import { Presentation } from "lucide-react";

export const metadata = {
    title: 'Client Presentation Mode',
    description: 'A clean, full-screen UI to present selected stones to clients.'
}

export default function PresentationModePage() {
    return (
       <FeaturePlaceholder 
            title="Client Presentation Mode"
            description="Wow your clients with a professional presentation. This mode provides a clean, full-screen interface to showcase selected stones, complete with high-resolution images and key details, free from distracting UI elements."
            icon={Presentation}
       />
    )
}
