import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProductById, products } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WHATSAPP_LINK } from '@/lib/constants';
import { ArrowRight, Check } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { ProductCard } from '@/components/products/product-card';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props) {
  const product = getProductById(params.id);

  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }
  
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const productImage = PlaceHolderImages.find(p => p.id === product.images[0]);

  return (
    <>
    <div className="container py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
        <div className="sticky top-24">
          <div className="aspect-[4/3] relative rounded-lg overflow-hidden shadow-lg border">
            {productImage && (
              <Image
                src={productImage.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                data-ai-hint={productImage.imageHint}
              />
            )}
          </div>
        </div>

        <div>
          <Badge variant="secondary" className="mb-2">{product.category}</Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold font-headline mb-4">{product.name}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {product.longDescription}
          </p>
          
          <div className="mt-8 pt-6 border-t">
             <h3 className="text-lg font-semibold mb-3">Key Features:</h3>
             <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500"/> High Durability</li>
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500"/> Premium Finish</li>
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500"/> Sourced from Best Quarries</li>
             </ul>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href={WHATSAPP_LINK} target="_blank">
                Inquire on WhatsApp <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
    {relatedProducts.length > 0 && (
        <div className="bg-secondary py-16 md:py-24">
            <div className="container">
                <h2 className="text-3xl font-bold text-center mb-8">Related Products</h2>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {relatedProducts.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            </div>
        </div>
    )}
    </>
  );
}
