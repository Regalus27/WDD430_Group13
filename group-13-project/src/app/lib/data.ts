import { sql } from '@vercel/postgres';
import { User, UserProfile, FormattedUseProfileTable } from './definitions';

export async function fetchUserProfiles() {
  try {
    const data = await sql<FormattedUseProfileTable>`
      SELECT 
          users.name,
          users.email,
          users.image_url,
          users.password,
          users.id AS user_id,
          userprofiles.bio,
          userprofiles.description,
          userprofiles.workshop,
          userprofiles.artStyle,
          userprofiles.instagram,
          userprofiles.facebook,
          userprofiles.pinterest
      FROM users
      JOIN userprofiles ON users.id = userprofiles.user_id;
      `;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user profiles.');
  }
}



