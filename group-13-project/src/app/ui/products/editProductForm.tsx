'use client';

import { updateProduct } from "@/app/lib/actions";
import { Product } from "@/app/lib/definitions";
import Link from "next/link";
import CreateCategorySelect from "./categorySelect";

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
    const product_id:string = product.product_id;
    const updateProductWithId = updateProduct.bind(null, product_id);
    const deleteHref = `/products/${product_id}/delete`;

    return (
        <form action={updateProductWithId} className="max-w-sm mx-auto">
            <div className="mb-5">
                <label htmlFor="product_name" className="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
                <input type="text" name="product_name" id="product_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={product.product_name} required />
            </div>
            <div className="mb-5">
                <label htmlFor="price_in_cents" className="block mb-2 text-sm font-medium text-gray-900">Price ($)</label>
                <input type="number" name="price_in_cents" step="0.01" min="0.01" id="price_in_cents" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={product.price_in_cents/100} required /> {/** make helper function */}
            </div>
            <div className="mb-5">
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                <input type="text" name="category" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" defaultValue={product.category} required />
            </div>
            <div className="mb-5">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                <input type="text" name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" defaultValue={product.description} required />
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            <Link href={deleteHref} className="btn btn-primary text-white bg-danger hover:bg-danger-hover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Delete Item</Link>
        </form>
    );
}