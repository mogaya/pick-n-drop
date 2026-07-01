import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { type ChangeEvent, type FormEvent, useState } from 'react';

type StockItem = {
    id: string;
    name: string;
    shelf: string;
    stock: number;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stock Levels',
        href: '/business/stock',
    },
];

const stockItems: StockItem[] = [
    { id: 'prod-001', name: 'Savanna Mist Hand Soap', shelf: 'B-12', stock: 6 },
    { id: 'prod-002', name: 'Savanna Mist Face Cream', shelf: 'B-14', stock: 18 },
    { id: 'prod-003', name: 'Savanna Mist Body Oil', shelf: 'B-18', stock: 9 },
    { id: 'prod-004', name: 'Savanna Mist Lip Balm', shelf: 'B-20', stock: 24 },
    { id: 'prod-005', name: 'Savanna Mist Room Spray', shelf: 'B-22', stock: 4 },
];

function getStockStatus(stock: number) {
    return stock < 10 ? 'Low' : 'Healthy';
}

export default function StockIndex() {
    const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});
    const [restockDate, setRestockDate] = useState('');
    const [notes, setNotes] = useState('');
    const [message, setMessage] = useState('');

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { checked, value } = event.target;
        setSelectedItems((current) => ({ ...current, [value]: checked }));
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const selectedCount = Object.values(selectedItems).filter(Boolean).length;

        if (selectedCount === 0) {
            setMessage('Select at least one product to request restock.');
            return;
        }

        setMessage(`Restock request submitted for ${selectedCount} products.`);
        setSelectedItems({});
        setRestockDate('');
        setNotes('');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Stock" />

            <div className="grid grid-cols-1 gap-6 p-5 lg:grid-cols-3">
                <div className="border-edge bg-background rounded-xl border lg:col-span-2">
                    <div className="border-edge border-b px-5 py-4">
                        <h2 className="text-lg font-semibold tracking-tight">Current stock</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-surface text-muted-foreground text-xs tracking-wider uppercase">
                                <tr>
                                    <th className="px-5 py-3 text-left font-semibold">Product</th>
                                    <th className="px-5 py-3 text-left font-semibold">Shelf</th>
                                    <th className="px-5 py-3 text-right font-semibold">Stock</th>
                                    <th className="px-5 py-3 text-left font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stockItems.map((item) => (
                                    <tr key={item.id} className="border-edge border-t">
                                        <td className="px-5 py-3 font-semibold">{item.name}</td>
                                        <td className="px-5 py-3 font-mono text-xs">{item.shelf}</td>
                                        <td className="px-5 py-3 text-right tabular-nums">{item.stock}</td>
                                        <td className="px-5 py-3">
                                            <span
                                                className={`rounded-full px-2 py-1 text-[10px] font-bold tracking-widest uppercase ${
                                                    item.stock < 10 ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                                                }`}
                                            >
                                                {getStockStatus(item.stock)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="border-edge bg-background h-fit space-y-4 rounded-xl border p-5">
                    <h2 className="text-lg font-semibold tracking-tight">Request a restock</h2>

                    {message ? (
                        <div className="border-muted-foreground/20 bg-muted/10 text-muted-foreground rounded-lg border px-4 py-3 text-sm">
                            {message}
                        </div>
                    ) : null}

                    <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
                        {stockItems.map((item) => (
                            <label key={item.id} className="hover:bg-muted flex cursor-pointer items-center gap-3 rounded-md p-2 text-sm">
                                <input
                                    type="checkbox"
                                    value={item.id}
                                    checked={!!selectedItems[item.id]}
                                    onChange={handleCheckboxChange}
                                    className="accent-accent"
                                />
                                <span className="flex-1 truncate">{item.name}</span>
                                <span className="text-muted-foreground text-xs">{item.stock}</span>
                            </label>
                        ))}
                    </div>

                    <div>
                        <Label htmlFor="restock-date" className="text-xs font-bold tracking-wider uppercase">
                            Drop-off date
                        </Label>
                        <Input
                            id="restock-date"
                            type="date"
                            value={restockDate}
                            onChange={(event) => setRestockDate(event.target.value)}
                            className="mt-1.5 h-11"
                        />
                    </div>

                    <div>
                        <Label htmlFor="restock-notes" className="text-xs font-bold tracking-wider uppercase">
                            Notes
                        </Label>
                        <textarea
                            id="restock-notes"
                            value={notes}
                            onChange={(event) => setNotes(event.target.value)}
                            className="border-edge bg-background mt-1.5 min-h-[80px] w-full rounded-md border px-3 py-2 text-sm"
                        />
                    </div>

                    <Button type="submit" className="h-11 w-full rounded-md text-xs font-bold tracking-wider uppercase">
                        Submit request
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
