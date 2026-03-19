import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
          <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-xl">{product.name}</CardTitle>
            <Badge variant="outline" className="flex-shrink-0">{product.category}</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          <CardDescription>{product.description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
