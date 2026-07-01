import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Truck } from 'lucide-react';

type DeliveryItem = {
    id: string;
    clientName: string;
    productName: string;
    status: string;
    totalAmount: number;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Deliveries',
        href: '/business/deliveries',
    },
];

const deliveryItems: DeliveryItem[] = [
    {
        id: 'ORD-1042',
        clientName: 'Njeri Kamau',
        productName: 'Botanical Glow Serum',
        status: 'packed',
        totalAmount: 2450,
    },
    {
        id: 'ORD-1044',
        clientName: 'Amina Yusuf',
        productName: 'Charcoal Cleanser',
        status: 'out_for_delivery',
        totalAmount: 1800,
    },
];

function formatCurrency(value: number) {
    return `KSh ${value.toLocaleString('en-KE')}`;
}

function DeliveryList() {
    const deliveryRequests = deliveryItems;

    if (deliveryRequests.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {deliveryRequests.map((delivery) => (
                <div key={delivery.id} className="rounded-xl border border-edge p-5">
                    <div className="flex items-center justify-between">
                        <div className="font-mono text-xs">{delivery.id}</div>
                        <span className="rounded-full bg-accent/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
                            {delivery.status.replace(/_/g, ' ')}
                        </span>
                    </div>
                    <div className="mt-3 font-semibold">{delivery.productName}</div>
                    <div className="mt-1 text-sm text-muted-foreground">For {delivery.clientName}</div>
                    <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="font-bold tabular-nums text-accent">{formatCurrency(delivery.totalAmount)}</span>
                        <button type="button" className="rounded-md border border-edge px-3 py-1.5 text-xs font-bold uppercase tracking-wider hover:bg-muted">
                            Track
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

function EmptyState() {
    return (
        <div className="rounded-xl border border-dashed border-edge p-16 text-center">
            <Truck className="mx-auto mb-4 size-8 text-muted-foreground" />
            <div className="font-semibold">No delivery requests yet</div>
            <p className="mt-1 text-sm text-muted-foreground">Delivery orders will show up here.</p>
        </div>
    );
}

export default function DeliveriesIndex() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Deliveries" />
            <div className="p-4">
                <DeliveryList />
            </div>
        </AppLayout>
    );
}
