import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import Layout from '@/layouts/layout';
import { useCart } from '@/layouts/cart-context';
import { Minus, Plus, Search, ShoppingBag } from 'lucide-react';
import { useMemo, useState } from 'react';

type Product = {
    id: number;
    name: string;
    store: string;
    category: string;
    price: number;
    stock: number;
    shelf: string;
    description: string;
    image: string;
};

type Fulfillment = 'pickup' | 'delivery';

const categories = ['All', 'Skincare', 'Haircare', 'Fashion', 'Home', 'Tech'];

const products: Product[] = [
    {
        id: 1,
        name: 'Botanical Glow Serum',
        store: 'Nairobi Skin Co.',
        category: 'Skincare',
        price: 2450,
        stock: 12,
        shelf: 'A12',
        description: 'A lightweight serum designed for humid mornings and fast, radiant routines.',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80',
    },
    {
        id: 2,
        name: 'Sculpted Carryall',
        store: 'The Daily Carry',
        category: 'Fashion',
        price: 6200,
        stock: 7,
        shelf: 'C04',
        description: 'Structured and practical, with room for your essentials from work to weekend.',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    },
    {
        id: 3,
        name: 'Quiet Studio Lamp',
        store: 'Studio North',
        category: 'Home',
        price: 4800,
        stock: 5,
        shelf: 'E09',
        description: 'A warm lamp for evening reading, focused work, and calming corners.',
        image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80',
    },
    {
        id: 4,
        name: 'Cedar Hair Elixir',
        store: 'Moss Salon',
        category: 'Haircare',
        price: 1800,
        stock: 15,
        shelf: 'B07',
        description: 'A nourishing leave-in oil for shine, softness, and everyday frizz control.',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
    },
    {
        id: 5,
        name: 'Pocket Audio Speaker',
        store: 'Byte & Bloom',
        category: 'Tech',
        price: 7600,
        stock: 3,
        shelf: 'D14',
        description: 'Small footprint, rich sound, and a compact design made for flexible spaces.',
        image: 'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80',
    },
    {
        id: 6,
        name: 'Velvet Body Cream',
        store: 'The Plant House',
        category: 'Skincare',
        price: 3200,
        stock: 9,
        shelf: 'A18',
        description: 'A creamy moisturizer with a soft finish for daily comfort and glow.',
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
    },
];

function formatKsh(value: number) {
    return `KSh ${value.toLocaleString('en-KE')}`;
}

function ProductPageContent() {
    const cart = useCart();
    const [query, setQuery] = useState('');
    const [store, setStore] = useState('All stores');
    const [sort, setSort] = useState('popular');
    const [category, setCategory] = useState('All');
    const [activeProduct, setActiveProduct] = useState<Product | null>(null);
    const [activeQuantity, setActiveQuantity] = useState(1);
    const [activeFulfillment, setActiveFulfillment] = useState<Fulfillment>('pickup');
    const [cartItems, setCartItems] = useState<Product[]>([]);

    const stores = useMemo(() => ['All stores', ...Array.from(new Set(products.map((product) => product.store)))], []);

    const filteredProducts = useMemo(() => {
        let list = products.filter((product) => {
            if (category !== 'All' && product.category !== category) {
                return false;
            }

            if (store !== 'All stores' && product.store !== store) {
                return false;
            }

            if (query && !`${product.name} ${product.store}`.toLowerCase().includes(query.toLowerCase())) {
                return false;
            }

            return true;
        });

        switch (sort) {
            case 'newest':
                list = [...list].reverse();
                break;
            case 'price-low':
                list = [...list].sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                list = [...list].sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }

        return list;
    }, [category, query, sort, store]);

    const openProduct = (product: Product) => {
        setActiveProduct(product);
        setActiveQuantity(1);
        setActiveFulfillment('pickup');
    };

    const addToCart = (product: Product, quantity = 1) => {
        setCartItems((items) => [...items, ...Array.from({ length: quantity }, () => product)]);
        cart.setCount(cart.count + quantity);
        cart.setOpen(true);
    };

    const addActiveProductToCart = () => {
        if (!activeProduct) {
            return;
        }

        addToCart(activeProduct, activeQuantity);
        setActiveProduct(null);
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="bg-accent text-accent-foreground px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-[0.35em]">
                Collecting from CBD, Nairobi — or choose delivery at checkout
            </div>

            <div className="mx-auto max-w-[1440px] px-6 py-10 md:px-8 lg:py-12">
                <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-accent text-xs font-bold uppercase tracking-[0.35em]">Featured shelves</p>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Browse products</h1>
                        <p className="text-muted-foreground mt-2 text-sm md:text-base">
                            From {stores.length - 1} Nairobi brands, on shelves right now.
                        </p>
                    </div>
                    <div className="rounded-full border border-edge bg-surface px-4 py-2 text-sm text-muted-foreground">
                        {cartItems.length} item{cartItems.length === 1 ? '' : 's'} in your cart
                    </div>
                </div>

                <div className="mb-6 flex flex-col gap-3 md:flex-row">
                    <label className="relative flex-1">
                        <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                        <Input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search products, stores..."
                            className="h-11 pl-10"
                        />
                    </label>
                    <select
                        value={store}
                        onChange={(event) => setStore(event.target.value)}
                        className="h-11 min-w-[180px] rounded-md border border-edge bg-background px-3 text-sm"
                    >
                        {stores.map((storeOption) => (
                            <option key={storeOption}>{storeOption}</option>
                        ))}
                    </select>
                    <select
                        value={sort}
                        onChange={(event) => setSort(event.target.value)}
                        className="h-11 min-w-[180px] rounded-md border border-edge bg-background px-3 text-sm"
                    >
                        <option value="popular">Most popular</option>
                        <option value="newest">Newest</option>
                        <option value="price-low">Price: low to high</option>
                        <option value="price-high">Price: high to low</option>
                    </select>
                </div>

                <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
                    {categories.map((item) => (
                        <button
                            key={item}
                            type="button"
                            onClick={() => setCategory(item)}
                            className={`shrink-0 rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] transition-colors ${
                                category === item ? 'border-foreground bg-foreground text-background' : 'border-edge hover:border-foreground'
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-edge p-16 text-center">
                        <div className="text-lg font-semibold">No products found</div>
                        <p className="text-muted-foreground mt-1 text-sm">Try a different search or category.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredProducts.map((product) => (
                            <article key={product.id} className="group flex flex-col overflow-hidden rounded-2xl border border-edge bg-background transition-colors hover:border-foreground">
                                <button type="button" onClick={() => openProduct(product)} className="aspect-square overflow-hidden bg-muted">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                        loading="lazy"
                                    />
                                </button>
                                <div className="flex flex-1 flex-col p-5">
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-muted-foreground">{product.store}</span>
                                        <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.25em] text-accent">
                                            {product.category}
                                        </span>
                                    </div>
                                    <button type="button" onClick={() => openProduct(product)} className="mt-3 text-left font-semibold leading-snug">
                                        {product.name}
                                    </button>
                                    <div className="mt-1 text-sm font-semibold text-accent">{formatKsh(product.price)}</div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => addToCart(product)}
                                        className="mt-5 h-10 rounded-md border-accent text-xs font-bold uppercase tracking-[0.25em] text-accent hover:bg-accent hover:text-accent-foreground"
                                    >
                                        Add to cart
                                    </Button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>

            <Sheet open={cart.open} onOpenChange={cart.setOpen}>
                <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-lg">
                    <SheetHeader className="border-b border-edge p-6">
                        <SheetTitle className="text-left">Your cart</SheetTitle>
                        <SheetDescription className="text-left">
                            {cartItems.length > 0 ? `${cartItems.length} item${cartItems.length === 1 ? '' : 's'} ready for pickup or delivery.` : 'Add a few shelves to start your order.'}
                        </SheetDescription>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto p-6">
                        {cartItems.length === 0 ? (
                            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-edge px-6 py-12 text-center">
                                <ShoppingBag className="mb-3 size-8 text-muted-foreground" />
                                <div className="font-semibold">Your cart feels light</div>
                                <p className="text-muted-foreground mt-1 text-sm">Pick a few favourites from the shelves above.</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {cartItems.map((item, index) => (
                                    <div key={`${item.id}-${index}`} className="flex items-center justify-between rounded-xl border border-edge p-3">
                                        <div>
                                            <div className="font-medium">{item.name}</div>
                                            <div className="text-sm text-muted-foreground">{item.store}</div>
                                        </div>
                                        <div className="text-sm font-semibold text-accent">{formatKsh(item.price)}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </SheetContent>
            </Sheet>

            <Sheet open={Boolean(activeProduct)} onOpenChange={(open) => !open && setActiveProduct(null)}>
                <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-lg">
                    {activeProduct && (
                        <>
                            <div className="aspect-square overflow-hidden bg-muted">
                                <img src={activeProduct.image} alt={activeProduct.name} className="h-full w-full object-cover" />
                            </div>
                            <div className="flex-1 overflow-y-auto p-6">
                                <div className="text-sm text-muted-foreground">{activeProduct.store}</div>
                                <h2 className="mt-2 text-2xl font-semibold tracking-tight">{activeProduct.name}</h2>
                                <div className="mt-2 text-lg font-semibold text-accent">{formatKsh(activeProduct.price)}</div>
                                <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{activeProduct.description}</p>

                                <div className="mt-6 text-xs font-bold uppercase tracking-[0.25em]">Quantity</div>
                                <div className="mt-2 flex w-fit items-center rounded-md border border-edge">
                                    <button type="button" className="p-2" onClick={() => setActiveQuantity((value) => Math.max(1, value - 1))}>
                                        <Minus className="size-4" />
                                    </button>
                                    <span className="min-w-10 px-3 text-center font-semibold">{activeQuantity}</span>
                                    <button type="button" className="p-2" onClick={() => setActiveQuantity((value) => value + 1)}>
                                        <Plus className="size-4" />
                                    </button>
                                </div>

                                <div className="mt-6 text-xs font-bold uppercase tracking-[0.25em]">Fulfillment</div>
                                <div className="mt-2 grid grid-cols-2 gap-2">
                                    {(['pickup', 'delivery'] as Fulfillment[]).map((option) => (
                                        <button
                                            key={option}
                                            type="button"
                                            onClick={() => setActiveFulfillment(option)}
                                            className={`h-10 rounded-md border text-[11px] font-bold uppercase tracking-[0.25em] ${
                                                activeFulfillment === option ? 'border-accent bg-accent text-accent-foreground' : 'border-edge'
                                            }`}
                                        >
                                            {option === 'pickup' ? 'Pickup' : 'Delivery'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="border-t border-edge bg-surface p-6">
                                <Button type="button" onClick={addActiveProductToCart} className="h-12 w-full rounded-md text-xs font-bold uppercase tracking-[0.25em]">
                                    Add to cart · {formatKsh(activeProduct.price * activeQuantity)}
                                </Button>
                            </div>
                        </>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
}

export default function index() {
    return (
        <Layout showCart>
            <ProductPageContent />
        </Layout>
    );
}
