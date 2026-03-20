import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type LucideIcon } from "lucide-react";

interface PlaceholderProps {
    title: string;
    description: string;
    icon: LucideIcon;
}

export function FeaturePlaceholder({ title, description, icon: Icon }: PlaceholderProps) {
    return (
        <div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-headline mb-8 flex items-center gap-3">
                <Icon className="h-8 w-8" />
                {title}
            </h1>
            <Card>
                <CardHeader>
                    <CardTitle>Coming Soon!</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-lg">
                        {description}
                    </p>
                    <p className="text-muted-foreground mt-4">
                        This feature is currently under development. Check back later for updates.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
