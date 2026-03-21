'use client';

import { useState } from 'react';
import { products } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { PlusCircle, Trash2 } from 'lucide-react';
import type { Product } from '@/lib/types';

interface BoqItem {
    id: number;
    productId: string;
    productName: string;
    pricePerSqFt: number;
    width: number;
    height: number;
    quantity: number;
}

export function BoqGenerator() {
    const [items, setItems] = useState<BoqItem[]>([]);
    const [currentItem, setCurrentItem] = useState({
        productId: '',
        width: '',
        height: '',
        quantity: '1',
    });

    const handleAddItem = () => {
        const product = products.find(p => p.id === currentItem.productId);
        if (!product || !currentItem.width || !currentItem.height || !currentItem.quantity) return;

        const newItem: BoqItem = {
            id: Date.now(),
            productId: product.id,
            productName: product.name,
            pricePerSqFt: product.pricePerSqFt,
            width: parseFloat(currentItem.width),
            height: parseFloat(currentItem.height),
            quantity: parseInt(currentItem.quantity, 10),
        };
        setItems([...items, newItem]);
        setCurrentItem({ productId: '', width: '', height: '', quantity: '1' }); // Reset form
    };

    const handleRemoveItem = (id: number) => {
        setItems(items.filter(item => item.id !== id));
    };

    const calculateTotalArea = (item: BoqItem) => (item.width * item.height * item.quantity);
    const calculateTotalCost = (item: BoqItem) => calculateTotalArea(item) * item.pricePerSqFt;

    const grandTotal = items.reduce((total, item) => total + calculateTotalCost(item), 0);

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end p-4 border rounded-lg">
                <div className="md:col-span-2">
                    <label className="text-sm font-medium">Product</label>
                    <Select value={currentItem.productId} onValueChange={(value) => setCurrentItem({...currentItem, productId: value})}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a stone" />
                        </SelectTrigger>
                        <SelectContent>
                            {products.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className="text-sm font-medium">Width (ft)</label>
                    <Input type="number" placeholder="e.g., 5" value={currentItem.width} onChange={(e) => setCurrentItem({...currentItem, width: e.target.value})} />
                </div>
                <div>
                    <label className="text-sm font-medium">Height (ft)</label>
                    <Input type="number" placeholder="e.g., 3" value={currentItem.height} onChange={(e) => setCurrentItem({...currentItem, height: e.target.value})} />
                </div>
                 <div>
                    <label className="text-sm font-medium">Quantity</label>
                    <Input type="number" placeholder="e.g., 10" value={currentItem.quantity} onChange={(e) => setCurrentItem({...currentItem, quantity: e.target.value})} />
                </div>
                <Button onClick={handleAddItem} className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Item
                </Button>
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Dimensions</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Total Area (sq.ft.)</TableHead>
                            <TableHead className="text-right">Total Cost</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center h-24">No items added yet.</TableCell>
                            </TableRow>
                        ) : (
                            items.map(item => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.productName}</TableCell>
                                    <TableCell>{item.width} ft x {item.height} ft</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{calculateTotalArea(item).toFixed(2)}</TableCell>
                                    <TableCell className="text-right">₹{calculateTotalCost(item).toLocaleString('en-IN')}</TableCell>
                                    <TableCell>
                                        <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4} className="font-bold text-lg">Grand Total</TableCell>
                            <TableCell className="text-right font-bold text-lg">₹{grandTotal.toLocaleString('en-IN')}</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
             {items.length > 0 && (
                <div className="flex justify-end">
                    <Button variant="outline" disabled>Export to PDF (Coming Soon)</Button>
                </div>
            )}
        </div>
    );
}
