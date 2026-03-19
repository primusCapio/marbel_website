'use client';

import { useState } from 'react';
import { Loader2, Sparkles, Wand2, Lightbulb, AlertCircle } from 'lucide-react';

import type { AiStoneAdvisorInput, AiStoneAdvisorOutput } from '@/ai/flows/ai-stone-advisor-flow';
import { AdvisorForm, type FormValues, functionalRequirements } from './advisor-form';
import { getStoneAdvice } from './actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function AdvisorPage() {
  const [advice, setAdvice] = useState<AiStoneAdvisorOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setError(null);
    setAdvice(null);

    const mappedRequirements = Object.entries(data.functionalRequirements)
      .filter(([, checked]) => checked)
      .map(([key]) => functionalRequirements.find(req => req.id === key)!.label);

    const input: AiStoneAdvisorInput = {
      ...data,
      functionalRequirements: mappedRequirements,
    };

    const result = await getStoneAdvice(input);

    if ('error' in result) {
      setError(result.error);
    } else {
      setAdvice(result);
    }

    setIsLoading(false);
  };

  return (
    <div className="container py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto">
        <Wand2 className="mx-auto h-12 w-12 text-primary" />
        <h1 className="text-4xl md:text-5xl font-extrabold font-headline mt-4">AI Stone Advisor</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Not sure which stone is right for you? Answer a few questions, and our AI will provide personalized recommendations based on your project's needs and aesthetic goals.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12 mt-16">
        <div className="lg:col-span-1">
          <Card className="sticky top-24 shadow-sm border">
            <CardHeader>
              <CardTitle>Tell us about your project</CardTitle>
            </CardHeader>
            <CardContent>
              <AdvisorForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {isLoading && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center">
              <Loader2 className="h-16 w-16 animate-spin text-primary" />
              <p className="mt-4 text-lg font-semibold">Generating recommendations...</p>
              <p className="text-muted-foreground">Our AI is analyzing your needs.</p>
            </div>
          )}

          {error && (
             <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {advice && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="h-8 w-8 text-primary" />
                <h2 className="text-3xl font-bold">Your AI-Powered Recommendations</h2>
              </div>
              <div className="space-y-6">
                {advice.recommendations.map((rec, index) => (
                  <Card key={index} className="bg-card">
                    <CardHeader>
                      <div className="flex justify-between items-start gap-4">
                        <CardTitle className="text-2xl">{rec.stoneName}</CardTitle>
                        <Badge variant="secondary">{rec.stoneCategory}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="font-semibold mb-2 text-primary">Why we recommend this:</p>
                      <p className="text-muted-foreground mb-4">{rec.reasoning}</p>
                      <div className="grid md:grid-cols-2 gap-6 mt-4 pt-4 border-t">
                        <div>
                          <h4 className="font-semibold mb-2">Key Properties</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            {rec.keyProperties.map((prop, i) => <li key={i}>{prop}</li>)}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Considerations</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            {rec.considerations.map((con, i) => <li key={i}>{con}</li>)}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                 <Alert>
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle>Disclaimer</AlertTitle>
                    <AlertDescription>
                        These recommendations are generated by AI and should be used as a starting point. We recommend discussing with our experts and viewing physical samples before making a final decision.
                    </AlertDescription>
                </Alert>
              </div>
            </div>
          )}

           {!isLoading && !advice && !error && (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center bg-secondary/50 border-2 border-dashed rounded-lg p-8">
              <Sparkles className="h-16 w-16 text-muted-foreground/50" />
              <p className="mt-4 text-lg font-semibold text-muted-foreground">Your recommendations will appear here.</p>
              <p className="text-muted-foreground">Fill out the form to get started!</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
