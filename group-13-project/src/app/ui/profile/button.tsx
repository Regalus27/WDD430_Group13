import { PencilIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
 
export function UpdateProfile({ id }: { id: string }) {
  return (
    <Link
      href={`/profile/create/${id}`}
      className="rounded-md border p-2 bg-primary-400 text-white hover:bg-gray-400"
    >
      <PencilIcon className="w-6" />
    </Link>
  );
}
