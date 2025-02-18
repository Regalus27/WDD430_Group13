import { userProfiles, users } from '@/lib/placeholder-data';
import { sql } from '@vercel/postgres';
import { User } from '@/lib/definitions';
import { NextResponse } from 'next/server';

async function seedUsers() {
  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      // const hashedPassword = await bcrypt.hash(user.password, 10);
      const hashedPassword = user.password;
      return sql<User>`
        INSERT INTO users (name, email, image_url, password)
        VALUES (${user.name}, ${user.email}, ${user.image_url}, ${hashedPassword})
      `;
    })
  );
  return insertedUsers;
}


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

async function seedUserProfile(userIds: string[]) {
  const insertedUserProfile = await Promise.all(
      userProfiles.map((profile, index) =>
          sql`
              INSERT INTO user_profiles (user_id, bio, description, workshop, artstyle, instagram, facebook, pinterest)
              VALUES (${userIds[index]}, ${profile.bio}, ${profile.description}, ${profile.workshop}, ${profile.artstyle}, ${profile.instagram}, ${profile.facebook}, ${profile.pinterest})
          `
      )
  );

  return insertedUserProfile;
}

export async function GET() {
  try {
    await sql`BEGIN`;

    // Fetch users and extract their IDs
    const users = await fetchUsers();
    const userIds = users.map(user => user.user_id); // Extract only the IDs

    // console.log("User IDs:", userIds); 

    await seedUserProfile(userIds); // Pass extracted IDs
    await sql`COMMIT`;

    return NextResponse.json({ message: "Database seeded successfully" });
  } catch (error) {
    await sql`ROLLBACK`;

    console.error("Error seeding database:", error); // Log full error for debugging

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
  }
}
