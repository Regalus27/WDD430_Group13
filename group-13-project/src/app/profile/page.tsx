import { fetchArtistById } from "@/app/lib/data";
import ProfileForm from "./profileForm";
import { notFound } from "next/navigation";

export default async function ProfilePage() {

  const user_id = "891ccb08-e0b6-4aba-a439-33154b58dff0"
  const artist = await fetchArtistById(user_id)

  if (!artist) notFound();

  return <ProfileForm artist={artist}/>
}