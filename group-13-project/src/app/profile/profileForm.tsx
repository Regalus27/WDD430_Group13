'use client'
// import { fetchArtistById, fetchUserProfiles } from "@/lib/data";
import { UserProfile } from "@/lib/definitions";
import Image from "next/image";
import Link from "next/link";
// import { notFound } from "next/navigation";
import React, { useState } from "react";
// import { RiEmotionSadLine } from "react-icons/ri";


export default function ProfilePage({artist}: {artist: UserProfile}) {

  //eslint-disable-next-line
  const [form, setForm] = useState({
    email: artist.email,
    name: artist.name,
    password: "",
  })

  function handleSubmit(formData: FormData) {
    // TODO: validate and update values in DB

    // console.log(formData.entries().toArray().toString())
    console.log(formData.get("email"))
    return
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-4xl my-5 font-bold">Username</h1>
      <Image src={"/mockup.png"} alt="profile image" width={100} height={100} className="mb-10 w-60 h-auto" />
      
      <form action={handleSubmit} className="grid grid-cols-[auto_1fr] gap-5 items-center" id="form">
        
          <label htmlFor="image">Update Profile Image: </label>
          <input type="file" name="image" id="image" accept="image/*"/>
        
          <label htmlFor="username">Change Username: </label>
          <input type="text" inputMode="text" name="username" id="username" defaultValue={form.name}/>
        
          <label htmlFor="email">Change Email: </label>
          <input type="text" inputMode="email" name="email" id="email" defaultValue={form.email}/>
        
          <label htmlFor="password">Password: </label>
          <input type="password" inputMode="text" name="password" id="password"/>

        <div></div>
        <button type="submit" className="max-w-50">Save</button>
      </form>

      <Link href={`/creators/${artist.user_id}`} className="text-primary-600 bg-azure-50 border-primary-500 border-2 px-5 py-3 mt-10" >Go To Creator Page</Link>
      <Link href={"/logout"} className="text-white bg-red-600 px-5 py-3 mt-10" >Logout</Link>
    </div>
  )
}