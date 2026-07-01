import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

type OrderItem = {
    id: string;
    clientName: string;
    productName: string;
    fulfillmentMethod: 'delivery' | 'pickup';
    status: 'new' | 'packed' | 'ready' | 'out_for_delivery' | 'delivered';
    totalAmount: number;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Orders',
        href: '/business/orders',
    },
];

const orderItems: OrderItem[] = [
    {
        id: 'ORD-1042',
        clientName: 'Njeri Kamau',
        productName: 'Botanical Glow Serum',
        fulfillmentMethod: 'delivery',
        status: 'packed',
        totalAmount: 2450,
    },
    {
        id: 'ORD-1043',
        clientName: 'Mwangi Otieno',
        productName: 'Rose Mist',
        fulfillmentMethod: 'pickup',
        status: 'ready',
        totalAmount: 2200,
    },
    {
        id: 'ORD-1044',
        clientName: 'Amina Yusuf',
        productName: 'Charcoal Cleanser',
        fulfillmentMethod: 'delivery',
        status: 'out_for_delivery',
        totalAmount: 1800,
    },
    {
        id: 'ORD-1045',
        clientName: 'Salma Noor',
        productName: 'Botanical Glow Serum',
        fulfillmentMethod: 'pickup',
        status: 'delivered',
        totalAmount: 2450,
    },
];

const orderStatusLabels: Record<OrderItem['status'], string> = {
    new: 'New',
    packed: 'Packed',
    ready: 'Ready for pickup',
    out_for_delivery: 'Out for delivery',
    delivered: 'Delivered',
};

function formatCurrency(value: number) {
    return `KSh ${value.toLocaleString('en-KE')}`;
}

function getFulfillmentLabel(method: OrderItem['fulfillmentMethod']) {
    return method === 'delivery' ? 'Delivery' : 'Pickup';
}

export default function OrdersIndex() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Orders" />

            <div className="border-edge bg-background m-5 overflow-hidden rounded-xl border">
                <div className="border-edge border-b px-5 py-4">
                    <h2 className="text-lg font-semibold tracking-tight">Recent orders</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-surface text-muted-foreground text-left text-xs tracking-wider uppercase">
                            <tr>
                                <th className="px-5 py-3 font-semibold">Order</th>
                                <th className="px-5 py-3 font-semibold">Client</th>
                                <th className="px-5 py-3 font-semibold">Product</th>
                                <th className="px-5 py-3 font-semibold">Fulfillment</th>
                                <th className="px-5 py-3 font-semibold">Status</th>
                                <th className="px-5 py-3 text-right font-semibold">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderItems.map((order) => (
                                <tr key={order.id} className="border-edge border-t">
                                    <td className="px-5 py-3 font-mono text-xs">{order.id}</td>
                                    <td className="px-5 py-3">{order.clientName}</td>
                                    <td className="px-5 py-3">{order.productName}</td>
                                    <td className="px-5 py-3 capitalize">{getFulfillmentLabel(order.fulfillmentMethod)}</td>
                                    <td className="px-5 py-3">
                                        <span className="bg-accent/10 text-accent rounded-full px-2 py-1 text-[10px] font-bold tracking-[0.25em] uppercase">
                                            {orderStatusLabels[order.status]}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-right font-semibold tabular-nums">{formatCurrency(order.totalAmount)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
