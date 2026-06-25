import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

type AppLogoProps = {
    className?: string;
    pickTextColor?: string;
    nDropTextColor?: string;
};

export default function AppLogo({ className, pickTextColor = 'text-foreground', nDropTextColor = 'text-accent' }: AppLogoProps) {
    return (
        <Link href="/" className={cn('text-xl font-bold tracking-tighter', className)}>
            <span className={pickTextColor}>Pick</span>
            <span className={nDropTextColor}>N'Drop</span>
        </Link>
    );
}
