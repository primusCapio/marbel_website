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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { projectShapes, projectUrgencies } from '@/lib/types';

const formSchema = z.object({
  projectName: z.string().min(3, { message: "Project name must be at least 3 characters." }),
  siteLocation: z.string().min(3, { message: "Site location is required." }),
  clientName: z.string().min(2, { message: "Client name is required." }),
  length: z.coerce.number().min(0.1, { message: "Length must be a positive number." }),
  breadth: z.coerce.number().min(0.1, { message: "Breadth must be a positive number." }),
  unit: z.enum(["ft", "in"]),
  shape: z.enum(projectShapes),
  urgency: z.enum(projectUrgencies),
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
      length: 0,
      breadth: 0,
      unit: "ft",
      shape: "Rectangle",
      urgency: "Medium",
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
      <DialogContent className="sm:max-w-lg">
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
                        name="shape"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Shape</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a shape" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {projectShapes.map(shape => <SelectItem key={shape} value={shape}>{shape}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="urgency"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Urgency</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select urgency" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {projectUrgencies.map(urgency => <SelectItem key={urgency} value={urgency}>{urgency}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <FormField
                        control={form.control}
                        name="length"
                        render={({ field }) => (
                            <FormItem className="col-span-1">
                                <FormLabel>Length</FormLabel>
                                <FormControl><Input type="number" placeholder="e.g., 10" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="breadth"
                        render={({ field }) => (
                            <FormItem className="col-span-1">
                                <FormLabel>Breadth</FormLabel>
                                <FormControl><Input type="number" placeholder="e.g., 12" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="unit"
                        render={({ field }) => (
                            <FormItem className="col-span-1">
                                <FormLabel>Unit</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Unit" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="ft">Feet</SelectItem>
                                        <SelectItem value="in">Inches</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
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
