import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Boxes, ChartColumn, CreditCard, FileText, LayoutGrid, Package, ShoppingCart, Truck } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/business/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'My products',
        url: '/business/products',
        icon: Package,
    },

    {
        title: 'Stock levels',
        url: '/business/stock',
        icon: Boxes,
    },

    {
        title: 'Orders',
        url: '/business/orders',
        icon: ShoppingCart,
    },

    {
        title: 'Delivery requests',
        url: '/business/deliveries',
        icon: Truck,
    },

    {
        title: 'Sales history',
        url: '/business/history',
        icon: ChartColumn,
    },

    {
        title: 'Subscription',
        url: '/business/subscription',
        icon: CreditCard,
    },

    {
        title: 'Invoices',
        url: '/business/invoices',
        icon: FileText,
    },

    {
        title: 'Profile settings',
        url: '/business/profile',
        icon: FileText,
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
