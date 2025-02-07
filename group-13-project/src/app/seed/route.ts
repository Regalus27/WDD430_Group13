import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { userProfiles, users } from '../lib/placeholder-data';

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      image_url TEXT,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, email, image_url, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${user.image_url}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedUserProfile() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS userprofiles (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      bio VARCHAR(255) NOT NULL,
      description VARCHAR(255) NOT NULL,
      workshop VARCHAR(255) NOT NULL,
      artStyle VARCHAR(255) NOT NULL,
      instagram VARCHAR(255) NOT NULL,
      facebook VARCHAR(255) NOT NULL,
      pinterest VARCHAR(255) NOT NULL
    );
  `;

  const insertedUserProfile = await Promise.all(
    userProfiles.map(
      (profile) => client.sql`
        INSERT INTO userprofiles (user_id, bio, description, workshop, artStyle, instagram, facebook, pinterest)
        VALUES (${profile.user_id}, ${profile.bio}, ${profile.description}, ${profile.workshop}, ${profile.artStyle}, ${profile.instagram}, ${profile.facebook}, ${profile.pinterest})
        ON CONFLICT (id) DO NOTHING;
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
