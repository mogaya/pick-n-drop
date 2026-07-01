import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { AlertCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type ProductItem = {
    id: number;
    name: string;
    stock: number;
    shelf: string;
};

type OrderItem = {
    id: string;
    product: string;
    status: string;
    total: number;
};

const products: ProductItem[] = [
    { id: 1, name: 'Glow Serum', stock: 8, shelf: 'A-104' },
    { id: 2, name: 'Charcoal Cleanser', stock: 14, shelf: 'A-106' },
    { id: 3, name: 'Rose Mist', stock: 21, shelf: 'B-201' },
];

const orders: OrderItem[] = [
    { id: 'ORD-104', product: 'Glow Serum', status: 'ready', total: 3200 },
    { id: 'ORD-105', product: 'Charcoal Cleanser', status: 'packed', total: 4800 },
    { id: 'ORD-106', product: 'Rose Mist', status: 'out_for_delivery', total: 2400 },
];

const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
const lowStock = products.filter((product) => product.stock < 10);
const revenue = 287000;

function formatKsh(value: number) {
    return `KSh ${value.toLocaleString('en-KE')}`;
}

function StatusPill({ status }: { status: string }) {
    const tone =
        status === 'delivered'
            ? 'bg-emerald-500/10 text-emerald-600'
            : status === 'ready'
              ? 'bg-accent/10 text-accent'
              : status === 'out_for_delivery'
                ? 'bg-amber-500/10 text-amber-600'
                : 'bg-muted text-foreground';

    const label =
        status === 'delivered'
            ? 'Delivered'
            : status === 'ready'
              ? 'Ready'
              : status === 'out_for_delivery'
                ? 'Out for delivery'
                : status === 'packed'
                  ? 'Packed'
                  : 'New';

    return <span className={`rounded-full px-2 py-1 text-[10px] font-bold tracking-[0.3em] uppercase ${tone}`}>{label}</span>;
}

function ShelfBar({ label, filled }: { label: string; filled: number }) {
    return (
        <div className="mb-3 last:mb-0">
            <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="font-semibold">{label}</span>
                <span className="text-muted-foreground tabular-nums">{filled}%</span>
            </div>
            <div className="bg-muted h-2 overflow-hidden rounded-full">
                <div className="bg-accent h-full rounded-full" style={{ width: `${filled}%` }} />
            </div>
        </div>
    );
}

export default function index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="space-y-8 p-4">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="border-sidebar-border/70 bg-background rounded-xl border p-5">
                        <div className="text-muted-foreground text-xs font-semibold tracking-[0.3em] uppercase">Products listed</div>
                        <div className="mt-3 text-3xl font-semibold tracking-tight">{products.length}</div>
                        <div className="text-muted-foreground mt-2 text-sm">Visible on shelf</div>
                    </div>
                    <div className="border-sidebar-border/70 bg-background rounded-xl border p-5">
                        <div className="text-muted-foreground text-xs font-semibold tracking-[0.3em] uppercase">Units in stock</div>
                        <div className="mt-3 text-3xl font-semibold tracking-tight">{totalStock}</div>
                        <div className="text-muted-foreground mt-2 text-sm">Across all products</div>
                    </div>
                    <div className="border-sidebar-border/70 bg-background rounded-xl border p-5">
                        <div className="text-muted-foreground text-xs font-semibold tracking-[0.3em] uppercase">Orders this week</div>
                        <div className="mt-3 text-3xl font-semibold tracking-tight">12</div>
                        <div className="text-muted-foreground mt-2 text-sm">+3 vs last week</div>
                    </div>
                    <div className="border-sidebar-border/70 bg-background rounded-xl border p-5">
                        <div className="text-muted-foreground text-xs font-semibold tracking-[0.3em] uppercase">Revenue this month</div>
                        <div className="text-accent mt-3 text-3xl font-semibold tracking-tight">{formatKsh(revenue)}</div>
                        <div className="text-muted-foreground mt-2 text-sm">+18% vs last month</div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="border-sidebar-border/70 bg-background overflow-hidden rounded-xl border lg:col-span-2">
                        <div className="border-sidebar-border/70 flex items-center justify-between border-b p-5">
                            <h2 className="text-lg font-semibold tracking-tight">Recent orders</h2>
                            <Button asChild variant="outline" className="h-9 rounded-md text-[11px] font-bold tracking-[0.25em] uppercase">
                                <Link href="/business/orders">View all</Link>
                            </Button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead className="bg-muted/70 text-muted-foreground text-left text-[11px] font-semibold tracking-[0.3em] uppercase">
                                    <tr>
                                        <th className="px-5 py-3">Order</th>
                                        <th className="px-5 py-3">Product</th>
                                        <th className="px-5 py-3">Status</th>
                                        <th className="px-5 py-3 text-right">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id} className="border-sidebar-border/70 border-t">
                                            <td className="px-5 py-4 font-mono text-xs">{order.id}</td>
                                            <td className="px-5 py-4">{order.product}</td>
                                            <td className="px-5 py-4">
                                                <StatusPill status={order.status} />
                                            </td>
                                            <td className="px-5 py-4 text-right font-semibold tabular-nums">{formatKsh(order.total)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="border-sidebar-border/70 bg-background rounded-xl border p-5">
                            <div className="mb-4 flex items-center gap-2">
                                <AlertCircle className="size-4 text-amber-500" />
                                <h2 className="text-lg font-semibold tracking-tight">Low stock alerts</h2>
                            </div>
                            {lowStock.length === 0 ? (
                                <p className="text-muted-foreground text-sm">All products are well stocked.</p>
                            ) : (
                                <ul className="space-y-3">
                                    {lowStock.map((product) => (
                                        <li key={product.id} className="flex items-center justify-between text-sm">
                                            <div className="min-w-0">
                                                <div className="truncate font-semibold">{product.name}</div>
                                                <div className="text-muted-foreground text-xs">Shelf {product.shelf}</div>
                                            </div>
                                            <span className="ml-3 shrink-0 font-semibold text-amber-600">{product.stock} left</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="border-sidebar-border/70 bg-background rounded-xl border p-5">
                            <h2 className="mb-4 text-lg font-semibold tracking-tight">Shelf capacity</h2>
                            <ShelfBar label="Shelf A-104" filled={70} />
                            <ShelfBar label="Shelf A-106" filled={45} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
