import {
  TrendingUp,
  Clock,
  Globe,
  BarChart,
  GalleryVerticalEnd,
  Calculator,
  PieChart,
  ShieldCheck,
  Briefcase,
  Zap,
  Hourglass,
  Rocket,
  type LucideIcon,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export const metadata = {
  title: 'Why Choose Saalim Stone?',
  description: 'Discover the advantages of a modern digital presence for your business.',
};

interface Benefit {
  icon: LucideIcon;
  title: string;
  points: string[];
}

const benefits: Benefit[] = [
  {
    icon: TrendingUp,
    title: 'Increased Sales & Leads',
    points: ['Customers can browse products anytime.', 'Easy contact via WhatsApp for more inquiries and conversions.'],
  },
  {
    icon: Clock,
    title: '24/7 Customer Availability',
    points: ['Your business runs even when the shop is closed.', 'Customers can view products and send inquiries anytime.'],
  },
  {
    icon: Globe,
    title: 'Target Wider Audience',
    points: ['Reach builders, architects, and contractors across cities.', 'Expands your market reach beyond local customers.'],
  },
  {
    icon: BarChart,
    title: 'Reduced Marketing Cost',
    points: ['A website with SEO provides cheaper, long-term marketing than traditional ads.', 'Build a strong digital presence.'],
  },
  {
    icon: GalleryVerticalEnd,
    title: 'Better Product Showcase',
    points: ['Show all your products in one place, organized by categories.', 'Helps customers understand your offerings easily.'],
  },
  {
    icon: Calculator,
    title: 'Improved Customer Decision Making',
    points: ['Features like filters, comparison, and price calculators help customers decide faster.', 'Leads to quicker sales.'],
  },
  {
    icon: PieChart,
    title: 'Data & Customer Insights',
    points: ['Track most viewed products, popular categories, and customer inquiries.', 'Aids in stock planning and business strategy.'],
  },
  {
    icon: ShieldCheck,
    title: 'Strong Brand Image',
    points: ['A professional website builds trust and credibility.', 'Customers prefer businesses with a modern digital presence.'],
  },
  {
    icon: Briefcase,
    title: 'Better B2B Opportunities',
    points: ['Easily share your catalog for bulk inquiries.', 'Attract long-term clients like architects and contractors for large-scale projects.'],
  },
  {
    icon: Zap,
    title: 'Faster Communication',
    points: ['WhatsApp integration and contact forms reduce phone calls and manual effort.', 'Streamline your communication channels.'],
  },
  {
    icon: Hourglass,
    title: 'Reduced Workload',
    points: ['The website shows all product details, images, and specs.', 'Saves time by answering common customer questions automatically.'],
  },
  {
    icon: Rocket,
    title: 'Competitive Advantage',
    points: ['Transition from a local shop to a modern digital business.', 'Stay ahead of competitors who lack an online presence.'],
  },
];

export default function WhyUsPage() {
  return (
    <div className="bg-background">
      <div className="container py-16 md:py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold font-headline">The Saalim Stone Advantage</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A website is more than just an online presence; it's a powerful tool for growth, efficiency, and customer engagement. See how a digital storefront transforms your business.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-card flex flex-col">
              <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                <div className="bg-primary/10 p-3 rounded-full">
                   <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                    {benefit.points.map((point, i) => <li key={i}>{point}</li>)}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
