'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Calculator } from 'lucide-react';

export function SlabPlanner() {
    const [roomWidth, setRoomWidth] = useState('');
    const [roomLength, setRoomLength] = useState('');
    const [slabWidth, setSlabWidth] = useState('');
    const [slabLength, setSlabLength] = useState('');
    const [result, setResult] = useState<{ slabsNeeded: number; wastage: number } | null>(null);

    const calculateLayout = () => {
        const rw = parseFloat(roomWidth);
        const rl = parseFloat(roomLength);
        const sw = parseFloat(slabWidth);
        const sl = parseFloat(slabLength);

        if (isNaN(rw) || isNaN(rl) || isNaN(sw) || isNaN(sl) || rw <= 0 || rl <= 0 || sw <= 0 || sl <= 0) {
            setResult(null);
            return;
        }

        const roomArea = rw * rl;
        const slabArea = sw * sl;

        // Simple calculation, doesn't account for complex cuts or orientation.
        const slabsAcrossRoomWidth = Math.ceil(rw / sw);
        const slabsAcrossRoomLength = Math.ceil(rl / sl);
        const slabsNeededOption1 = slabsAcrossRoomWidth * slabsAcrossRoomLength;

        const slabsAcrossRoomWidth_rotated = Math.ceil(rw / sl);
        const slabsAcrossRoomLength_rotated = Math.ceil(rl / sw);
        const slabsNeededOption2 = slabsAcrossRoomWidth_rotated * slabsAcrossRoomLength_rotated;

        const slabsNeeded = Math.min(slabsNeededOption1, slabsNeededOption2);

        const totalSlabArea = slabsNeeded * slabArea;
        const wastage = ((totalSlabArea - roomArea) / totalSlabArea) * 100;

        setResult({ slabsNeeded, wastage });
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                    <label className="text-sm font-medium">Room Width (ft)</label>
                    <Input type="number" placeholder="e.g., 10" value={roomWidth} onChange={(e) => setRoomWidth(e.target.value)} />
                </div>
                <div>
                    <label className="text-sm font-medium">Room Length (ft)</label>
                    <Input type="number" placeholder="e.g., 12" value={roomLength} onChange={(e) => setRoomLength(e.target.value)} />
                </div>
                 <div>
                    <label className="text-sm font-medium">Slab Width (ft)</label>
                    <Input type="number" placeholder="e.g., 5" value={slabWidth} onChange={(e) => setSlabWidth(e.target.value)} />
                </div>
                 <div>
                    <label className="text-sm font-medium">Slab Length (ft)</label>
                    <Input type="number" placeholder="e.g., 8" value={slabLength} onChange={(e) => setSlabLength(e.target.value)} />
                </div>
            </div>
            <Button onClick={calculateLayout}>
                <Calculator className="mr-2 h-4 w-4" />
                Calculate Wastage
            </Button>
            {result && (
                 <Alert>
                    <AlertTitle className="flex items-center gap-2"><Calculator /> Calculation Result</AlertTitle>
                    <AlertDescription className="mt-4 text-lg space-y-2">
                        <p>You will need approximately <strong className="text-primary">{result.slabsNeeded}</strong> slabs.</p>
                        <p>Estimated material wastage is around <strong className="text-primary">{result.wastage.toFixed(2)}%</strong>.</p>
                        <p className="text-sm text-muted-foreground pt-2">Note: This is a simplified calculation for estimation purposes only. Actual requirements may vary based on layout, cuts, and pattern matching.</p>
                    </AlertDescription>
                </Alert>
            )}
        </div>
    );
}
