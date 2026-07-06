import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import type { FormEvent } from 'react';
import { toast } from 'sonner';

const businessProfileBreadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Business Profile',
        href: '/BusinessProfile',
    },
];

const businessProfileAvatarInitials = 'SM';

function handleBusinessProfileSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    toast.success('Profile saved');
}

export default function BusinessProfilePage() {
    return (
        <AppLayout breadcrumbs={businessProfileBreadcrumbs}>
            <Head title="Business Profile" />
            <form onSubmit={handleBusinessProfileSubmit} className="border-edge m-5 w-full max-w-2xl space-y-5 rounded-xl border p-8">
                <div className="flex items-center gap-4">
                    <div className="bg-accent text-accent-foreground flex size-16 items-center justify-center rounded-full text-xl font-bold">
                        {businessProfileAvatarInitials}
                    </div>
                    <Button type="button" variant="outline" className="rounded-md text-xs font-bold tracking-wider uppercase">
                        Upload logo
                    </Button>
                </div>

                <div>
                    <Label className="text-xs font-bold tracking-wider uppercase">Business name</Label>
                    <Input defaultValue="Savanna Mist" className="mt-1.5 h-11" />
                </div>

                <div>
                    <Label className="text-xs font-bold tracking-wider uppercase">Contact email</Label>
                    <Input defaultValue="hello@savannamist.ke" className="mt-1.5 h-11" />
                </div>

                <div>
                    <Label className="text-xs font-bold tracking-wider uppercase">Phone</Label>
                    <Input defaultValue="+254 712 345 678" className="mt-1.5 h-11" />
                </div>

                <div>
                    <Label className="text-xs font-bold tracking-wider uppercase">Bio</Label>
                    <textarea
                        defaultValue="Cold-pressed skincare from the Rift Valley."
                        className="border-edge bg-background mt-1.5 min-h-[90px] w-full rounded-md border px-3 py-2 text-sm"
                    />
                </div>

                <Button type="submit" className="h-11 rounded-md px-6 text-xs font-bold tracking-wider uppercase">
                    Save changes
                </Button>
            </form>
        </AppLayout>
    );
}
