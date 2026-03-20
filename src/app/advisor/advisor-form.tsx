'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { runAIStoneAdvisor, AIResponse } from './actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductCard } from '@/components/products/product-card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

const formSchema = z.object({
  projectType: z.string().min(5, { message: "Please describe the project type (e.g., 'Residential kitchen countertops')." }),
  desiredAesthetic: z.string().min(5, { message: "Please describe the desired aesthetic (e.g., 'Modern and minimalist')." }),
  functionalRequirements: z.string().min(5, { message: "Please describe functional needs (e.g., 'Heat and scratch resistant')." }),
});

export function AdvisorForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectType: "",
      desiredAesthetic: "",
      functionalRequirements: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setAiResponse(null);
    const response = await runAIStoneAdvisor(values);
    setAiResponse(response);
    setIsSubmitting(false);
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="projectType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Luxury hotel lobby flooring" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="desiredAesthetic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired Aesthetic</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Classic, elegant, and timeless" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="functionalRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Functional Requirements</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., High durability for heavy foot traffic, easy to clean." {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? 'Analyzing...' : 'Get AI Recommendations'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isSubmitting && (
         <div className="text-center p-8">
            <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Our AI expert is analyzing your requirements...</p>
         </div>
      )}

      {aiResponse && (
        <div className="mt-12">
            <h2 className="text-3xl font-bold text-center mb-8">AI-Powered Suggestions</h2>
            {aiResponse.error && (
                <Alert variant="destructive">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{aiResponse.error}</AlertDescription>
                </Alert>
            )}
            {aiResponse.suggestions.length > 0 ? (
                <div className="space-y-8">
                    {aiResponse.suggestions.map(({ product, reasoning }) => (
                        <Card key={product.id} className="overflow-hidden">
                           <div className="grid md:grid-cols-3">
                             <div className="md:col-span-1">
                                <ProductCard product={product} />
                             </div>
                             <div className="md:col-span-2 p-6">
                                <h3 className="text-xl font-bold">Why we suggest {product.name}</h3>
                                <p className="mt-2 text-muted-foreground italic">"{reasoning}"</p>
                             </div>
                           </div>
                        </Card>
                    ))}
                </div>
            ) : !aiResponse.error && (
                 <p className="text-center text-muted-foreground">No suggestions could be generated for your query. Please try being more specific.</p>
            )}
        </div>
      )}

    </div>
  );
}
