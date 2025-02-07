import { db } from "@vercel/postgres";

const client = await db.connect();

async function listUserProfile() { 
    // Join `users` and `userprofiles` tables
    const data = await client.sql`
    SELECT 
      users.id AS user_id,
      users.name,
      users.email,
      users.image_url,
      userprofiles.bio,
      userprofiles.description,
      userprofiles.workshop,
      userprofiles.artStyle,
      userprofiles.instagram,
      userprofiles.facebook,
      userprofiles.pinterest
    FROM users
    LEFT JOIN userprofiles ON users.id = userprofiles.user_id;
  `;

	return data.rows;
}



export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
  	return Response.json(await listUserProfile());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
