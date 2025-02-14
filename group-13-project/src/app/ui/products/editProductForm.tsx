'use client';

import { updateProduct } from "@/lib/actions";
import { Product } from "@/lib/definitions";

export default function EditProductForm({
    product,
} : {
    product: Product;
}) {
    /**
     * Product_Images
     *  some sort of form that allows you to add X number of images
     * I will come back to image handling. Just point to a default image
     * and make a component that can be reused
     */

    // Pass product id via binding
    const updateProductWithId = updateProduct.bind(null, product.product_id);

    return (
        <form action={updateProductWithId}>
            <div className="mb-5">
                <label htmlFor="product_name" className="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
                <input type="text" name="product_name" id="product_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" defaultValue={product.product_name} required />
            </div>
            <div className="mb-5">
                <label htmlFor="price_in_cents" className="block mb-2 text-sm font-medium text-gray-900">Price ($)</label>
                <input type="number" name="price_in_cents" step="0.01" min="0.01" id="price_in_cents" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" defaultValue={product.price_in_cents/100} required /> {/** make helper function */}
            </div>
            <div className="mb-5">
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                <input type="text" name="category" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" defaultValue={product.category} required />
            </div>
            <div className="mb-5">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                <textarea name="description" id="description" rows={9} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" defaultValue={product.description} required />
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
        </form>
    );
}