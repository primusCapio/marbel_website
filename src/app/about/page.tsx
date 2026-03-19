import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Award, Target, Users } from 'lucide-react';

export const metadata = {
  title: 'About Us',
  description: 'Learn about our commitment to quality and excellence in the natural stone industry.',
}

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us');

  return (
    <>
      <div className="bg-secondary">
        <div className="container py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold font-headline">About Stone Craft Hub</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Decades of experience in sourcing and supplying the world's finest natural stones.
            </p>
          </div>
        </div>
      </div>
      <div className="container -mt-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] relative rounded-lg overflow-hidden shadow-lg">
              {aboutImage && (
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={aboutImage.imageHint}
                />
              )}
            </div>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                At Stone Craft Hub, we are more than just suppliers of marble, granite, and Kota stone. We are curators of Earth's finest art, dedicated to bringing timeless beauty and enduring quality into your spaces. Our journey began with a passion for natural stone and a commitment to excellence.
              </p>
              <p>
                We partner with architects, designers, builders, and homeowners, providing not only premium materials but also expert guidance to ensure the perfect choice for every project. Our focus on quality is uncompromising, from sourcing at the world's best quarries to meticulous processing and finishing.
              </p>
            </div>
          </div>
      </div>
      <div className="container py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="flex flex-col items-center">
                  <Award className="h-12 w-12 text-primary mb-4"/>
                  <h3 className="text-2xl font-bold">Quality Commitment</h3>
                  <p className="text-muted-foreground mt-2">Every slab is hand-inspected to meet our rigorous standards for beauty and durability.</p>
              </div>
              <div className="flex flex-col items-center">
                  <Users className="h-12 w-12 text-primary mb-4"/>
                  <h3 className="text-2xl font-bold">Expert Team</h3>
                  <p className="text-muted-foreground mt-2">Our experienced professionals are here to guide you through every step of your project.</p>
              </div>
              <div className="flex flex-col items-center">
                  <Target className="h-12 w-12 text-primary mb-4"/>
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                  <p className="text-muted-foreground mt-2">To provide exceptional natural stone solutions that inspire and endure for generations.</p>
              </div>
          </div>
      </div>
    </>
  );
}
