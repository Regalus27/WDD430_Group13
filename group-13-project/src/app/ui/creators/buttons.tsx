import { EyeIcon  } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function BtnViewArtist({ id }: { id: string }) {
  return (
    <Link
      href={`/creators/${id}`}
      className="relative inline-flex items-center justify-center p-3 rounded-md bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,105,180,0.6)]"
    > 
      <EyeIcon className="w-8 h-6 " />
    </Link>
  );
}
export function BtnViewArtistDesktop({ id }: { id: string }) {
  return (
    <Link
      href={`/creators/${id}`}
      className="relative inline-flex items-center px-6 py-3 text-lg text-white transition-all duration-300 ease-in-out transform bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full hover:scale-105 hover:shadow-2xl"
  >
    🎨 View Artist
  </Link>
  );
}
