import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Eye, EyeOff, Pencil, Plus } from 'lucide-react';
import { useMemo, useState, type FormEvent } from 'react';

type InventoryProduct = {
    id: string;
    name: string;
    sku: string;
    category: string;
    price: number;
    stock: number;
    shelf: string;
    image: string;
    description: string;
    isVisible: boolean;
};

type ProductFormState = {
    name: string;
    description: string;
    category: string;
    price: string;
    initialStock: string;
    shelf: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'My Products',
        href: '/business/products',
    },
];

const initialProducts: InventoryProduct[] = [
    {
        id: 'sku-glow-01',
        name: 'Botanical Glow Serum',
        sku: 'GLW-001',
        category: 'Skincare',
        price: 2450,
        stock: 8,
        shelf: 'A-104',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=900&q=80',
        description: 'Brightening serum for daily glow.',
        isVisible: true,
    },
    {
        id: 'sku-char-02',
        name: 'Charcoal Cleanser',
        sku: 'CHR-002',
        category: 'Skincare',
        price: 1800,
        stock: 14,
        shelf: 'A-106',
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80',
        description: 'Deep-cleaning cleanser for everyday use.',
        isVisible: true,
    },
    {
        id: 'sku-rose-03',
        name: 'Rose Mist',
        sku: 'ROS-003',
        category: 'Haircare',
        price: 2200,
        stock: 21,
        shelf: 'B-201',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
        description: 'Refreshing hydration mist for soft hair.',
        isVisible: false,
    },
];

const categoryOptions = ['Skincare', 'Haircare', 'Fashion', 'Food', 'Electronics', 'Home'];

function formatCurrency(value: number) {
    return `KSh ${value.toLocaleString('en-KE')}`;
}

export default function index() {
    const [inventoryProducts, setInventoryProducts] = useState<InventoryProduct[]>(initialProducts);
    const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false);
    const [productForm, setProductForm] = useState<ProductFormState>({
        name: '',
        description: '',
        category: categoryOptions[0],
        price: '',
        initialStock: '',
        shelf: '',
    });

    const visibleProductCount = useMemo(() => inventoryProducts.filter((product) => product.isVisible).length, [inventoryProducts]);

    const handleProductVisibilityChange = (productId: string, isVisible: boolean) => {
        setInventoryProducts((currentProducts) => currentProducts.map((product) => (product.id === productId ? { ...product, isVisible } : product)));
    };

    const handleProductFormChange = (fieldName: keyof ProductFormState, value: string) => {
        setProductForm((currentForm) => ({ ...currentForm, [fieldName]: value }));
    };

    const handleCreateProduct = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const trimmedName = productForm.name.trim();
        const trimmedShelf = productForm.shelf.trim();

        if (!trimmedName || !trimmedShelf) {
            return;
        }

        const newProduct: InventoryProduct = {
            id: `sku-${trimmedName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
            name: trimmedName,
            sku: `SKU-${Date.now().toString().slice(-4)}`,
            category: productForm.category,
            price: Number(productForm.price) || 0,
            stock: Number(productForm.initialStock) || 0,
            shelf: trimmedShelf.toUpperCase(),
            image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
            description: productForm.description.trim(),
            isVisible: true,
        };

        setInventoryProducts((currentProducts) => [newProduct, ...currentProducts]);
        setIsAddProductDialogOpen(false);
        setProductForm({
            name: '',
            description: '',
            category: categoryOptions[0],
            price: '',
            initialStock: '',
            shelf: '',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="My Products" />
            <div className="space-y-6 p-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">Your shelf inventory</h1>
                        <p className="text-muted-foreground mt-1 text-sm">
                            {inventoryProducts.length} products on your shelves · {visibleProductCount} visible
                        </p>
                    </div>

                    <Dialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="h-10 rounded-md px-5 text-[11px] font-bold tracking-[0.25em] uppercase">
                                <Plus className="mr-2 size-4" /> Add product
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-xl">
                            <DialogHeader>
                                <DialogTitle className="text-xl tracking-tight">Add a product</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleCreateProduct} className="space-y-4">
                                <div>
                                    <Label htmlFor="product-name" className="text-[11px] font-bold tracking-[0.25em] uppercase">
                                        Name
                                    </Label>
                                    <Input
                                        id="product-name"
                                        value={productForm.name}
                                        onChange={(event) => handleProductFormChange('name', event.target.value)}
                                        className="mt-1.5 h-11"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="product-description" className="text-[11px] font-bold tracking-[0.25em] uppercase">
                                        Description
                                    </Label>
                                    <textarea
                                        id="product-description"
                                        value={productForm.description}
                                        onChange={(event) => handleProductFormChange('description', event.target.value)}
                                        className="border-edge bg-background mt-1.5 min-h-[96px] w-full rounded-md border px-3 py-2 text-sm"
                                    />
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <Label htmlFor="product-category" className="text-[11px] font-bold tracking-[0.25em] uppercase">
                                            Category
                                        </Label>
                                        <select
                                            id="product-category"
                                            value={productForm.category}
                                            onChange={(event) => handleProductFormChange('category', event.target.value)}
                                            className="border-edge bg-background mt-1.5 h-11 w-full rounded-md border px-3 text-sm"
                                        >
                                            {categoryOptions.map((categoryName) => (
                                                <option key={categoryName} value={categoryName}>
                                                    {categoryName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <Label htmlFor="product-price" className="text-[11px] font-bold tracking-[0.25em] uppercase">
                                            Price (KSh)
                                        </Label>
                                        <Input
                                            id="product-price"
                                            type="number"
                                            min="0"
                                            value={productForm.price}
                                            onChange={(event) => handleProductFormChange('price', event.target.value)}
                                            className="mt-1.5 h-11"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="product-stock" className="text-[11px] font-bold tracking-[0.25em] uppercase">
                                            Initial stock
                                        </Label>
                                        <Input
                                            id="product-stock"
                                            type="number"
                                            min="0"
                                            value={productForm.initialStock}
                                            onChange={(event) => handleProductFormChange('initialStock', event.target.value)}
                                            className="mt-1.5 h-11"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="product-shelf" className="text-[11px] font-bold tracking-[0.25em] uppercase">
                                            Shelf slot
                                        </Label>
                                        <Input
                                            id="product-shelf"
                                            value={productForm.shelf}
                                            onChange={(event) => handleProductFormChange('shelf', event.target.value)}
                                            className="mt-1.5 h-11"
                                            placeholder="A-104"
                                        />
                                    </div>
                                </div>
                                <Button type="submit" className="h-11 w-full rounded-md text-[11px] font-bold tracking-[0.25em] uppercase">
                                    Create product
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="border-sidebar-border/70 bg-background overflow-hidden rounded-xl border">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-muted/70 text-muted-foreground text-left text-[11px] font-semibold tracking-[0.3em] uppercase">
                                <tr>
                                    <th className="px-5 py-3">Product</th>
                                    <th className="px-5 py-3">SKU</th>
                                    <th className="px-5 py-3">Category</th>
                                    <th className="px-5 py-3 text-right">Price</th>
                                    <th className="px-5 py-3 text-right">Stock</th>
                                    <th className="px-5 py-3">Shelf</th>
                                    <th className="px-5 py-3 text-center">Visible</th>
                                    <th className="px-5 py-3" />
                                </tr>
                            </thead>
                            <tbody>
                                {inventoryProducts.map((product) => (
                                    <tr key={product.id} className="border-sidebar-border/70 border-t">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-muted h-11 w-11 shrink-0 overflow-hidden rounded-lg">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="h-full w-full object-cover"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="font-semibold">{product.name}</div>
                                                    <div className="text-muted-foreground text-xs">{product.description}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 font-mono text-xs">{product.sku}</td>
                                        <td className="px-5 py-4">
                                            <span className="bg-accent/10 text-accent rounded-full px-2 py-0.5 text-[10px] font-bold tracking-[0.25em] uppercase">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 text-right font-semibold tabular-nums">{formatCurrency(product.price)}</td>
                                        <td className="px-5 py-4 text-right font-semibold tabular-nums">{product.stock}</td>
                                        <td className="px-5 py-4 font-mono text-xs">{product.shelf}</td>
                                        <td className="px-5 py-4 text-center">
                                            <button
                                                type="button"
                                                onClick={() => handleProductVisibilityChange(product.id, !product.isVisible)}
                                                className={`inline-flex h-8 w-16 items-center justify-center rounded-full border transition-colors ${
                                                    product.isVisible
                                                        ? 'border-accent bg-accent/10 text-accent'
                                                        : 'border-muted-foreground/30 bg-background text-muted-foreground'
                                                }`}
                                                aria-label={`Toggle visibility for ${product.name}`}
                                            >
                                                {product.isVisible ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                                            </button>
                                        </td>
                                        <td className="px-5 py-4 text-right">
                                            <button
                                                type="button"
                                                className="hover:bg-muted rounded-md p-2 transition-colors"
                                                aria-label={`Edit ${product.name}`}
                                            >
                                                <Pencil className="text-muted-foreground size-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
