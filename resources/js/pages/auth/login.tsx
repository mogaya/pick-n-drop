import { AuthShell } from '@/components/auth-shell';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

type LoginForm = {
    email: string;
    password: string;
};

type LoginRole = 'client' | 'business' | 'admin';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

const roles: LoginRole[] = ['client', 'business', 'admin'];

export default function Login({ status, canResetPassword }: LoginProps) {
    const [role, setRole] = useState<LoginRole>('client');
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthShell
            title="Welcome back"
            subtitle="Sign in to your PickN'Drop account."
            footer={
                <>
                    Don&apos;t have an account?{' '}
                    <TextLink href={route('register')} className="text-accent font-semibold no-underline">
                        Create one
                    </TextLink>
                </>
            }
        >
            <Head title="Sign in" />

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}

            <div className="mb-6 grid grid-cols-3 gap-2">
                {roles.map((r) => (
                    <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={`h-10 rounded-md border text-xs font-bold tracking-wider uppercase ${
                            role === r ? 'bg-foreground text-background border-foreground' : 'border-edge hover:border-foreground'
                        }`}
                    >
                        {r}
                    </button>
                ))}
            </div>

            <form onSubmit={submit} className="space-y-4">
                <div>
                    <Label htmlFor="email" className="text-xs font-bold tracking-wider uppercase">
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        autoFocus
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="mt-1.5 h-11"
                    />
                    <InputError message={errors.email} />
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-xs font-bold tracking-wider uppercase">
                            Password
                        </Label>
                        {canResetPassword && (
                            <TextLink
                                href={route('password.request')}
                                className="text-accent text-xs font-semibold no-underline"
                            >
                                Forgot?
                            </TextLink>
                        )}
                    </div>
                    <Input
                        id="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="mt-1.5 h-11"
                    />
                    <InputError message={errors.password} />
                </div>

                <Button
                    type="submit"
                    className="h-12 w-full rounded-md text-xs font-bold tracking-wider uppercase"
                    disabled={processing}
                >
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Sign in
                </Button>
            </form>
        </AuthShell>
    );
}
