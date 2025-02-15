


// async function listUserProfile() { 
//     // Join `users` and `userprofiles` tables
//     const data = await sql<UserProfileRaw>`
//     SELECT 
//       users.user_id,
//       users.name,
//       users.email,
//       users.image_url,
//       user_profiles.bio,
//       user_profiles.description,
//       user_profiles.artstyle,
//       user_profiles.instagram,
//       user_profiles.facebook,
//       user_profiles.pinterest
//     FROM users
//     LEFT JOIN user_profiles ON users.user_id = user_profiles.user_id;
//   `;

// 	return data.rows;
// }


export async function GET() {

  try {
    const artist = {};//await fetchArtistById();
  	return Response.json(artist);
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
