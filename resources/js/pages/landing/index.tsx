import { Button } from '@/components/ui/button';
import { CartProvider } from '@/layouts/cart-context';
import { AppFooter, AppNav } from '@/layouts/layout';
import { formatKsh } from '@/lib/format';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Check } from 'lucide-react';

export default function index() {
    return (
        <CartProvider>
            <Head title="PickN'Drop — Your products on a shelf in Nairobi CBD">
                <meta name="description" content="Rent shelf space in Nairobi CBD. Pickup or delivery. From KSh 3,500/month." />
            </Head>

            <div className="bg-background text-foreground min-h-screen">
                <AppNav />

                {/* Hero */}
                <section className="border-edge border-b">
                    <div className="mx-auto grid max-w-[1440px] grid-cols-12">
                        <div className="border-edge col-span-12 px-6 py-16 md:px-12 lg:col-span-7 lg:border-r lg:px-16 lg:py-24">
                            <div className="border-accent/30 bg-accent-soft mb-8 inline-flex items-center gap-3 rounded-full border py-1.5 pr-4 pl-2">
                                <span className="bg-accent size-2 animate-pulse rounded-full" />
                                <span className="text-accent text-[11px] font-bold tracking-[0.2em] uppercase">Now open in Nairobi CBD</span>
                            </div>
                            <h1 className="max-w-[14ch] text-5xl leading-[0.9] font-bold tracking-tighter sm:text-6xl lg:text-8xl">
                                Your products on a shelf.
                            </h1>
                            <p className="text-muted-foreground mt-8 max-w-[48ch] text-lg leading-relaxed lg:text-xl">
                                PickN'Drop gives online businesses a physical shelf in the CBD. Clients browse, pick up or get it delivered — you just
                                restock.
                            </p>
                            <div className="mt-10 flex flex-wrap gap-4">
                                <Button asChild size="lg" className="h-14 rounded-md px-8 text-base font-bold tracking-wider uppercase">
                                    <Link href={route('register')}>List your business</Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="border-foreground hover:bg-foreground hover:text-background h-14 rounded-md border-2 px-8 text-base font-bold tracking-wider uppercase"
                                >
                                    <Link href="/products">Browse products</Link>
                                </Button>
                            </div>
                            <div className="border-edge mt-16 grid grid-cols-3 border-t pt-8">
                                {[
                                    { v: '1.2k+', l: 'Daily Pickups' },
                                    { v: '48', l: 'Active Merchants' },
                                    { v: '04', l: 'CBD Hubs' },
                                ].map((s) => (
                                    <div key={s.l}>
                                        <div className="text-2xl font-bold tracking-tighter tabular-nums md:text-3xl">{s.v}</div>
                                        <div className="text-muted-foreground mt-1 text-[10px] font-bold tracking-widest uppercase md:text-xs">
                                            {s.l}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-primary text-primary-foreground relative col-span-12 min-h-[400px] overflow-hidden lg:col-span-5">
                            <img
                                src="https://picsum.photos/seed/PickN'Drop-hero/800/1100"
                                alt="Curated shelves in Nairobi CBD"
                                className="absolute inset-0 size-full object-cover opacity-40 grayscale"
                                loading="eager"
                            />
                            <div className="relative flex h-full flex-col justify-between p-8 lg:p-10">
                                <div className="flex justify-end">
                                    <div className="border-primary-foreground/20 size-32 border p-4">
                                        <div className="text-[10px] font-bold tracking-widest uppercase opacity-60">Hub 01</div>
                                        <div className="mt-2 text-xl leading-tight font-medium">Kenyatta Ave.</div>
                                    </div>
                                </div>
                                <div className="bg-accent/95 p-6 backdrop-blur-sm lg:p-8">
                                    <div className="mb-3 text-xs font-bold tracking-[0.3em] uppercase">The Handover</div>
                                    <div className="text-xl leading-tight font-medium lg:text-2xl">
                                        Connecting Instagram storefronts to the concrete hustle of the CBD.
                                    </div>
                                    <div className="mt-6 flex items-center gap-4">
                                        <div className="bg-primary-foreground/30 h-px flex-1" />
                                        <div className="text-[10px] font-bold tracking-widest uppercase">Est 2026</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="border-edge mx-auto max-w-[1440px] border-b">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {[
                            {
                                n: '01',
                                t: 'Shelf space in the CBD',
                                d: 'Rent a slot. Store your products at our managed facility on Kenyatta Avenue.',
                            },
                            {
                                n: '02',
                                t: 'Pickup or delivery',
                                d: "Clients collect from CBD or choose doorstep delivery at checkout. Either way, you don't move.",
                            },
                            {
                                n: '03',
                                t: 'Live stock dashboard',
                                d: 'Monitor stock, orders, and sales from your business portal in real time.',
                            },
                        ].map((f, i) => (
                            <div
                                key={f.n}
                                className={`group hover:bg-primary hover:text-primary-foreground p-10 transition-colors lg:p-12 ${i < 2 ? 'border-edge md:border-r' : ''} ${i === 0 ? 'border-edge border-b md:border-b-0' : i === 1 ? 'border-edge border-b md:border-b-0' : ''}`}
                            >
                                <div className="text-accent mb-12 text-xs font-bold tracking-[0.2em] uppercase">{f.n}</div>
                                <h3 className="mb-4 text-2xl font-bold tracking-tight lg:text-3xl">{f.t}</h3>
                                <p className="text-muted-foreground group-hover:text-primary-foreground/70 leading-relaxed transition-colors">
                                    {f.d}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How it works */}
                <section id="how" className="bg-surface border-edge border-b">
                    <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 lg:px-16 lg:py-28">
                        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
                            <div>
                                <div className="text-accent mb-3 text-xs font-bold tracking-[0.2em] uppercase">How it works</div>
                                <h2 className="max-w-2xl text-4xl font-bold tracking-tighter lg:text-5xl">
                                    From online order to physical shelf in four steps.
                                </h2>
                            </div>
                        </div>
                        <div className="bg-edge border-edge grid grid-cols-1 gap-px border md:grid-cols-2 lg:grid-cols-4">
                            {[
                                { n: '1', t: 'Subscribe', d: 'Choose a plan, get assigned a shelf slot in our CBD facility.' },
                                { n: '2', t: 'Stock your shelf', d: 'Drop off products at our location. We log them into the system.' },
                                { n: '3', t: 'Clients order', d: 'They browse online and pick up at the CBD — or request delivery.' },
                                { n: '4', t: 'You earn', d: "Sales settle directly to your account. Restock when you're ready." },
                            ].map((s) => (
                                <div key={s.n} className="bg-background p-8 lg:p-10">
                                    <div className="text-accent text-5xl font-bold tracking-tighter tabular-nums">{s.n}</div>
                                    <div className="mt-8 text-lg font-bold">{s.t}</div>
                                    <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{s.d}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Pricing */}
                <section id="pricing" className="border-edge border-b">
                    <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-12 lg:px-16 lg:py-28">
                        <div className="mb-14 text-center">
                            <div className="text-accent mb-3 text-xs font-bold tracking-[0.2em] uppercase">Pricing</div>
                            <h2 className="text-4xl font-bold tracking-tighter lg:text-5xl">Simple monthly plans.</h2>
                            <p className="text-muted-foreground mx-auto mt-4 max-w-xl">No setup fees. Cancel any time. Upgrade as you grow.</p>
                        </div>

                        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-3">
                            {[
                                {
                                    name: 'Basic',
                                    price: 3500,
                                    note: '/month',
                                    featured: false,
                                    perks: ['1 shelf slot', 'Up to 20 products', 'Pickup only', 'Email support'],
                                    cta: 'Start trial',
                                },
                                {
                                    name: 'Pro',
                                    price: 7500,
                                    note: '/month',
                                    featured: true,
                                    perks: ['2 shelf slots', 'Unlimited products', 'Pickup + delivery', 'Sales analytics', 'Priority support'],
                                    cta: 'Start trial',
                                },
                                {
                                    name: 'Enterprise',
                                    price: null,
                                    note: 'Custom',
                                    featured: false,
                                    perks: ['4+ shelf slots', 'Dedicated zone', 'White-label storefront', 'Account manager'],
                                    cta: 'Contact sales',
                                },
                            ].map((p) => (
                                <div
                                    key={p.name}
                                    className={`bg-background flex flex-col rounded-xl border p-8 ${p.featured ? 'border-accent border-2 shadow-sm lg:scale-[1.02]' : 'border-edge'}`}
                                >
                                    <div className="mb-4 flex items-center gap-3">
                                        <div className="text-xs font-bold tracking-widest uppercase">{p.name}</div>
                                        {p.featured && (
                                            <span className="bg-accent text-accent-foreground rounded-full px-2 py-0.5 text-[10px] font-bold tracking-widest uppercase">
                                                Most popular
                                            </span>
                                        )}
                                    </div>
                                    <div className="mb-6">
                                        {p.price ? (
                                            <>
                                                <span className="text-4xl font-bold tracking-tighter">{formatKsh(p.price)}</span>
                                                <span className="text-muted-foreground ml-1 text-sm">{p.note}</span>
                                            </>
                                        ) : (
                                            <span className="text-4xl font-bold tracking-tighter">{p.note}</span>
                                        )}
                                    </div>
                                    <ul className="mb-8 flex-1 space-y-3">
                                        {p.perks.map((perk) => (
                                            <li key={perk} className="flex items-start gap-3 text-sm">
                                                <Check className="text-accent mt-0.5 size-4 shrink-0" />
                                                <span>{perk}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <Button
                                        asChild
                                        className={`h-12 rounded-md text-xs font-bold tracking-wider uppercase ${p.featured ? 'bg-accent hover:bg-accent/90' : ''}`}
                                        variant={p.featured ? 'default' : 'outline'}
                                    >
                                        <Link href={route('register')}>{p.cta}</Link>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA strip */}
                <section id="business" className="bg-primary text-primary-foreground">
                    <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 px-6 py-20 md:flex-row md:items-center md:px-12 lg:px-16 lg:py-24">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl font-bold tracking-tighter lg:text-5xl">Ready to put your products on a shelf?</h2>
                            <p className="text-primary-foreground/70 mt-4 text-lg">Start a 14-day free trial. No card required.</p>
                        </div>
                        <Button
                            asChild
                            size="lg"
                            className="bg-accent hover:bg-accent/90 text-accent-foreground h-14 rounded-md px-8 text-xs font-bold tracking-wider uppercase"
                        >
                            <Link href={route('register')}>
                                Start your free trial <ArrowRight className="ml-1 size-4" />
                            </Link>
                        </Button>
                    </div>
                </section>

                <AppFooter />
            </div>
        </CartProvider>
    );
}
