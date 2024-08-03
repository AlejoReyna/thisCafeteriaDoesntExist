"use client"
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

const CART_KEY = 'cart';

interface Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface CartContextType {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string, removeAll?: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<Product[]>([]);

    useEffect(() => {
        const savedCart = localStorage.getItem(CART_KEY);
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    const addToCart = (product: Product) => {
        setCart(prevCart => {
            const updatedCart = [...prevCart];
            const existingProductIndex = updatedCart.findIndex(item => item.id === product.id);

            if (existingProductIndex > -1) {
                updatedCart[existingProductIndex].quantity += 1;
            } else {
                updatedCart.push({ ...product, quantity: 1 });
            }

            localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    const removeFromCart = (productId: string, removeAll: boolean = false) => {
        setCart(prevCart => {
            const updatedCart = prevCart.map(item => {
                if (item.id === productId) {
                    if (removeAll || item.quantity === 1) {
                        return null;
                    }
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            }).filter((item): item is Product => item !== null);

            localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
            return updatedCart;
        });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};