import { FileOutput } from "lucide-react";

export const metadata = {
    title: 'Export Design Package',
    description: 'Export project materials and details into a single PDF package.'
}

export default function ExportPackagePage() {
    return (
       <div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-headline mb-8 flex items-center gap-3">
                <FileOutput className="h-8 w-8" />
                Export Design Package
            </h1>
            <p className="text-muted-foreground text-lg">
                This tool will allow you to compile all your project information—including selected materials, BOQs, and layout plans—into a single, professional PDF package to share with clients or contractors.
            </p>
            <p className="text-muted-foreground mt-4">
                This feature is currently under development. Check back later for updates.
            </p>
       </div>
    )
}
