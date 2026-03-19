'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

export const functionalRequirements = [
  { id: 'high-durability', label: 'High Durability' },
  { id: 'stain-resistance', label: 'Stain Resistance' },
  { id: 'heat-resistance', label: 'Heat Resistance' },
  { id: 'slip-resistance', label: 'Slip Resistance' },
  { id: 'low-maintenance', label: 'Low Maintenance' },
  { id: 'light-reflection', label: 'Light Reflection' },
  { id: 'scratch-resistance', label: 'Scratch Resistance' },
] as const;

const formSchema = z.object({
  projectType: z.string().min(3, "Please describe your project type."),
  desiredAesthetic: z.string().min(3, "Please describe the desired look."),
  functionalRequirements: z.record(z.boolean()).default({}),
  additionalNotes: z.string().optional(),
});

export type FormValues = z.infer<typeof formSchema>;

type AdvisorFormProps = {
  onSubmit: (data: FormValues) => void;
  isLoading: boolean;
};

export function AdvisorForm({ onSubmit, isLoading }: AdvisorFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectType: "",
      desiredAesthetic: "",
      functionalRequirements: {},
      additionalNotes: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="projectType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Type</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Kitchen Countertop" {...field} />
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
                <Input placeholder="e.g., Modern Minimalist" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <div>
          <FormLabel>Functional Requirements</FormLabel>
          <FormDescription className="mb-2">
            Select all that apply.
          </FormDescription>
          <div className="space-y-2">
            {functionalRequirements.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name={`functionalRequirements.${item.id}`}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal text-sm">
                      {item.label}
                    </FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>
        <FormField
          control={form.control}
          name="additionalNotes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Any other preferences?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? 'Getting Advice...' : 'Get AI Advice'}
        </Button>
      </form>
    </Form>
  );
}
