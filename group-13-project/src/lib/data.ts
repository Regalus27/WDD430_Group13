import { sql } from '@vercel/postgres';
import { formatPrice } from './utils';
import { Product } from './definitions';

export async function fetchProductById(product_id: string) {
    try {
        const data = await sql<Product>`
            SELECT
                products.product_id,
                products.user_id,
                products.product_name,
                products.price_in_cents,
                products.category,
                products.description,
                products.created_at
            FROM products
            WHERE products.product_id = ${product_id};
        `;
        const product = data.rows.map((product) => ({
            ...product
        }));

        return product[0];
    } catch (error) {
        throw new Error("Product not found.");
    }
}