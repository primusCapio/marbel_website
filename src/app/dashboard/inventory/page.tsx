import { products } from '@/lib/data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Warehouse } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export const metadata = {
    title: 'Inventory Management',
    description: 'Track and manage product stock levels.'
}

const getStockData = (productId: string) => {
    // Dummy data generation
    const seed = productId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const stock = (seed % 200) + 10; // stock between 10 and 210
    let status: 'In Stock' | 'Low Stock' | 'Out of Stock' = 'In Stock';
    if (stock < 50) status = 'Low Stock';
    if (stock < 10) status = 'Out of Stock';
    return { stock, status };
}

export default function InventoryPage() {
    return (
        <div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-headline mb-8 flex items-center gap-3">
                <Warehouse className="h-8 w-8" />
                Inventory Management
            </h1>
            <Card>
                 <CardHeader>
                    <CardTitle>Stock Levels</CardTitle>
                    <CardDescription>Track real-time inventory across all products.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Stock Level</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => {
                                const { stock, status } = getStockData(product.id);
                                return (
                                    <TableRow key={product.id}>
                                        <TableCell className="font-medium">{product.name}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{product.category}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Progress value={stock / 2} className="w-32"/>
                                                <span>{stock} units</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                status === 'In Stock' ? 'success' :
                                                status === 'Low Stock' ? 'secondary' : 'destructive'
                                            }>{status}</Badge>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
