
import { fetchArtistById } from '@/lib/data'; 
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { FaFacebook, FaInstagram, FaPinterest } from "react-icons/fa";
import Image from 'next/image';

export async function generateMetadata(props: { params: { id: string } }): Promise<Metadata> {
  const params = await props.params;
  const artistData = await fetchArtistById(params.id);

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

    <div className=" py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center space-x-6">
          <img
            src={'/mockup.png'}
            alt={artistData.name}
            className="w-32 h-32 rounded-full border-4  border-yellow-400 object-cover"
          />
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">{artistData.name}</h1>
            <p className="text-sm text-gray-600">{artistData.email}</p>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mt-6">
          <p className="text-xl text-gray-800">{artistData.bio}</p>
    
          <p className="mt-2 text-gray-600">{artistData.description}</p>
        </div>

        {/* Art Style */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900">Art Style:</h3>
          <p className="text-gray-700">{artistData.artstyle}</p>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-around mt-6">
            <a href={artistData.instagram} target="_blank" className="text-pink-600 transform hover:scale-135 transition duration-500">
              <FaInstagram size={30} />
            </a>
            <a href={artistData.facebook} target="_blank" className="text-blue-600 transform hover:scale-135 transition duration-500">
              <FaFacebook size={30} />
            </a>
            <a href={artistData.pinterest} target="_blank" className="text-red-600 transform hover:scale-135 transition duration-500">
              <FaPinterest size={30} />
            </a>
          </div>
      </div>
    </div>

    
  );
}
