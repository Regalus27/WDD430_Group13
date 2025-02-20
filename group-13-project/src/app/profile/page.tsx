import ProfileForm from "./profileForm";
import { notFound } from "next/navigation";
import { auth, signOut } from "../../../auth";


export default async function ProfilePage() {
  const user = (await auth())?.user

  async function logout () {
    'use server'
    console.log("Sign Out")
    await signOut({redirectTo: "/"});
  }
    

  if (!user) notFound();

  return <ProfileForm user={user!} logout={logout}/>
}