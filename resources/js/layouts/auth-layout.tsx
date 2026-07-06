import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
    description?: string;
    footerContent?: React.ReactNode;
    testimonialAuthor?: string;
    testimonialCompany?: string;
    testimonialQuote?: string;
}

export default function AuthLayout({ children, title, subtitle, description, ...props }: AuthLayoutProps) {
    // Support both subtitle and description for backwards compatibility
    const displaySubtitle = subtitle || description;

    return (
        <AuthLayoutTemplate title={title} subtitle={displaySubtitle} {...props}>
            {children}
        </AuthLayoutTemplate>
    );
}
