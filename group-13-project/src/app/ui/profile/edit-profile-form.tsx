'use client';

import { useState } from 'react';
import { updateProfile } from '@/app/ui/profile/actions'; // Import the server-side action
import {ProfileForm} from '@/lib/definitions';
import ImageUploadComponent from '../imageForm/imageUploadComponent';

interface State {
  message: string | null;
  errors: Record<string, string | null>;
}

export default function EditProfileForm({ 
  profile 
  }: { 
    profile: ProfileForm;
  }) {
  const [state] = useState<State>({
    message: null,
    errors: {
      bio: null,
      description: null,
      artstyle: null,
      instagram: null,
      facebook: null,
      pinterest: null,
    },
  });

  const handleSubmit = (formData: FormData) => {
    if (!formData) {
      return;
    }

    const bypassElement = document.getElementById("image_bypass") as HTMLInputElement;

    if (!bypassElement.checked) {
      // filesize validation
      // Yes these are bad ways to send user feedback maybe I'll change them to something if I magically get time
      const imageFile: File = formData.get('image') as File;
      if (imageFile.type.split('/')[0] !== 'image') {
        alert("Image must be an image.");
        return;
      }
      if (imageFile.size / 1024 / 1024 > 500) {
        alert("Image must be less than 500MB.");
        return;
      }
    }

    updateProfileWithId(formData);
  }

  const updateProfileWithId = updateProfile.bind(null, profile.user_id);
  
  return (
    <div className=" w-full border-b py-3 last-of-type:border-none ">
      <div className="mt-6 flow-root">

      <form action={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>

        {/* Bio */}
        <div className="mb-4">
          <label htmlFor="bio" className="block text-sm font-medium">Bio</label>
          <textarea
            id="bio"
            name="bio"
            defaultValue={profile.bio}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
          {state.errors.bio && <p className="text-red-500 text-xs mt-1">{state.errors.bio}</p>}
        </div>

        {/* description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            rows = {10}
            defaultValue={profile.description}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
          {state.errors.description && <p className="text-red-500 text-xs mt-1">{state.errors.description}</p>}
        </div>

        {/* artstyle */}
        <div className="mb-4">
          <label htmlFor="artstyle" className="block text-sm font-medium">Artstyle</label>
          <textarea
            id="artstyle"
            name="artstyle"
            defaultValue={profile.artstyle}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
          {state.errors.artstyle && <p className="text-red-500 text-xs mt-1">{state.errors.artstyle}</p>}
        </div>

        {/** Component to manage images and the vercel blob */}
        <ImageUploadComponent></ImageUploadComponent>

        {/* instagram */}
        <div className="mb-4">
          <label htmlFor="instagram" className="block text-sm font-medium">Instagram</label>
          <input type="text"
            id="instagram"
            name="instagram"
            defaultValue={profile.instagram}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
          {state.errors.instagram && <p className="text-red-500 text-xs mt-1">{state.errors.instagram}</p>}
        </div>

        {/* facebook */}
        <div className="mb-4">
          <label htmlFor="facebook" className="block text-sm font-medium">Facebook</label>
          <input type="text"
            id="facebook"
            name="facebook"
            defaultValue={profile.facebook}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
          {state.errors.facebook && <p className="text-red-500 text-xs mt-1">{state.errors.facebook}</p>}
        </div>

        {/* pinterest */}
        <div className="mb-4">
          <label htmlFor="pinterest" className="block text-sm font-medium">Pinterest</label>
          <input type="text"
            id="pinterest"
            name="pinterest"
            defaultValue={profile.pinterest}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
          {state.errors.pinterest && <p className="text-red-500 text-xs mt-1">{state.errors.pinterest}</p>}
        </div>

        {/* Additional fields for description, artstyle, etc. */}

        {/* Action Buttons */}
        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Changes</button>
      </div>
    </form>
    </div>
    </div>
  );
}
