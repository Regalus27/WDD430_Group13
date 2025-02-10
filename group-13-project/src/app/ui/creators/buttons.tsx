import { PencilIcon, PlusIcon, TrashIcon, EyeIcon  } from '@heroicons/react/24/outline';
import { } from "@heroicons/react/24/outline";
import Link from 'next/link';

export function ViewArtist({ id }: { id: string }) {
  return (
    <Link
      href={`/creators/${id}/profile`}
      className="rounded-md border p-2 hover:bg-blue-200"
    >
      <EyeIcon className="w-6 h-6 text-gray-500" />
    </Link>
  );
}
