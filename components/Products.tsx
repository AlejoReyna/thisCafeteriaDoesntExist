"use client"
import { useState, useEffect } from 'react';
import './Products.css'
import { useCart } from './CartContext';
import Image from 'next/image';
import coffee1 from '@/public/coffe-1.jpg';
import coffee2 from '@/public/coffe-2.jpg';
import coffee3 from '@/public/coffe-3.jpg';

interface Product {
    id: string;
    name: string;
    price: number;
    image: any;
    quantity: number;
}

const products: Product[] = [
    { id: '1', name: 'Coffee 1', price: 5.99, image: coffee1, quantity: 0 },
    { id: '2', name: 'Coffee 2', price: 6.99, image: coffee2, quantity: 0 },
    { id: '3', name: 'Coffee 3', price: 7.99, image: coffee3, quantity: 0 },
];

export default function ProductsComponent() {
    const { addToCart } = useCart();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');

    useEffect(() => {
        if (showConfirmation) {
            const timer = setTimeout(() => {
                setShowConfirmation(false);
            }, 3000); // El mensaje desaparecerá después de 3 segundos

            return () => clearTimeout(timer);
        }
    }, [showConfirmation]);

    const handleAddToCart = (product: Product) => {
        addToCart(product);
        setConfirmationMessage(`${product.name} agregado al carrito`);
        setShowConfirmation(true);
    };

    return(
        <div className="min-h-screen cute-bg flex justify-center items-center w-full p-4 relative">
            {showConfirmation && (
                <div className="fixed top-4 right-4 bg-green-500 text-white p-4 rounded shadow-lg">
                    {confirmationMessage}
                </div>
            )}
            <div className="flex flex-wrap justify-center gap-4">
                {products.map((product, index) => (
                    <div key={index} className="max-w-sm w-full sm:w-1/2 md:w-1/3 lg:w-1/4 rounded overflow-hidden shadow-lg bg-white">
                        <Image className="w-full" src={product.image} alt={`Coffee image ${index + 1}`}/>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 text-black">{product.name}</div>
                            <p className="text-gray-700 text-base">
                                ${product.price.toFixed(2)}
                            </p>

                            <button
                                type="button"
                                className="bg-pink-400 text-white font-bold py-2 px-4 rounded mt-4"
                                onClick={() => handleAddToCart(product)}
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}