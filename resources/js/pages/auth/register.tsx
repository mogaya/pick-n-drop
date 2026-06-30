import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import { AuthShell } from '@/components/auth-shell';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

type Role = 'business' | 'client';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [role, setRole] = useState<Role>('business');
    const [phone, setPhone] = useState('');
    const [businessName, setBusinessName] = useState('');
    const [category, setCategory] = useState('Skincare');
    const [address, setAddress] = useState('');

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />
            <AuthShell
                title="Create your account"
                subtitle={role === 'business' ? 'List your business and get a CBD shelf.' : "Shop products from Nairobi's best brands."}
                footer={
                    <>
                        Already a member?{' '}
                        <Link href={route('login')} className="text-accent font-semibold">
                            Sign in
                        </Link>
                    </>
                }
            >
                <div className="mb-6 grid grid-cols-2 gap-2">
                    {(['business', 'client'] as const).map((option) => (
                        <button
                            key={option}
                            type="button"
                            onClick={() => setRole(option)}
                            className={`h-10 rounded-md border text-xs font-bold tracking-wider uppercase ${
                                role === option ? 'border-foreground bg-foreground text-background' : 'border-border hover:border-foreground'
                            }`}
                        >
                            {option === 'business' ? "I'm a business" : "I'm a shopper"}
                        </button>
                    ))}
                </div>

                <form className="space-y-4" onSubmit={submit}>
                    <div>
                        <Label htmlFor="name" className="text-xs font-bold tracking-wider uppercase">
                            Full name
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Full name"
                            className="mt-1.5 h-11"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    {role === 'business' && (
                        <>
                            <div>
                                <Label htmlFor="businessName" className="text-xs font-bold tracking-wider uppercase">
                                    Business name
                                </Label>
                                <Input
                                    id="businessName"
                                    type="text"
                                    value={businessName}
                                    onChange={(e) => setBusinessName(e.target.value)}
                                    disabled={processing}
                                    placeholder="Your business name"
                                    className="mt-1.5 h-11"
                                />
                            </div>
                            <div>
                                <Label htmlFor="category" className="text-xs font-bold tracking-wider uppercase">
                                    Product category
                                </Label>
                                <select
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    disabled={processing}
                                    className="border-input bg-background mt-1.5 h-11 w-full rounded-md border px-3 text-sm"
                                >
                                    {['Skincare', 'Haircare', 'Fashion', 'Food', 'Electronics', 'Home'].map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </>
                    )}

                    <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="email" className="text-xs font-bold tracking-wider uppercase">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                tabIndex={2}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                                placeholder="email@example.com"
                                className="mt-1.5 h-11"
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div>
                            <Label htmlFor="phone" className="text-xs font-bold tracking-wider uppercase">
                                Phone
                            </Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                disabled={processing}
                                placeholder="+254..."
                                className="mt-1.5 h-11"
                            />
                        </div>
                    </div>

                    {role === 'client' && (
                        <div>
                            <Label htmlFor="address" className="text-xs font-bold tracking-wider uppercase">
                                Delivery address (optional)
                            </Label>
                            <Input
                                id="address"
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                disabled={processing}
                                placeholder="Where should we deliver?"
                                className="mt-1.5 h-11"
                            />
                        </div>
                    )}

                    <div>
                        <Label htmlFor="password" className="text-xs font-bold tracking-wider uppercase">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Password"
                            className="mt-1.5 h-11"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div>
                        <Label htmlFor="password_confirmation" className="text-xs font-bold tracking-wider uppercase">
                            Confirm password
                        </Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirm password"
                            className="mt-1.5 h-11"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button
                        type="submit"
                        className="h-12 w-full rounded-md text-xs font-bold tracking-wider uppercase"
                        tabIndex={5}
                        disabled={processing}
                    >
                        {processing ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : null}
                        Create account
                    </Button>
                </form>
            </AuthShell>
        </>
    );
}
