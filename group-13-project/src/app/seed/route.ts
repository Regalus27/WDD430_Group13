import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { userProfiles, users } from '@/lib/placeholder-data';

const client = await db.connect();

async function seedUsers() {

  const insertedUsers = await Promise.all(
    users.map(async (users) => {
      const hashedPassword = await bcrypt.hash(users.password, 10);
      return client.sql`
        INSERT INTO users ( name, email, image_url, password)
        VALUES ( ${users.name}, ${users.email}, ${users.image_url}, ${hashedPassword})
      `;
    }),
  );

  return insertedUsers;
}

async function seedUserProfile() {

  const insertedUserProfile = await Promise.all(
    userProfiles.map(
      (profile) => client.sql`
        INSERT INTO user_profiles (user_id, bio, description, artstyle, instagram, facebook, pinterest)
        VALUES (${profile.user_id}, ${profile.bio}, ${profile.description}, ${profile.artstyle}, ${profile.instagram}, ${profile.facebook}, ${profile.pinterest})
      `,
    ),
  );

  return insertedUserProfile;
}

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
    await client.sql`BEGIN`;
    await seedUsers();
    await seedUserProfile();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
