import { products } from '@/lib/data';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export const metadata = {
    title: 'Technical Specifications',
    description: 'Access detailed technical data for all our materials.'
}

export default function SpecsPage() {
    return (
        <div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-headline mb-8 flex items-center gap-3">
                <FileText className="h-8 w-8" />
                Technical Specifications
            </h1>
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Finish</TableHead>
                            <TableHead>Color</TableHead>
                            <TableHead className="text-right">Price (per sq.ft.)</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell>
                                    <Badge variant="outline">{product.category}</Badge>
                                </TableCell>
                                <TableCell>{product.finish}</TableCell>
                                <TableCell>{product.color}</TableCell>
                                <TableCell className="text-right">₹{product.pricePerSqFt.toLocaleString('en-IN')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}
