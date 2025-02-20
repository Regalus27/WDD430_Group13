"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { convertToActualPriceInCents } from "./utils";
import { put } from "@vercel/blob";

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
    image_url: true
});

export async function createProduct(passed_user_id: string, formData: FormData) {
    // Validate Form Data
    const {
        user_id,
        product_name,
        price_in_cents,
        category,
        description,
    } = CreateProduct.parse({
        user_id: passed_user_id,
        product_name : formData.get('product_name'),
        price_in_cents: formData.get('price_in_cents'),
        category: formData.get('category'),
        description: formData.get('description'),
    });

    // adjust price to be in cents (Input in dollars)
    const actual_price_in_cents = convertToActualPriceInCents(price_in_cents);
    const created_at = Date.now();
    // default image handling
    const image_url = formData.get('image_bypass') ? '/mockup.png' : await uploadImage(formData.get('image') as File);
    await sql`
        INSERT INTO products (user_id, product_name, price_in_cents, category, description, image_url, created_at)
        VALUES (${user_id}, ${product_name}, ${actual_price_in_cents}, ${category}, ${description}, ${image_url}, to_timestamp(${created_at} / 1000.0));
    `;
    revalidatePath(`/creators/`);
    redirect(`/creators/`);
}

export async function deleteProduct(product_id: string) {
    // Form has no data to validate
    // TODO add authentication
    await sql`
        DELETE FROM products
        WHERE product_id=${product_id};
    `;

    revalidatePath(`/`);
    redirect(`/`);
}

import { auth, signIn, signOut } from "../../auth";
import { AuthError } from "next-auth";
// Shape of Update Form Data
const UpdateFormSchema = z.object({
  product_id: z.string(),
  user_id: z.string(),
  product_name: z.string(),
  price_in_cents: z.coerce.number().positive("Price must be greater than $0."),
  category: z.string(),
  description: z.string(),
  image_url: z.string(),
  created_at: z.string(),
});

// Don't validate info user can't touch
const UpdateProduct = UpdateFormSchema.omit({
  product_id: true,
  user_id: true,
  created_at: true,
  image_url: true, // handled below
});

export async function updateProduct(
  product_id: string,
  formData: FormData
) {
  // Validate Form Data
  const { product_name, price_in_cents, category, description } =
    UpdateProduct.parse({
      product_name: formData.get("product_name"),
      price_in_cents: formData.get("price_in_cents"),
      category: formData.get("category"),
      description: formData.get("description"),
    });

  // Add in new info
  const actual_price_in_cents = convertToActualPriceInCents(price_in_cents);
  const created_at = Date.now();

  const image_bypass = formData.get('image_bypass');
  // janky image_url bypass
  if (image_bypass) {
    await sql`
            UPDATE products
            SET product_name = ${product_name}, price_in_cents = ${actual_price_in_cents}, category = ${category}, description = ${description}, created_at = to_timestamp(${created_at} / 1000.0)
            WHERE product_id = ${product_id};
        `;
  } else {
    const image_url = await uploadImage(formData.get("image") as File);
    await sql`
            UPDATE products
            SET product_name = ${product_name}, price_in_cents = ${actual_price_in_cents}, category = ${category}, description = ${description}, created_at = to_timestamp(${created_at} / 1000.0), image_url = ${image_url}
            WHERE product_id = ${product_id};
        `;
  }

  revalidatePath(`/products/${product_id}/`);
  redirect(`/products/${product_id}/`);
}

// Returns the blob url to access this image if successful (image_url)
export async function uploadImage(imageFile: File) {
  if (imageFile.size / 1024 / 1024 > 4) {
    throw new Error("Unable to upload image. (Maximum filesize: 4MB)");
  }
  if (imageFile.type.split("/")[0] !== "image") {
    throw new Error("Invalid filetype.");
  }
  try {
    const blob = await put(imageFile.name, imageFile, {
      access: "public",
    });
    return blob.url;
  } catch {
    throw new Error("Unable to upload image.");
  }
}

const CreateReviewSchema = z.object({
  rating: z.number(),
  review_text: z.string(),
  product_id: z.string(),
  user_id: z.string(),
});

export async function createReview(review: {
  rating: number;
  review_text: string;
  product_id: string;
  user_id: string;
}) {
  const { rating, review_text, product_id, user_id } = CreateReviewSchema.parse(
    {
      rating: review.rating,
      review_text: review.review_text,
      product_id: review.product_id,
      user_id: review.user_id,
    }
  );

  await sql`
        INSERT INTO review (rating, review_text, product_id, user_id)
        VALUES (${rating}, ${review_text}, ${product_id}, ${user_id});
    `;
}

export async function getUserId() {
  "use server";
  const authObj = await auth();
  const user = authObj?.user?.id;
  return user;
}

export async function logOut(
  prevState: string | undefined,
  formData: FormData
) {
  console.log(prevState, formData)
  signOut({ redirectTo: prevState });
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  "use server";
  try {
    console.log("Authenticating");
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function Register(prevState: string | undefined, formData: FormData) {
  try {
    const {username, email, password} = {
      username: formData.get("username")?.toString(),
      email: formData.get("email")?.toString(),
      password: formData.get("password")?.toString()
    }

    await sql`
      INSERT INTO users (name, email, password, image_url)
      VALUES (${username}, ${email}, ${password}, ${"/mockup.png"});
    `
  } catch (error) {
    console.log(error)
  }
}