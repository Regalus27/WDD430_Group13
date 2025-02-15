'use client'

// import clsx from 'clsx';
import Link from "next/link";
import { Logo } from './Logo'
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  return (
    <nav className={`
      bg-azure-900
      text-seafoam-100
        gap-4
        grid
        grid-cols-[auto_minmax(150px,_300px)_1fr_minmax(100px,_150px)]
        justify-center
        items-center max-w-[1200px]
        my-10
        px-5
        rounded-lg`
    }>
      {/* <Image alt="Handcraft Haven Logo" src='/hh-logo.svg' height="100" width="250" className="text-cyan-400" priority/> */}
      <Link href={'/'}>
        <Logo height={75} width={125} className="hover:text-primary-300" />
      </Link>
      <div className="flex flex-row justify-between">
        <Link href="/" className={pathname === "/" ? "underline text-orange-500" : ""}>Home</Link>
        <Link href="/browse" className={pathname.includes("/browse") ? "underline text-orange-500" : ""}>Browse</Link>
        <Link href="/creators" className={pathname.includes("/creators") ? "underline text-orange-500" : ""}>Creators</Link>
      </div>
      <div className="grid grid-cols-2 col-end-5">
        <Link href="/cart" className={pathname === "/cart" ? "underline text-orange-500" : ""}>Cart</Link>
        {true
          ? <Link href="/profile" className={pathname === "/profile" ? "underline text-orange-500" : ""}>Profile</Link>
          : <Link href="/login" className={pathname === "/login" ? "underline text-orange-500" : ""}>Login</Link>
        }
      </div>
    </nav>
  )
}