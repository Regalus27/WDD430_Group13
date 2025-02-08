'use client';

import { updateProduct } from "@/lib/actions";
import { Product } from "@/lib/definitions";
import { formatPrice } from "@/lib/utils";

export default function EditProductForm({
    product,
} : {
    product: Product;
}) {
    /**
     * id (autogen)
     * user_id (passed in via something)
     * price_in_cents form
     * category form
     * description form
     * created_at
     * 
     * Product_Images
     *  some sort of form that allows you to add X number of images
     * I will come back to image handling. Just point to a default image
     * and make a component that can be reused
     * 
     * figure out
     * - pass in user_id (state?) https://stackoverflow.com/questions/78502635/how-to-store-and-retrieve-user-id-in-next-js
     *      actually no, only need to change user_id on create form. Edit wouldn't change ownership.
     * - pass in current date     should be simple enough
     * - set up form action       
     * - get a response sent back to database
     * - then worry about validation
     */

    // Pass product id via binding
    const updateProductWithId = updateProduct.bind(null, product.product_id);

    return (
        <form action={updateProductWithId} className="max-w-sm mx-auto">
            <div className="mb-5">
                <label htmlFor="product_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                <input type="text" name="product_name" id="product_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={product.product_name} required />
            </div>
            <div className="mb-5">
                <label htmlFor="price_in_cents" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                <input type="number" name="price_in_cents" step="0.01" id="price_in_cents" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={product.price_in_cents/100} required /> {/** make helper function */}
            </div>
            <div className="mb-5">
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Category</label>
                <input type="text" name="category" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" defaultValue={product.category} required />
            </div>
            <div className="mb-5">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                <input type="text" name="description" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" defaultValue={product.description} required />
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
    );
}