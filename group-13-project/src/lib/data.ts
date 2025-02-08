import { sql } from '@vercel/postgres';
import { UserProfileRaw} from './definitions';

export async function fetchUserProfiles() {
  try {
    // Join `users` and `userprofiles` tables
    const data = await sql<UserProfileRaw>`
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
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user profiles.");
  }
}


export async function fetchArtistById(id: string) {
 
  try {
    const data = await sql<UserProfileRaw>`
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
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}




