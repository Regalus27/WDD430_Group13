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
            ...product,
            // convert from cents to dollars
            // consider renaming type from price in cents to just price?
            price_in_cents: formatPrice(product.price_in_cents),
        }));

        return product[0];
    } catch (error) {
        throw new Error('Failed to fetch product.');
    }
}