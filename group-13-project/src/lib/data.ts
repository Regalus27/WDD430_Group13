import { sql } from '@vercel/postgres';
import { CardData, Product, UserProfile } from './definitions';


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
                products.image_url,
                products.created_at
            FROM products
            WHERE products.product_id = ${product_id};
        `;
        const product = data.rows.map((product) => ({
            ...product
        }));

        return product[0];
    } catch (error) {
        console.error(error);
        // throw new Error("Product not found.");
    }
}

export async function fetchProducts() {
  try {
    const data = await sql<Product[]>`
      SELECT
        products.product_id,
        products.user_id,
        products.product_name,
        products.price_in_cents,
        products.category,
        products.image_url,
        products.created_at,
        users.name
      FROM products
      LEFT JOIN users ON products.user_id = users.user_id
    `;
    return data.rows.flat();
  } catch (error) {
    throw new Error("Error fetching products. Message: " + error)
  }
}

export async function fetchNewestProduct() {
  try {
    const data = await sql<CardData[]>`
      SELECT
        products.product_id,
        products.user_id,
        products.product_name,
        products.price_in_cents,
        products.category,
        products.image_url,
        products.created_at,
        users.name
      FROM products
      LEFT JOIN users ON products.user_id = users.user_id
      ORDER BY created_at
    `
    return data.rows;
  } catch (error) {
    throw new Error("Error fetching products. Message: " + error)
  }
}

export async function fetchUserProfiles() {
  try {
    // Join `users` and `userprofiles` tables
    const data = await sql<UserProfile>`
    SELECT 
      users.user_id,
      users.name,
      users.email,
      users.image_url,
      user_profiles.bio,
      user_profiles.description,
      user_profiles.artstyle,
      user_profiles.instagram,
      user_profiles.facebook,
      user_profiles.pinterest
    FROM users
    LEFT JOIN user_profiles ON users.user_id = user_profiles.user_id;
  `;

    return data.rows;
    // eslint-disable-next-line
  } catch (error) {
    throw new Error("Failed to fetch user profiles.");
  }
}


export async function fetchArtistById(id: string) {
 
  try {
    const data = await sql<UserProfile>`
      SELECT 
        users.user_id,
        users.name,
        users.email,
        users.image_url,
        user_profiles.bio,
        user_profiles.description,
        user_profiles.artstyle,
        user_profiles.instagram,
        user_profiles.facebook,
        user_profiles.pinterest
      FROM users
      LEFT JOIN user_profiles ON users.user_id = user_profiles.user_id
      WHERE users.user_id = ${id};
    `;
    if (!data || data.rows.length === 0) {
      return null; // No artist found, return null
    }
    const artist = data.rows[0];
    return artist;
  } catch (error) {
    throw new Error(`Failed to fetch artist by ID: ${error}`);
  }
}




