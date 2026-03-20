import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { TAGLINE, COMPANY_NAME } from '@/lib/constants';
import { products } from '@/lib/data';
import { ProductCard } from '@/components/products/product-card';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');
  const featuredProducts = products.slice(0, 3);
  const testimonials = [
    {
      name: "Ravi Kumar",
      title: "Contractor",
      avatar: "RK",
      image: "",
      text: "Saalim Stone has the best quality marble I've seen. Their pan-India delivery is always on time, which is crucial for my projects. Highly recommended for bulk orders.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      title: "Architect",
      avatar: "PS",
      image: "",
      text: "The selection of granite and Kota stone is exceptional. I was able to find the perfect finish for my client's modern home. The team is knowledgeable and very helpful.",
      rating: 5,
    },
    {
      name: "Anjali Mehta",
      title: "Homeowner",
      avatar: "AM",
      image: "",
      text: "I renovated my kitchen and the Calacatta Gold Marble countertop I bought from Saalim Stone is the centerpiece. The price calculator was accurate and the service was excellent.",
      rating: 5,
    }
  ]

  return (
    <>
      <section className="relative h-[70vh] md:h-[90vh] w-full">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-extrabold font-headline tracking-tight">
            {TAGLINE}
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl text-slate-200">
            Discover a world of elegance with our handpicked selection of premium marble, granite, and Kota stone for projects of any scale.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg py-7 px-8">
              <Link href="/products">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black font-bold text-lg py-7 px-8">
              <Link href="/contact">
                Get Quote
              </Link>
            </Button>
          </div>
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
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">Why Choose {COMPANY_NAME}?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We are dedicated to providing the highest quality natural stones with unparalleled customer service.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12 text-left">
              <div className="flex items-start">
                <CheckCircle className="h-8 w-8 text-accent mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Premium Quality Selection</h3>
                  <p className="text-muted-foreground">Hand-sourced from the world's best quarries for exceptional beauty and durability.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-8 w-8 text-accent mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Competitive Pricing</h3>
                  <p className="text-muted-foreground">Transparent, fair pricing for homeowners, contractors, and architects alike.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="h-8 w-8 text-accent mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">Pan-India Delivery</h3>
                  <p className="text-muted-foreground">Reliable and timely delivery network ensures your materials arrive safely, anywhere in India.</p>
                </div>
              </div>
            </div>
             <Button asChild size="lg" variant="link" className="px-0 mt-8 text-accent text-lg">
                  <Link href="/about">
                      Learn more about us <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
              </Button>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline">What Our Customers Say</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Building trust with every slab we deliver.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className="flex flex-col">
                <CardHeader className="flex-row items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                </CardContent>
                <CardFooter>
                  <div className="flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, j) => (
                      <Star key={j} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
