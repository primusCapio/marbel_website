import Image from 'next/image';
import { Presentation } from 'lucide-react';
import { products } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export const metadata = {
    title: 'Client Presentation Mode',
    description: 'A clean, full-screen UI to present selected stones to clients.'
}

export default function PresentationModePage() {
    return (
       <div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-headline mb-8 flex items-center gap-3">
                <Presentation className="h-8 w-8" />
                Client Presentation Mode
            </h1>
            <p className="text-muted-foreground mb-8">
                A clean interface to showcase stones to your clients. Click on any image to view product details.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => {
                    const productImage = PlaceHolderImages.find(p => p.id === product.images[0]);
                    return (
                        <Link key={product.id} href={`/products/${product.id}`} target="_blank">
                            <Card className="overflow-hidden group cursor-pointer h-full">
                                <div className="relative aspect-video w-full overflow-hidden">
                                {productImage && (
                                    <Image
                                    src={productImage.imageUrl}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    data-ai-hint={productImage.imageHint}
                                    />
                                )}
                                </div>
                                <CardHeader>
                                    <CardTitle>{product.name}</CardTitle>
                                </CardHeader>
                            </Card>
                        </Link>
                    )
                })}
            </div>
       </div>
    )
}
