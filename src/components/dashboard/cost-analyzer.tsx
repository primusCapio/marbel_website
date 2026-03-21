'use client';

import { useState, useMemo } from 'react';
import { Pie, PieChart, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function CostAnalyzer() {
    const [materialCost, setMaterialCost] = useState('');
    const [transportCost, setTransportCost] = useState('');
    const [installationCost, setInstallationCost] = useState('');
    const [otherCost, setOtherCost] = useState('');

    const chartData = useMemo(() => {
        const data = [];
        if (parseFloat(materialCost) > 0) data.push({ name: 'Material', value: parseFloat(materialCost) });
        if (parseFloat(transportCost) > 0) data.push({ name: 'Transport', value: parseFloat(transportCost) });
        if (parseFloat(installationCost) > 0) data.push({ name: 'Installation', value: parseFloat(installationCost) });
        if (parseFloat(otherCost) > 0) data.push({ name: 'Other', value: parseFloat(otherCost) });
        return data;
    }, [materialCost, transportCost, installationCost, otherCost]);
    
    const totalCost = chartData.reduce((acc, entry) => acc + entry.value, 0);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
                <div>
                    <label className="text-sm font-medium">Total Material Cost (₹)</label>
                    <Input type="number" placeholder="e.g., 150000" value={materialCost} onChange={(e) => setMaterialCost(e.target.value)} />
                </div>
                <div>
                    <label className="text-sm font-medium">Total Transport Cost (₹)</label>
                    <Input type="number" placeholder="e.g., 10000" value={transportCost} onChange={(e) => setTransportCost(e.target.value)} />
                </div>
                 <div>
                    <label className="text-sm font-medium">Total Installation Cost (₹)</label>
                    <Input type="number" placeholder="e.g., 30000" value={installationCost} onChange={(e) => setInstallationCost(e.target.value)} />
                </div>
                 <div>
                    <label className="text-sm font-medium">Other Miscellaneous Costs (₹)</label>
                    <Input type="number" placeholder="e.g., 5000" value={otherCost} onChange={(e) => setOtherCost(e.target.value)} />
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Cost Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                    {totalCost > 0 ? (
                        <div className="space-y-4">
                            <div className="h-64 w-full">
                                <ResponsiveContainer>
                                    <PieChart>
                                        <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                                             {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip formatter={(value: number) => `₹${value.toLocaleString('en-IN')}`} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="text-center text-2xl font-bold">
                                Total Project Cost: ₹{totalCost.toLocaleString('en-IN')}
                            </div>
                        </div>

                    ) : (
                        <div className="text-center text-muted-foreground h-64 flex items-center justify-center">
                            Enter costs to see the breakdown.
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
