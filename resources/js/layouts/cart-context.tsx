import { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';

type CartContextValue = {
    open: boolean;
    setOpen: (open: boolean) => void;
    count: number;
    setCount: (count: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: PropsWithChildren) {
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0);

    const value = useMemo<CartContextValue>(() => ({ open, setOpen, count, setCount }), [open, count]);

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
    const value = useContext(CartContext);

    if (!value) {
        throw new Error('useCart must be used within a CartProvider');
    }

    return value;
}

