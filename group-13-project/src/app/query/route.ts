
import { sql } from '@vercel/postgres';

import { UserProfileRaw } from "@/lib/definitions";

export async function fetchArtistById(){
  const id = '891ccb08-e0b6-4aba-a439-33154b58dff0'
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
    console.log(artist);
    return artist;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

async function listUserProfile() { 
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
}


export async function GET() {

  try {
  	return Response.json(await fetchArtistById());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
