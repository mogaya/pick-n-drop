import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

type RevenueMonth = {
    month: string;
    value: number;
};

type SalesRecord = {
    id: string;
    date: string;
    productName: string;
    totalAmount: number;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Sales',
        href: '/business/history',
    },
];

const revenueByMonth: RevenueMonth[] = [
    { month: 'Jan', value: 142000 },
    { month: 'Feb', value: 168000 },
    { month: 'Mar', value: 154000 },
    { month: 'Apr', value: 287000 },
    { month: 'May', value: 214000 },
    { month: 'Jun', value: 232000 },
];

const recentSales: SalesRecord[] = [
    { id: 'ORD-1042', date: 'Jun 28', productName: 'Botanical Glow Serum', totalAmount: 2450 },
    { id: 'ORD-1043', date: 'Jun 27', productName: 'Rose Mist', totalAmount: 2200 },
    { id: 'ORD-1044', date: 'Jun 26', productName: 'Charcoal Cleanser', totalAmount: 1800 },
];

function formatCurrency(value: number) {
    return `KSh ${value.toLocaleString('en-KE')}`;
}

export default function SalesHistoryIndex() {
    const highestRevenueMonth = Math.max(...revenueByMonth.map((month) => month.value));
    const totalRevenue = revenueByMonth.reduce((sum, month) => sum + month.value, 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales" />

            <div className="space-y-6 p-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="border-edge bg-background rounded-xl border p-5">
                        <div className="text-muted-foreground text-sm">Last 6 months</div>
                        <div className="mt-2 text-2xl font-semibold">{formatCurrency(totalRevenue)}</div>
                    </div>
                    <div className="border-edge bg-background rounded-xl border p-5">
                        <div className="text-muted-foreground text-sm">Best month</div>
                        <div className="mt-2 text-2xl font-semibold">April</div>
                        <div className="text-accent mt-1 text-sm">{formatCurrency(287000)}</div>
                    </div>
                    <div className="border-edge bg-background rounded-xl border p-5">
                        <div className="text-muted-foreground text-sm">Avg. order value</div>
                        <div className="mt-2 text-2xl font-semibold">{formatCurrency(1850)}</div>
                    </div>
                </div>

                <div className="border-edge bg-background rounded-xl border p-6">
                    <h2 className="mb-6 text-lg font-semibold tracking-tight">Revenue over time</h2>
                    <div className="flex h-56 items-end gap-3">
                        {revenueByMonth.map((month) => (
                            <div key={month.month} className="flex flex-1 flex-col items-center gap-2">
                                <div
                                    className="bg-accent w-full rounded-t-md transition-all"
                                    style={{ height: `${(month.value / highestRevenueMonth) * 100}%` }}
                                />
                                <div className="text-muted-foreground text-xs font-bold tracking-[0.25em] uppercase">{month.month}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="border-edge bg-background overflow-hidden rounded-xl border">
                    <div className="border-edge border-b px-5 py-4">
                        <h2 className="text-lg font-semibold tracking-tight">Recent sales</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-surface text-muted-foreground text-left text-xs tracking-wider uppercase">
                                <tr>
                                    <th className="px-5 py-3 font-semibold">Date</th>
                                    <th className="px-5 py-3 font-semibold">Order</th>
                                    <th className="px-5 py-3 font-semibold">Product</th>
                                    <th className="px-5 py-3 text-right font-semibold">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentSales.map((sale) => (
                                    <tr key={sale.id} className="border-edge border-t">
                                        <td className="text-muted-foreground px-5 py-3">{sale.date}</td>
                                        <td className="px-5 py-3 font-mono text-xs">{sale.id}</td>
                                        <td className="px-5 py-3">{sale.productName}</td>
                                        <td className="px-5 py-3 text-right font-semibold tabular-nums">{formatCurrency(sale.totalAmount)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
