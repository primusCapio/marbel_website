import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { TAGLINE, WHATSAPP_LINK } from '@/lib/constants';
import { products } from '@/lib/data';
import { ProductCard } from '@/components/products/product-card';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');
  const featuredProducts = products.slice(0, 3);

  return (
    <>
      <section className="relative h-[60vh] md:h-[80vh] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight">
            {TAGLINE}
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl text-slate-200">
            Discover a world of elegance with our handpicked selection of marble, granite, and Kota stone.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-7 px-8">
            <Link href={WHATSAPP_LINK} target="_blank">
              Contact Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Featured Products</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our premium collection of natural stones, perfect for any project.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link href="/products">
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Why Choose Stone Craft Hub?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We are dedicated to providing the highest quality natural stones with unparalleled customer service.
            </p>
            <ul className="mt-8 space-y-4 text-left">
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-accent mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Premium Quality Selection</h3>
                  <p className="text-muted-foreground">Hand-sourced from the world's best quarries for exceptional beauty and durability.</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-accent mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Expert Guidance</h3>
                  <p className="text-muted-foreground">Our team helps you find the perfect stone for your project's needs.</p>
                </div>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-6 w-6 text-accent mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Builders & Designers Welcome</h3>
                  <p className="text-muted-foreground">We partner with professionals to bring architectural visions to life.</p>
                </div>
              </li>
            </ul>
             <Button asChild size="lg" variant="link" className="px-0 mt-6 text-accent text-lg">
                  <Link href="/about">
                      Learn more about us <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
              </Button>
          </div>
        </div>
      </section>
    </>
  );
}
