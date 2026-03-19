'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const cartTotal = getCartTotal();
  const deliveryCharges = cartTotal > 0 ? 500 : 0; // Dummy delivery charge
  const grandTotal = cartTotal + deliveryCharges;

  return (
    <div className="container py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-extrabold font-headline mb-8">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-secondary rounded-lg">
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <Button asChild className="mt-6">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(({ product, quantity }) => {
              const productImage = PlaceHolderImages.find(p => p.id === product.images[0]);
              return (
                <Card key={product.id} className="flex flex-col sm:flex-row items-center gap-4 p-4">
                  <div className="relative aspect-square w-24 h-24 sm:w-32 sm:h-32 rounded-md overflow-hidden flex-shrink-0">
                    {productImage && (
                      <Image src={productImage.imageUrl} alt={product.name} fill className="object-cover" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">₹{product.pricePerSqFt.toLocaleString('en-IN')} / sq.ft.</p>
                    <p className="text-sm font-semibold mt-1">
                      Total: ₹{(product.pricePerSqFt * quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                     <Button variant="outline" size="icon" onClick={() => updateQuantity(product.id, quantity - 10)}>
                        <Minus className="h-4 w-4"/>
                    </Button>
                    <Input
                      type="number"
                      value={quantity}
                      onChange={(e) => updateQuantity(product.id, parseInt(e.target.value) || 1)}
                      className="w-20 text-center"
                      min="1"
                    />
                     <Button variant="outline" size="icon" onClick={() => updateQuantity(product.id, quantity + 10)}>
                        <Plus className="h-4 w-4"/>
                    </Button>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeFromCart(product.id)}>
                    <Trash2 className="h-5 w-5 text-destructive" />
                  </Button>
                </Card>
              );
            })}
          </div>

          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="font-semibold">₹{deliveryCharges.toLocaleString('en-IN')}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Grand Total</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
              <Button asChild size="lg" className="w-full mt-4">
                <Link href="/checkout">
                  Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
