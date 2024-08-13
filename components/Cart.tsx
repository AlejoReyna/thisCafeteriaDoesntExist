"use client"

import { useCart } from './CartContext';
import Link from 'next/link';

export default function CartComponent() {
    const { cart, addToCart, removeFromCart } = useCart();

    return (
        <div className="flex flex-col min-h-screen navbar-container text-black p-4">
            <h2 className="text-2xl font-bold mb-4">Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {cart.map((item) => (
                        <div key={item.id} className="flex bg- justify-between items-center mb-4 border-b pb-2">
                            <div>
                                <p className="font-semibold">{item.name}</p>
                                <p>Price: ${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center">
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="px-2 py-1 bg-red-500 text-white rounded mr-2"
                                >
                                    -
                                </button>
                                <span className="mx-2">{item.quantity}</span>
                                <button
                                    onClick={() => addToCart(item)}
                                    className="px-2 py-1 bg-green-500 text-white rounded mr-2"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => removeFromCart(item.id, true)}
                                    className="px-2 py-1 bg-red-700 text-white rounded"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="mt-4">
                        <p className="font-bold text-xl">
                            Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                        </p>

                        <Link href={"/Payment"}>
                            <button type={"button"} className="bg-pink-400 text-white font-bold py-2 px-4 rounded mt-4">
                                Pay
                            </button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
}