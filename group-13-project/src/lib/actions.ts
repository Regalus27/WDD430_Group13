'use server';

import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { convertToActualPriceInCents } from './utils';

const CreateFormSchema = z.object({
    product_id: z.string(),
    user_id: z.string(),
    product_name: z.string(),
    price_in_cents: z.coerce.number().positive(),
    category: z.string(),
    description: z.string(),
    image_url: z.string(),
    created_at: z.string(),
});

const CreateProduct = CreateFormSchema.omit({
    product_id: true,
    created_at: true,
});

export async function createProduct(passed_user_id: string, formData: FormData) {
    // Validate Form Data
    const {
        user_id,
        product_name,
        price_in_cents,
        category,
        description,
        image_url
    } = CreateProduct.parse({
        user_id: passed_user_id,
        product_name : formData.get('product_name'),
        price_in_cents: formData.get('price_in_cents'),
        category: formData.get('category'),
        description: formData.get('description'),
        image_url: '/mockup.png'
        //image_url: formData.get('image_url'),
    });

    // adjust price to be in cents (Input in dollars)
    const actual_price_in_cents = convertToActualPriceInCents(price_in_cents);
    const created_at = Date.now();

    await sql`
        INSERT INTO products (user_id, product_name, price_in_cents, category, description, image_url, created_at)
        VALUES (${user_id}, ${product_name}, ${actual_price_in_cents}, ${category}, ${description}, ${image_url}, to_timestamp(${created_at} / 1000.0));
    `;

    // redirect to creator profile? Otherwise grab newest item tied to user account and navigate to that
    redirect(`/`);
}

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

import { signIn } from '../../auth';
import { AuthError } from 'next-auth';
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
    const actual_price_in_cents = convertToActualPriceInCents(price_in_cents);
    const created_at = Date.now();

    await sql`
        UPDATE products
        SET product_name = ${product_name}, price_in_cents = ${actual_price_in_cents}, category = ${category}, description = ${description}, created_at = to_timestamp(${created_at} / 1000.0)
        WHERE product_id = ${product_id};
    `;

    revalidatePath(`/products/${product_id}/edit`);
    redirect(`/products/${product_id}/edit`);
}

const CreateReviewSchema = z.object({
    rating: z.number(),
    review_text: z.string(),
    product_id: z.string(),
    user_id: z.string()
})

export async function createReview(review: {rating: number, review_text: string, product_id: string, user_id: string}) {

    const {
        rating,
        review_text,
        product_id,
        user_id
    } = CreateReviewSchema.parse({
        rating: review.rating,
        review_text: review.review_text,
        product_id: review.product_id,
        user_id: review.user_id
    })

    await sql`
        INSERT INTO review (rating, review_text, product_id, user_id)
        VALUES (${rating}, ${review_text}, ${product_id}, ${user_id});
    `
}
export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
       console.log("Authenticating") 
       await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }
