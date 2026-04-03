'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { getProductById, products } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import { ArrowRight, Check, Minus, Plus, ShoppingCart } from 'lucide-react';
import { ProductCard } from '@/components/products/product-card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/hooks/use-cart';

type Props = {
  params: { id: string };
};

export default function ProductDetailPage({ params }: Props) {
  const product = getProductById(params.id);
  const { addToCart } = useCart();
  const [area, setArea] = useState(100);

  if (!product) {
    notFound();
  }
  
  const relatedProducts = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);
  const productImage = PlaceHolderImages.find(p => p.id === product.images[0]);

  const totalPrice = product.pricePerSqFt * area;

  const handleAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setArea(isNaN(value) || value < 1 ? 1 : value);
  };
  
  const incrementArea = () => setArea(prev => prev + 10);
  const decrementArea = () => setArea(prev => Math.max(10, prev - 10));

  const handleAddToCart = () => {
    addToCart(product, area);
  };
  
  const whatsappMessage = `Hello! I'm interested in ordering ${product.name}. I need an area of ${area} sq.ft. The total calculated price is ₹${totalPrice.toLocaleString('en-IN')}. Please provide a final quote including delivery.`;
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

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
          
          <p className="text-2xl font-semibold text-primary mb-4">
            ₹{product.pricePerSqFt.toLocaleString('en-IN')} / sq.ft.
          </p>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {product.longDescription}
          </p>
          
          <div className="mt-6 pt-6 border-t">
             <h3 className="text-lg font-semibold mb-3">Key Features:</h3>
             <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500"/> High Durability</li>
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500"/> Finish: {product.finish}</li>
                <li className="flex items-center"><Check className="h-4 w-4 mr-2 text-green-500"/> Color: {product.color}</li>
             </ul>
          </div>

          <div className="mt-8 p-6 bg-secondary rounded-lg">
            <h3 className="text-xl font-bold mb-4">Price Calculator</h3>
            <div className="grid sm:grid-cols-2 gap-4 items-end">
              <div>
                <Label htmlFor="area" className="text-sm font-medium">Area (in sq.ft.)</Label>
                <div className="flex items-center mt-1">
                  <Button variant="outline" size="icon" onClick={decrementArea}><Minus className="h-4 w-4"/></Button>
                  <Input 
                    id="area"
                    type="number"
                    value={area}
                    onChange={handleAreaChange}
                    className="w-24 text-center mx-2"
                    min="1"
                  />
                  <Button variant="outline" size="icon" onClick={incrementArea}><Plus className="h-4 w-4"/></Button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Price</p>
                <p className="text-3xl font-bold">₹{totalPrice.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href={whatsappLink} target="_blank">
                Get Quote on WhatsApp
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
