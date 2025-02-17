'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface CartItem {
    product_id: string;
    product_name: string;
    price_in_cents: number;
    Quantity: number;
}

const getLocalStorage = (key: string): CartItem[] => {
    if (typeof window !== 'undefined') {
        return JSON.parse(localStorage.getItem(key) || '[]');
    }
    return [];
};

const Checkout = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [shipping] = useState(10);
    const [tax, setTax] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const cart = getLocalStorage('so-cart');
        setCartItems(cart);
        const total = cart.reduce((sum, item) => sum + item.price_in_cents * item.Quantity, 0);
        setCartTotal(total);
        setTax(total * 0.08);
    }, []);

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        const orderTotal = cartTotal + shipping * 100 + tax;

        alert(`Order placed successfully! Total: $${(orderTotal / 100).toFixed(2)}`);
        localStorage.removeItem('so-cart');
        router.push('/checkout/success');
    };

    return (
        <section className="p-6 bg-gray-100">
            <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
            <ul>
                <li className="flex flex-row-reverse justify-between items-center mb-2">
                    <p className="text-right">${(cartTotal / 100).toFixed(2)}</p>
                    <label>Item Subtotal ({cartItems.length})</label>
                </li>
                <li className="flex flex-row-reverse justify-between items-center mb-2">
                    <p className="text-right">${shipping.toFixed(2)}</p>
                    <label>Shipping Estimate</label>
                </li>
                <li className="flex flex-row-reverse justify-between items-center mb-2">
                    <p className="text-right">${(tax / 100).toFixed(2)}</p>
                    <label>Tax</label>
                </li>
                <li className="flex flex-row-reverse justify-between items-center mb-2">
                    <p className="text-right font-semibold">${((cartTotal + shipping * 100 + tax) / 100).toFixed(2)}</p>
                    <label><b>Order Total</b></label>
                </li>
            </ul>
            <form onSubmit={handleCheckout} className="mt-6">
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Place Order
                </button>
            </form>
        </section>
    );
};

export default Checkout;
