
import { fetchArtistById } from '@/lib/data'; 
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { FaFacebook, FaInstagram, FaPinterest } from "react-icons/fa";
import Image from 'next/image';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = params.id;
  const artistData = await fetchArtistById(id);

  return {
    title: artistData?.name || "Creator not found",
  };
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const artistData = await fetchArtistById(id);
    if (!artistData) {
      notFound();
    }

  return (
    <div className="p-8 min-h-screen flex flex-col items-center text-black bg-grey-800">
      <h1 className="text-4xl font-extrabold mb-4">{artistData.name}</h1>

      <Image
        src={'/mockup.png'}
        className="mr-2 w-40 h-40 rounded-full border-4 border-white shadow-lg mb-4"
        width={28}
        height={28}
        alt={`${artistData.name}'s profile picture`}
      />

      <p className="text-lg italic">{artistData.artstyle || "Art style not specified"}</p>
      <p className="text-md mt-2">{artistData.bio || "No bio available."}</p>
      <p className="text-md mt-2">{artistData.description || "No description available."}</p>
      <div className="flex justify-around mt-4">
            <a href={artistData.instagram} target="_blank" className="text-pink-600">
              <FaInstagram size={28} />
            </a>
            <a href={artistData.facebook} target="_blank" className="text-blue-600">
              <FaFacebook size={28} />
            </a>
            <a href={artistData.pinterest} target="_blank" className="text-red-600">
              <FaPinterest size={28} />
            </a>
          </div>
    </div>
  );
}
