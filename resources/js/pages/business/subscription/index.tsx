import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Check } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Subscription',
        href: '/business/subscription',
    },
];

const planBenefits = ['2 shelf slots assigned', 'Unlimited products', 'Pickup + delivery enabled', 'Sales analytics', 'Priority support'];

function formatCurrency(value: number) {
    return `KSh ${value.toLocaleString('en-KE')}`;
}

export default function SubscriptionIndex() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Subscription" />

            <div className="space-y-6 p-4">
                <div className="border-accent bg-accent/10 rounded-xl border-2 p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                            <div className="text-accent text-xs font-bold tracking-[0.25em] uppercase">Current plan</div>
                            <div className="mt-2 text-3xl font-bold tracking-tighter">Pro — {formatCurrency(7500)}/month</div>
                            <p className="text-muted-foreground mt-2">Renews on May 15, 2026</p>
                        </div>

                        <div className="flex gap-3">
                            <Button variant="outline" className="rounded-md text-xs font-bold tracking-wider uppercase">
                                Downgrade
                            </Button>
                            <Button className="bg-accent hover:bg-accent/90 rounded-md text-xs font-bold tracking-wider uppercase">
                                Upgrade to Enterprise
                            </Button>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
                        {planBenefits.map((benefit) => (
                            <div key={benefit} className="flex items-center gap-2 text-sm">
                                <Check className="text-accent size-4" />
                                <span>{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
