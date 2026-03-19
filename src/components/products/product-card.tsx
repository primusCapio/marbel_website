import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const productImage = PlaceHolderImages.find(p => p.id === product.images[0]);

  return (
    <Link href={`/products/${product.id}`} className="block group">
      <Card className="overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1 h-full flex flex-col">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
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
          <CardTitle className="text-xl">{product.name}</CardTitle>
          <CardDescription>{product.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-lg font-semibold text-primary">₹{product.pricePerSqFt.toLocaleString('en-IN')} / sq.ft.</p>
        </CardContent>
        <CardFooter>
            <Badge variant="outline">{product.finish}</Badge>
            <Badge variant="outline" className="ml-2">{product.color}</Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
