'use client';

import { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { products } from "@/lib/data"
import { ProductCard } from "@/components/products/product-card"
import type { Category } from "@/lib/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const categories: Category[] = ["Marble", "Granite", "Kota Stone"];
const finishes = [...new Set(products.map(p => p.finish))];
const colors = [...new Set(products.map(p => p.color))];

export default function ProductsPage() {
  const [selectedColor, setSelectedColor] = useState('all');
  const [selectedFinish, setSelectedFinish] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedColor !== 'all') {
      filtered = filtered.filter(p => p.color === selectedColor);
    }
    if (selectedFinish !== 'all') {
      filtered = filtered.filter(p => p.finish === selectedFinish);
    }

    if (sortOrder === 'low-high') {
      filtered.sort((a, b) => a.pricePerSqFt - b.pricePerSqFt);
    } else if (sortOrder === 'high-low') {
      filtered.sort((a, b) => b.pricePerSqFt - a.pricePerSqFt);
    }

    return filtered;
  }, [selectedColor, selectedFinish, sortOrder]);

  const handleResetFilters = () => {
    setSelectedColor('all');
    setSelectedFinish('all');
    setSortOrder('default');
  }

  const filtersApplied = selectedColor !== 'all' || selectedFinish !== 'all' || sortOrder !== 'default';

  const renderFilters = (isMobile = false) => (
    <>
      <Select value={selectedColor} onValueChange={setSelectedColor}>
        <SelectTrigger className={cn(!isMobile && "w-[180px]")}>
          <SelectValue placeholder="Color" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Colors</SelectItem>
          {colors.map(color => <SelectItem key={color} value={color}>{color}</SelectItem>)}
        </SelectContent>
      </Select>
      <Select value={selectedFinish} onValueChange={setSelectedFinish}>
        <SelectTrigger className={cn(!isMobile && "w-[180px]")}>
          <SelectValue placeholder="Finish" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Finishes</SelectItem>
          {finishes.map(finish => <SelectItem key={finish} value={finish}>{finish}</SelectItem>)}
        </SelectContent>
      </Select>
      <Select value={sortOrder} onValueChange={setSortOrder}>
        <SelectTrigger className={cn(!isMobile && "w-[180px]")}>
          <SelectValue placeholder="Price" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="low-high">Low to High</SelectItem>
          <SelectItem value="high-low">High to Low</SelectItem>
        </SelectContent>
      </Select>
      {filtersApplied && (
        <Button variant="ghost" onClick={handleResetFilters}>Reset</Button>
      )}
    </>
  );

  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline">Our Stone Collection</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          From classic elegance to modern strength, find the perfect natural stone for your project. We offer a curated selection of high-quality materials to suit any aesthetic and functional need.
        </p>
      </div>

      <div className="mt-12">
        {/* Desktop Filters */}
        <div className="hidden md:flex flex-wrap gap-4 items-center justify-center p-4 border-b">
          <span className="font-semibold">Filter by:</span>
          {renderFilters()}
        </div>

        {/* Mobile Filters */}
        <div className="md:hidden mt-8">
          <Accordion type="single" collapsible>
            <AccordionItem value="filters">
              <AccordionTrigger className="text-lg font-semibold">Filters</AccordionTrigger>
              <AccordionContent className="space-y-4 p-2">
                <div className="flex flex-col space-y-4">
                  {renderFilters(true)}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <Tabs defaultValue="Marble" className="mt-8">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto h-12">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="text-md">{category}</TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => {
          const categoryProducts = filteredProducts.filter((product) => product.category === category)
          return (
            <TabsContent key={category} value={category} className="mt-8">
              {categoryProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categoryProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 text-muted-foreground col-span-full">
                  No products match your criteria in this category.
                </div>
              )}
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  );
}
