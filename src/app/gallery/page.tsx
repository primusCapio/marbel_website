import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const metadata = {
  title: 'Project Gallery',
  description: 'Explore our completed projects and see our natural stones in action.',
};

export default function GalleryPage() {
  // Replace with actual project images later
  const galleryImages = [
    { id: 'marble-1', hint: 'marble bathroom' },
    { id: 'granite-1', hint: 'granite countertop' },
    { id: 'kota-1', hint: 'stone flooring' },
    { id: 'marble-2', hint: 'marble wall' },
    { id: 'granite-2', hint: 'granite flooring' },
    { id: 'kota-2', hint: 'outdoor paving' },
  ];

  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline">Project Gallery</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Witness the timeless beauty and versatility of our natural stones in a variety of settings. From luxurious residential interiors to large-scale commercial projects, our stones create lasting impressions.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryImages.map((img, index) => {
          const imageData = PlaceHolderImages.find(p => p.id === img.id);
          return (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden shadow-lg group">
              {imageData && (
                <Image
                  src={imageData.imageUrl}
                  alt={`Project image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  data-ai-hint={img.hint}
                />
              )}
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
