'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

export async function deleteProduct(product_id: string, user_id: string) {
    // Form has no data to validate
    // TODO add authentication
    await sql`
        DELETE FROM products
        WHERE product_id=${product_id} AND user_id=${user_id};
    `;

    revalidatePath(`/creators/${user_id}`);
    redirect(`/creators/${user_id}`);
}

// Shape of Update Form Data
const UpdateFormSchema = z.object({
    product_id: z.string(),
    user_id: z.string(),
    product_name: z.string(),
    price_in_cents: z.coerce.number().positive("Price must be greater than $0."),
    category: z.string(),
    description: z.string(),
    image_url: z.string(),
    created_at: z.string()
});

// Don't validate info user can't touch
const UpdateProduct = UpdateFormSchema.omit({
    product_id: true,
    user_id: true,
    created_at: true,
    image_url: true, // remove once add image processing
});

export async function updateProduct(product_id: string, formData: FormData) {
    // Validate Form Data
    const {
        product_name,
        price_in_cents,
        category,
        description
    } = UpdateProduct.parse({
        product_name: formData.get('product_name'),
        price_in_cents: formData.get('price_in_cents'), // need to multiply by 100 to convert to cents
        category: formData.get('category'),
        description: formData.get('description'),
    });
    // Add in new info
    const actual_price_in_cents = price_in_cents * 100; // sloppy
    const created_at = Date.now();

    await sql`
        UPDATE products
        SET product_name = ${product_name}, price_in_cents = ${actual_price_in_cents}, category = ${category}, description = ${description}, created_at = to_timestamp(${created_at} / 1000.0)
        WHERE product_id = ${product_id};
    `;

    revalidatePath(`/products/${product_id}/edit`);
    redirect(`/products/${product_id}/edit`);
}