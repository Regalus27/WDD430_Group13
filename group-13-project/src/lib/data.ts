import { sql } from '@vercel/postgres';
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
        throw new Error("Product not found.");
    }
}
import { UserProfile} from './definitions';

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

const ITEMS_PER_PAGE = 3;
export async function fetchFilteredCreators(
  query: string,
  currentPage: number,
  ) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const creators = await sql<UserProfile>`
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
      WHERE user_profiles.user_id ILIKE ${`%${query}%`} OR
        user_profiles.name ILIKE ${`%${query}%`} OR
        user_profiles.email ILIKE ${`%${query}%`} OR
        user_profiles.description ILIKE ${`%${query}%`} OR
        user_profiles.artstyle ILIKE ${`%${query}%`} OR
      ORDER BY user_profiles.name
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return creators.rows;
  } catch (error) {
    console.error('Database Error:', error);
    // throw new Error('Failed to fetch invoices.');
  }
}



