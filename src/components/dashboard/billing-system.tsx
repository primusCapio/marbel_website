'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Trash2, Download } from 'lucide-react';
import { useBilling } from '@/hooks/use-billing';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { paymentModes, paymentStatuses } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

const invoiceItemSchema = z.object({
    productId: z.string().min(1, 'Product is required.'),
    quantity: z.coerce.number().min(0.1, 'Quantity must be positive.'),
});

const formSchema = z.object({
    customerName: z.string().min(2, 'Customer name is required.'),
    customerAddress: z.string().min(10, 'Customer address is required.'),
    items: z.array(invoiceItemSchema).min(1, 'At least one item is required.'),
    discount: z.coerce.number().min(0).default(0),
    taxRate: z.coerce.number().min(0).max(100).default(18), // GST Rate
    additionalCharges: z.coerce.number().min(0).default(0),
    paymentMode: z.enum(paymentModes),
    paymentStatus: z.enum(paymentStatuses),
});

export function BillingSystem() {
    const { addInvoice, invoices } = useBilling();
    const { toast } = useToast();
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            customerName: '',
            customerAddress: '',
            items: [{ productId: '', quantity: 1 }],
            discount: 0,
            taxRate: 18,
            additionalCharges: 0,
            paymentMode: 'Bank Transfer',
            paymentStatus: 'Pending',
        },
    });
    
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'items',
    });
    
    const watchItems = form.watch('items');
    const watchDiscount = form.watch('discount');
    const watchTaxRate = form.watch('taxRate');
    const watchAdditionalCharges = form.watch('additionalCharges');

    const subtotal = watchItems.reduce((acc, item) => {
        const product = products.find(p => p.id === item.productId);
        return acc + (product ? product.pricePerSqFt * item.quantity : 0);
    }, 0);
    
    const taxAmount = (subtotal - watchDiscount) * (watchTaxRate / 100);
    const grandTotal = subtotal - watchDiscount + taxAmount + watchAdditionalCharges;

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const invoiceItems = values.items.map(item => {
            const product = products.find(p => p.id === item.productId)!;
            return {
                productId: product.id,
                productName: product.name,
                quantity: item.quantity,
                price: product.pricePerSqFt,
                total: item.quantity * product.pricePerSqFt,
            };
        });

        addInvoice({
            customerName: values.customerName,
            customerAddress: values.customerAddress,
            items: invoiceItems,
            subtotal,
            discount: values.discount,
            tax: taxAmount,
            additionalCharges: values.additionalCharges,
            total: grandTotal,
            paymentMode: values.paymentMode,
            paymentStatus: values.paymentStatus,
        });

        toast({ title: 'Invoice Generated Successfully!' });
        form.reset();
    };

    const handleDownload = () => {
        toast({ title: 'Coming Soon!', description: 'PDF export is under development.' });
    };

    return (
        <div className="space-y-8">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4 border rounded-lg">
                    <h3 className="text-xl font-semibold">Create New Invoice</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField name="customerName" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Customer Name</FormLabel>
                                <FormControl><Input placeholder="Client Name" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField name="customerAddress" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Customer Address</FormLabel>
                                <FormControl><Textarea placeholder="Client Address" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>

                    <div className="space-y-2">
                        <FormLabel>Invoice Items</FormLabel>
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex items-center gap-2">
                                <FormField name={`items.${index}.productId`} control={form.control} render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger><SelectValue placeholder="Select product" /></SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {products.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                )} />
                                <FormField name={`items.${index}.quantity`} control={form.control} render={({ field }) => (
                                   <Input type="number" placeholder="Qty" {...field} className="w-24" />
                                )} />
                                <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={() => append({ productId: '', quantity: 1 })}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Item
                        </Button>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <FormField name="discount" control={form.control} render={({ field }) => (
                            <FormItem><FormLabel>Discount (₹)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>
                        )} />
                        <FormField name="taxRate" control={form.control} render={({ field }) => (
                            <FormItem><FormLabel>GST Rate (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>
                        )} />
                        <FormField name="additionalCharges" control={form.control} render={({ field }) => (
                            <FormItem><FormLabel>Additional Charges (₹)</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>
                        )} />
                    </div>

                     <div className="grid md:grid-cols-2 gap-4">
                        <FormField name="paymentMode" control={form.control} render={({ field }) => (
                            <FormItem>
                                <FormLabel>Payment Mode</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl>
                                    <SelectContent>
                                        {paymentModes.map(mode => <SelectItem key={mode} value={mode}>{mode}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )} />
                        <FormField name="paymentStatus" control={form.control} render={({ field }) => (
                           <FormItem>
                                <FormLabel>Payment Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl>
                                    <SelectContent>
                                        {paymentStatuses.map(status => <SelectItem key={status} value={status}>{status}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )} />
                    </div>


                    <div className="p-4 bg-secondary rounded-lg space-y-2">
                        <div className="flex justify-between font-medium"><p>Subtotal:</p> <p>₹{subtotal.toLocaleString('en-IN')}</p></div>
                        <div className="flex justify-between text-sm text-muted-foreground"><p>Discount:</p> <p>- ₹{watchDiscount.toLocaleString('en-IN')}</p></div>
                        <div className="flex justify-between text-sm text-muted-foreground"><p>Tax ({watchTaxRate}%):</p> <p>+ ₹{taxAmount.toLocaleString('en-IN')}</p></div>
                        <div className="flex justify-between text-sm text-muted-foreground"><p>Additional Charges:</p> <p>+ ₹{watchAdditionalCharges.toLocaleString('en-IN')}</p></div>
                        <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2"><p>Grand Total:</p> <p>₹{grandTotal.toLocaleString('en-IN')}</p></div>
                    </div>

                    <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>Generate Invoice</Button>
                </form>
            </Form>

             <div>
                <h3 className="text-xl font-semibold mb-4">Generated Invoices</h3>
                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Invoice #</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Total</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.length === 0 ? (
                                <TableRow><TableCell colSpan={6} className="text-center h-24">No invoices yet.</TableCell></TableRow>
                            ) : (
                                invoices.map(invoice => (
                                    <TableRow key={invoice.id}>
                                        <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                                        <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                                        <TableCell>{invoice.customerName}</TableCell>
                                        <TableCell><Badge variant={invoice.paymentStatus === 'Paid' ? 'success' : 'secondary'}>{invoice.paymentStatus}</Badge></TableCell>
                                        <TableCell className="text-right">₹{invoice.total.toLocaleString('en-IN')}</TableCell>
                                        <TableCell>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Button variant="ghost" size="icon" onClick={handleDownload}>
                                                            <Download className="h-4 w-4" />
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent><p>Download Invoice PDF</p></TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
