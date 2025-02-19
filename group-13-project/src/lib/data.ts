import { sql } from '@vercel/postgres';
import { Product, Review, UserProfile } from './definitions';


// returns an array of strings representing the categories products can be sorted into.
export function fetchProductCategories() {
    // Imperfect, but its 2am. In a real application, I would use enum_range(null::category_enum) to get the values and pull from that.
    // Or I'll end up doing that next week if we want to add more categories.
    return ['Art & Collectibles', 'Bath & Beauty', 'Books, Movies & Music', 'Clothing & Accessories', 'Electronics', 'Home & Living', 'Toys & Games'];
}

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


export async function fetchProductByUserId(user_id: string) {
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
          WHERE products.user_id = ${user_id};
      `;
      
      return data.rows.flat();
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
        products.description,
        products.image_url,
        products.created_at,
        users.name
      FROM products
      LEFT JOIN users ON products.user_id = users.user_id;
    `;
    return data.rows.flat();
  } catch (error) {
    throw new Error("Error fetching products. Message: " + error)
  }
}

export async function fetchNewestProduct() {
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
      ORDER BY created_at;
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

export async function fetchReviewByProductId(id: string) {
  try {
    const data = await sql<Review[]>`
      SELECT
        review.rating,
        review.review_text,
        review.product_id,
        users.name,
        users.image_url
      FROM review
      LEFT JOIN users ON review.user_id = users.user_id
      WHERE review.product_id = ${id}; 
    `

    if(!data || data.rows.length === 0) {
      return []
    }
    return data.rows.flat()
  } catch (error) {
    throw new Error('Failed to fetch review: ' + error)
  }
}


