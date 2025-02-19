'use client';

import { updateProduct } from "@/lib/actions";
import { Product } from "@/lib/definitions";
import Link from "next/link";
import CreateCategorySelect from "./categorySelect";
import ImageUploadComponent from "../imageForm/imageUploadComponent";

export default function EditProductForm({
    product,
} : {
    product: Product;
}) {
    // Pass product id via binding
    const product_id:string = product.product_id;
    const updateProductWithId = updateProduct.bind(null, product_id);
    const deleteHref = `/products/${product_id}/delete`;

    const handleSubmit = (formData: FormData) => {
        if (!formData) {
            return;
        }
        // filesize validation
        // Yes these are bad ways to send user feedback maybe I'll change them to something if I magically get time
        const imageFile: File = formData.get('image') as File;
        if (imageFile.type.split('/')[0] !== 'image') {
            alert("Image must be an image.");
            return;
        }
        if (imageFile.size / 1024 / 1024 > 500) {
            alert("Image must be less than 500MB.");
            return;
        }

        updateProductWithId(formData);
    }

    return (
        <form action={handleSubmit} className="max-w-sm mx-auto">
            <div className="mb-5">
                <label htmlFor="product_name" className="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
                <input type="text" name="product_name" id="product_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={product.product_name} required />
            </div>
            <div className="mb-5">
                <label htmlFor="price_in_cents" className="block mb-2 text-sm font-medium text-gray-900">Price ($)</label>
                <input type="number" name="price_in_cents" step="0.01" min="0.01" id="price_in_cents" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" defaultValue={product.price_in_cents/100} required />
            </div>
            <div className="mb-5">
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                <CreateCategorySelect defaultCategory={product.category}></CreateCategorySelect>
            </div>
            <div className="mb-5">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                <textarea name="description" id="description" rows={9} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" defaultValue={product.description} required />
            </div>
            <ImageUploadComponent></ImageUploadComponent>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            <Link href={deleteHref} className="btn btn-primary text-white bg-danger hover:bg-danger-hover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Delete Item</Link>
        </form>
    );
}
