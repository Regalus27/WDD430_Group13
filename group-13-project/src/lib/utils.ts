import { sql } from '@vercel/postgres';
import { User } from "./definitions";

// import { UserProfile } from "@/lib/definitions";

// export async function fetchArtistById() {
//   const id = '891ccb08-e0b6-4aba-a439-33154b58dff0'
//   try {
//     const data = await sql<UserProfile>`
//       SELECT 
//         users.user_id,
//         users.name,
//         users.email,
//         users.image_url,
//         user_profiles.bio,
//         user_profiles.description,
//         user_profiles.artstyle,
//         user_profiles.instagram,
//         user_profiles.facebook,
//         user_profiles.pinterest
//       FROM users
//       LEFT JOIN user_profiles ON users.user_id = user_profiles.user_id
//       WHERE users.user_id = ${id};
//     `;
//     if (!data || data.rows.length === 0) {
//       return null; // No artist found, return null
//     }
//     const artist = data.rows[0];
//     return artist;
//   } catch (error) {
//     console.error('Database Error:', error);
//     return;
//     throw new Error('Error fetching artist. Error: ' + error);
//   }
// }

export async function fetchUsers() {
 
  try {
    const data = await sql<User>`
      SELECT *
      FROM users;
    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

// Convert form price data to database format
export const convertToActualPriceInCents = (price: number) => {
  return Math.round(price * 100);
};

export const formatPrice = (price: number) => {
  // Requires item prices to be stored in cents.

  if (price < 0) {
      price *= -1;
  }

  return (price / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
