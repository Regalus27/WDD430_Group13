'use client';

import { deleteProduct } from "@/app/lib/actions";
import { Product } from "@/app/lib/definitions";

export default function DeleteProductForm({
    product,
} : {
    product: Product;
}) {
    /**
     * Validation:
     * - Can only delete item if current user_id matches user_id of product (BLOCKED)
     * 
     * Otherwise:
     * - Just click the big red button labeled Really Delete this Item?
     */
    // Blocked by auth, temp user id
    const user_id = '891ccb08-e0b6-4aba-a439-33154b58dff0';

    const deleteProductWithId = deleteProduct.bind(null, product.product_id, user_id);

    return (
        <form action={deleteProductWithId}>
            <button type="submit" className="text-white bg-danger hover:bg-danger-hover focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Really Delete This Item?</button>
        </form>
    );
}