import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';

interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    footerContent?: React.ReactNode;
    testimonialAuthor?: string;
    testimonialCompany?: string;
    testimonialQuote?: string;
}

const defaultTestimonialImageUrl = 'https://picsum.photos/seed/auth-shelfspot/1200/1600';

export default function AuthSimpleLayout({
    children,
    title,
    subtitle,
    footerContent,
    testimonialAuthor,
    testimonialCompany,
    testimonialQuote,
}: AuthLayoutProps) {
    return (
        <div className="grid min-h-screen bg-background lg:grid-cols-2">
            {/* Left Column - Auth Form */}
            <div className="flex flex-col p-8 lg:p-12">
                {/* Logo */}
                <Link href={route('home')} className="flex flex-col items-start gap-2 font-medium">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md">
                        <AppLogoIcon className="size-9 fill-current text-[var(--foreground)] dark:text-white" />
                    </div>
                    <span className="sr-only">Home</span>
                </Link>

                {/* Form Content Area */}
                <div className="flex flex-1 items-center">
                    <div className="w-full max-w-md">
                        <h1 className="text-3xl font-bold tracking-tighter lg:text-4xl">{title}</h1>
                        <p className="mt-2 text-muted-foreground">{subtitle}</p>
                        <div className="mt-8">{children}</div>
                        {footerContent && <div className="mt-6 text-sm text-muted-foreground">{footerContent}</div>}
                    </div>
                </div>

                {/* Back Link */}
                <div className="text-xs text-muted-foreground">
                    <Link href={route('home')} className="hover:text-foreground">
                        ← Back to home
                    </Link>
                </div>
            </div>

            {/* Right Column - Testimonial Section (Hidden on mobile) */}
            <div className="relative hidden overflow-hidden bg-primary text-primary-foreground lg:block">
                <img
                    src={defaultTestimonialImageUrl}
                    alt="Auth background"
                    className="absolute inset-0 size-full object-cover opacity-30 grayscale"
                />
                <div className="relative flex h-full flex-col justify-end p-12">
                    <div className="max-w-md bg-accent/95 p-8">
                        <div className="mb-3 text-xs font-bold uppercase tracking-widest">From the shelves</div>
                        <p className="text-2xl font-medium leading-tight">{testimonialQuote}</p>
                        <div className="mt-4 text-sm text-primary-foreground/80">
                            {testimonialAuthor} — Founder, {testimonialCompany}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
