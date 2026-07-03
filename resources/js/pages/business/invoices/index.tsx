import AppLayout from '@/layouts/app-layout';
import { formatKsh } from '@/lib/format';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Download } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Invoices',
        href: '/business/invoices',
    },
];

const invoiceRecords = [
    {
        id: 'INV-2026-04',
        period: 'April 2026',
        amount: 7500,
        status: 'paid',
        date: '2026-04-15',
    },
    {
        id: 'INV-2026-03',
        period: 'March 2026',
        amount: 7500,
        status: 'paid',
        date: '2026-03-15',
    },
    {
        id: 'INV-2026-02',
        period: 'February 2026',
        amount: 7500,
        status: 'paid',
        date: '2026-02-15',
    },
];

export default function BusinessInvoicesPage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invoices" />
            <div className="border-edge m-5 overflow-hidden rounded-xl border">
                <table className="w-full text-sm">
                    <thead className="bg-surface text-muted-foreground text-xs tracking-wider uppercase">
                        <tr>
                            <th className="px-5 py-3 text-left font-semibold">Invoice</th>
                            <th className="px-5 py-3 text-left font-semibold">Period</th>
                            <th className="px-5 py-3 text-left font-semibold">Date</th>
                            <th className="px-5 py-3 text-left font-semibold">Status</th>
                            <th className="px-5 py-3 text-right font-semibold">Amount</th>
                            <th className="px-5 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceRecords.map((invoice) => (
                            <tr key={invoice.id} className="border-edge border-t">
                                <td className="px-5 py-3 font-mono text-xs">{invoice.id}</td>
                                <td className="px-5 py-3">{invoice.period}</td>
                                <td className="text-muted-foreground px-5 py-3">{invoice.date}</td>
                                <td className="px-5 py-3">
                                    <span className="bg-success/10 text-success rounded-full px-2 py-1 text-[10px] font-bold tracking-widest uppercase">
                                        {invoice.status}
                                    </span>
                                </td>
                                <td className="px-5 py-3 text-right font-semibold tabular-nums">{formatKsh(invoice.amount)}</td>
                                <td className="px-5 py-3 text-right">
                                    <button className="hover:bg-muted rounded-md p-2" type="button">
                                        <Download className="text-muted-foreground size-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
