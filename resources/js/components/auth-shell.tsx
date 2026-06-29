import AppLogo from '@/components/app-logo';
import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

type AuthShellProps = {
    title: string;
    subtitle: string;
    children: ReactNode;
    footer: ReactNode;
};

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
    return (
        <div className="bg-background grid min-h-screen lg:grid-cols-2">
            <div className="flex flex-col p-8 lg:p-12">
                <AppLogo />
                <div className="flex flex-1 items-center">
                    <div className="mx-auto w-full max-w-md">
                        <h1 className="text-3xl font-bold tracking-tighter lg:text-4xl">{title}</h1>
                        <p className="text-muted-foreground mt-2">{subtitle}</p>
                        <div className="mt-8">{children}</div>
                        <div className="text-muted-foreground mt-6 text-sm">{footer}</div>
                    </div>
                </div>
                <div className="text-muted-foreground text-xs">
                    <Link href="/" className="hover:text-foreground">
                        ← Back to PickN'Drop
                    </Link>
                </div>
            </div>
            <div className="bg-primary text-primary-foreground relative hidden overflow-hidden lg:block">
                <img
                    src="https://picsum.photos/seed/auth-pickndrop/1200/1600"
                    alt=""
                    className="absolute inset-0 size-full object-cover opacity-30 grayscale"
                />
                <div className="relative flex h-full flex-col justify-end p-12">
                    <div className="bg-accent/95 max-w-md p-8">
                        <div className="mb-3 text-xs font-bold tracking-[0.3em] uppercase">From the shelves</div>
                        <p className="text-2xl leading-tight font-medium">
                            &ldquo;We doubled monthly sales after our first month on a CBD shelf.&rdquo;
                        </p>
                        <div className="text-primary-foreground/80 mt-4 text-sm">Lorna — Founder, Her Naturals</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
