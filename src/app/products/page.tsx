import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { products } from "@/lib/data"
import { ProductCard } from "@/components/products/product-card"
import type { Category } from "@/lib/types"

const categories: Category[] = ["Marble", "Granite", "Kota Stone"];

export const metadata = {
  title: 'Our Products',
  description: 'Browse our collection of premium Marble, Granite, and Kota Stone.',
}

export default function ProductsPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline">Our Stone Collection</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          From classic elegance to modern strength, find the perfect natural stone for your project. We offer a curated selection of high-quality materials to suit any aesthetic and functional need.
        </p>
      </div>

      <Tabs defaultValue="Marble" className="mt-12">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto h-12">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="text-md">{category}</TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products
                .filter((product) => product.category === category)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
