'use client';

import React, { useEffect, useState } from 'react';

interface CartItem {
    product_id: string;
    product_name: string;
    image_url: string;
    price_in_cents: number;
    Quantity: number;
}

const getLocalStorage = (key: string): CartItem[] => {
    if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem(key) || '[]');
    }
    return [];
};

const setLocalStorage = (key: string, value: CartItem[]) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartTotal, setCartTotal] = useState<number>(0);

    useEffect(() => {
        setCartItems(getLocalStorage('so-cart'));
    }, []);

    useEffect(() => {
        if (cartItems.length > 0) {
            setLocalStorage('so-cart', cartItems);
        }
        const total = cartItems.reduce((sum, item) => sum + item.price_in_cents * item.Quantity, 0);
        setCartTotal(total);
    }, [cartItems]);

    const handleQuantityChange = (index: number, delta: number) => {
        setCartItems(prevCart =>
            prevCart.map((item, i) =>
                i === index ? { ...item, Quantity: Math.max(1, item.Quantity + delta) } : item
            )
        );
    };

    const handleRemoveItem = (index: number) => {
        setCartItems(prevCart => prevCart.filter((_, i) => i !== index));
    };

    return (
        <section className="p-6 bg-gray-100">
            <h2 className="text-2xl font-semibold mb-4">My Cart</h2>
            {cartItems.length === 0 ? (
                <p className="text-lg text-gray-600">Cart is empty.</p>
            ) : (
                <>
                    <ul className="space-y-4">
                        {cartItems.map((item, index) => (
                            <li key={item.product_id} className="bg-white p-4 rounded-lg shadow-md flex flex-col md:flex-row items-center gap-4">
                                <a href="#" className="w-24 h-24 flex-shrink-0">
                                    <img src={item.image_url} alt={item.product_name} className="w-full h-full object-cover rounded-lg" />
                                </a>
                                <div className="flex-1">
                                    <a href="#">
                                        <h2 className="text-lg font-medium">{item.product_name}</h2>
                                    </a>
                                    <div className="flex items-center gap-2 mt-2">
                                        <button className="px-2 py-1 bg-gray-300 text-black rounded-md" onClick={() => handleQuantityChange(index, -1)}>-</button>
                                        <span className="text-lg font-medium">{item.Quantity}</span>
                                        <button className="px-2 py-1 bg-gray-300 text-black rounded-md" onClick={() => handleQuantityChange(index, 1)}>+</button>
                                    </div>
                                    <p className="text-lg font-semibold mt-2">${((item.price_in_cents * item.Quantity) / 100).toFixed(2)}</p>
                                </div>
                                <button className="text-red-500 font-semibold hover:text-red-700" onClick={() => handleRemoveItem(index)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
                        <p className="text-xl font-semibold">Total: ${(cartTotal / 100).toFixed(2)}</p>
                        <a href="/checkout" className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Checkout</a>
                    </div>
                </>
            )}
        </section>
    );
};

export default CartPage;