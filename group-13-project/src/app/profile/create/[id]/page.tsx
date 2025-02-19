
import { notFound } from 'next/navigation';
import { fetchArtistById } from '@/lib/data';
import EditProfileForm from '@/app/ui/profile/edit-profile-form';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Edit Profile',
};

export default async function Page(props: {params: Promise<{id: string}>}) {
    const params = await props.params;
    const id = params.id;
    const [creator] = await Promise.all([
      fetchArtistById(id),
    ]);
    
  if (!creator) {
    notFound(); // Handle not found error
  }

  const profileForm = {
    user_id: creator.user_id,
    bio: creator.bio,
    description: creator.description,
    artstyle: creator.artstyle,
    instagram: creator.instagram,
    facebook: creator.facebook,
    pinterest: creator.pinterest,
    image_url: creator.image_url,
  };

  return (
    
      <EditProfileForm profile={profileForm} />
    
  );
}
