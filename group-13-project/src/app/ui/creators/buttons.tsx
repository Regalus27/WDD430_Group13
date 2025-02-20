import Link from 'next/link';
import clsx from 'clsx';

export function BtnViewCreator({ id, variant='text'}: { id: string; variant?: 'icon' | 'text' }) {
  return (
    <Link
      // href={`/profile/${id}`}
      href={`/creators/${id}`}

      className={clsx(
        'relative inline-flex items-center rounded-md transition-all duration-300 px-4 py-2 text-normal text-white bg-primary-400 hover:bg-blue-800 hover:scale-105',
        {
        'px-4 py-4':variant === 'icon',
        }
      )}
      
    >
       {variant === 'icon' ? 'View' : '🎨 View'}
    </Link>
  );
}

export function BtnViewProfile({ id, variant='text'}: { id: string; variant?: 'icon' | 'text' }) {
  return (
    <Link
      href={`/profile/${id}`}
      className={clsx(
        'relative inline-flex items-center rounded-md transition-all duration-300 px-4 py-2 text-normal text-white bg-primary-400 hover:bg-blue-800 hover:scale-105',
        {
        'px-4 py-4':variant === 'icon',
        }
      )}
      
    >
       {variant === 'icon' ? 'Profile' : 'View Profile'}
    </Link>
  );
}