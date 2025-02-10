import { EyeIcon  } from '@heroicons/react/24/outline';
import Link from 'next/link';

export function ViewArtist({ id }: { id: string }) {
  return (
    <Link
      href={`/creators/${id}/profile`}
      className="bg-blue-300 rounded-md border p-2 hover:bg-green-400"
    > 
      <EyeIcon className="w-6 h-4 text-gray-500" />
    </Link>
  );
}
