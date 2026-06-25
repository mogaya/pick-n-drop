import AppLogo from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { ShoppingBag } from 'lucide-react';
import type { PropsWithChildren } from 'react';
import { CartProvider, useCart } from './cart-context';

export function AppNav({ showCart = false }: { showCart?: boolean }) {
    const cart = useCart();

    return (
        <nav className="border-edge bg-background/80 sticky top-0 z-40 border-b backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-6 md:h-20 md:px-8">
                <div className="flex items-center gap-8 md:gap-12">
                    <AppLogo />
                    <div className="text-muted-foreground hidden gap-8 text-xs font-semibold tracking-widest uppercase md:flex">
                        <Link href="/#how" className="hover:text-foreground transition-colors">
                            How it works
                        </Link>
                        <Link href="/#pricing" className="hover:text-foreground transition-colors">
                            Pricing
                        </Link>
                        <Link href="/products" className="hover:text-foreground transition-colors">
                            Browse
                        </Link>
                        <Link href="/#business" className="hover:text-foreground transition-colors">
                            For businesses
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-3 md:gap-5">
                    {showCart && (
                        <button
                            type="button"
                            onClick={() => cart.setOpen(true)}
                            className="hover:bg-muted relative rounded-md p-2 transition-colors"
                            aria-label="Open cart"
                        >
                            <ShoppingBag className="size-5" />
                            {cart.count > 0 && (
                                <span className="bg-accent text-accent-foreground absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full text-[10px] font-bold">
                                    {cart.count}
                                </span>
                            )}
                        </button>
                    )}

                    <Link href={route('login')} className="hidden text-sm font-semibold sm:inline">
                        Sign in
                    </Link>
                    <Button asChild className="h-10 rounded-md px-5 text-xs font-bold tracking-wider uppercase">
                        <Link href={route('register')}>Get started</Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}

export function AppFooter() {
    return (
        <footer className="bg-primary text-primary-foreground">
            <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-8">
                <div className="flex flex-col justify-between gap-12 md:flex-row">
                    <div className="max-w-xs">
                        <AppLogo pickTextColor="background" />
                        <p className="text-primary-foreground/60 mt-6 text-sm leading-relaxed">
                            The physical touchpoint for Nairobi&apos;s digital-first brands.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
                        <div className="flex flex-col gap-4">
                            <div className="text-accent text-xs font-bold tracking-widest uppercase">Platform</div>
                            <Link href="/products" className="text-primary-foreground/70 hover:text-primary-foreground text-sm">
                                Browse products
                            </Link>
                            <Link href={route('register')} className="text-primary-foreground/70 hover:text-primary-foreground text-sm">
                                List business
                            </Link>
                            <Link href={route('login')} className="text-primary-foreground/70 hover:text-primary-foreground text-sm">
                                Sign in
                            </Link>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="text-accent text-xs font-bold tracking-widest uppercase">Company</div>
                            <a className="text-primary-foreground/70 hover:text-primary-foreground text-sm">About</a>
                            <a className="text-primary-foreground/70 hover:text-primary-foreground text-sm">Privacy</a>
                            <a className="text-primary-foreground/70 hover:text-primary-foreground text-sm">Terms</a>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="text-accent text-xs font-bold tracking-widest uppercase">Contact</div>
                            <a className="text-primary-foreground/70 text-sm">Nairobi CBD</a>
                            <a className="text-primary-foreground/70 text-sm">hello@shelfspot.ke</a>
                        </div>
                    </div>
                </div>
                <div className="border-primary-foreground/10 text-primary-foreground/40 mt-16 border-t pt-8 text-xs">
                    © 2026 ShelfSpot Technologies Ltd. Nairobi, Kenya.
                </div>
            </div>
        </footer>
    );
}

export default function Layout({ children }: PropsWithChildren) {
    return (
        <CartProvider>
            <Head title="PickNDrop" />

            <div className="flex min-h-screen flex-col">
                <AppNav />
                <main className="flex-1">{children}</main>
                <AppFooter />
            </div>
        </CartProvider>
    );
}
