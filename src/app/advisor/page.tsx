import { AdvisorForm } from './advisor-form';

export const metadata = {
  title: 'AI Stone Advisor',
  description: 'Get expert stone recommendations for your project from our AI assistant.',
};

export default function AdvisorPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline">AI Stone Advisor</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Designed for architects and designers. Describe your project requirements, and our AI will suggest the perfect stones from our collection to bring your vision to life.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mt-12">
        <AdvisorForm />
      </div>
    </div>
  );
}
