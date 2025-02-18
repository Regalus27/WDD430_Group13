'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';

const ProfileFormSchema = z.object({
    user_id: z.string(),
    bio: z.string(),
    description: z.string(),
    artstyle: z.string(),
    instagram: z.string(),
    facebook: z.string(),
    pinterest: z.string(),
});

// Don't validate info user can't touch
const UpdateProfile = ProfileFormSchema.omit({
  user_id: true
});

export type State = {
    errors?: {
    bio: string;
    description: string;
    artstyle: string;
    instagram: string;
    facebook: string;
    pinterest: string;
    };
    message?: string | null;
  };

export async function updateProfile(id: string, formData: FormData) {
   // Validate Form Data
   const validatedFields = UpdateProfile.safeParse({
    bio: formData.get("bio") || "Default Bio",
    description: formData.get('description'),
    artstyle: formData.get('artstyle'),
    instagram: formData.get('instagram'),
    facebook: formData.get('facebook'),
    pinterest: formData.get('pinterest'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Validation failed. Please check the fields.",
    };
  }

  const { bio, description, artstyle, instagram, facebook, pinterest } = validatedFields.data;

  try{
    await sql`
      UPDATE user_profiles
      SET user_id = ${id}, bio = ${bio}, description = ${description}, artstyle = ${artstyle},  instagram = ${instagram}, facebook = ${facebook}, pinterest= ${pinterest}
      WHERE user_id = ${id};
    `;
    
  } catch {
    return { message: 'Database Error: Failed to Update Profile.' };
  }
  revalidatePath(`/profile/${id}`);
  redirect(`/profile/${id}`);
} 

