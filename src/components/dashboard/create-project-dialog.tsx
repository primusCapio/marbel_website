'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { useState } from 'react';
import { Loader2, PlusCircle } from 'lucide-react';
import { useProjects } from '@/hooks/use-projects';

const formSchema = z.object({
  projectName: z.string().min(3, { message: "Project name must be at least 3 characters." }),
  siteLocation: z.string().min(3, { message: "Site location is required." }),
  clientName: z.string().min(2, { message: "Client name is required." }),
  areaRequired: z.coerce.number().min(1, { message: "Area must be greater than 0." }),
  timeline: z.string().optional(),
  deliveryCity: z.string().min(2, { message: "Delivery city is required." }),
})

export function CreateProjectDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addProject } = useProjects();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      siteLocation: "",
      clientName: "",
      areaRequired: 0,
      timeline: "",
      deliveryCity: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    addProject(values);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsSubmitting(false);
    setIsOpen(false);
    form.reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Fill in the details below to start a new project. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl><Input placeholder="e.g., Luxury Villa" {...field} /></FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Client Name</FormLabel>
                    <FormControl><Input placeholder="e.g., John Doe" {...field} /></FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                    control={form.control}
                    name="siteLocation"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Site Location</FormLabel>
                        <FormControl><Input placeholder="e.g., Mumbai" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                     <FormField
                    control={form.control}
                    name="deliveryCity"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Delivery City</FormLabel>
                        <FormControl><Input placeholder="e.g., Delhi" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <FormField
                    control={form.control}
                    name="areaRequired"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Area (sq.ft.)</FormLabel>
                        <FormControl><Input type="number" placeholder="e.g., 2000" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="timeline"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Timeline (Optional)</FormLabel>
                        <FormControl><Input placeholder="e.g., 3 months" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isSubmitting ? 'Saving...' : 'Save Project'}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
