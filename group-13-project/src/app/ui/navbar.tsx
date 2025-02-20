"use client";

// import clsx from 'clsx';
import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { usePathname } from "next/navigation";
import { RiMenuLine, RiCloseLargeFill } from "react-icons/ri";
import { getUserId } from "@/lib/actions";
import clsx from "clsx";

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<string>();
  const inCart = 0;


  useEffect(()=> {
    getUserId().then(id => {
      setUser(id);
    })
  })



  return (
    <nav
      className={`
      bg-azure-900
      text-seafoam-100
      my-10
      px-5
      rounded-lg
    `}
    >
      <div className="grid grid-cols-[auto_1fr] items-center">
        <Link href={"/"}>
          <Logo
            height={75}
            width={125}
            className="hover:text-primary-300 h-20 md:h-25"
          />
        </Link>
        <div className={"hidden md:flex justify-between"}>
          <div className="flex flex-col md:flex-row justify-between">
            <Link
              href="/"
              className={pathname === "/" ? "underline text-orange-500" : ""}
            >
              Home
            </Link>
            <Link
              href="/browse"
              className={
                pathname.includes("/browse") ? "underline text-orange-500" : ""
              }
            >
              Browse
            </Link>
            <Link
              href="/creators"
              className={
                pathname.includes("/creators")
                  ? "underline text-orange-500"
                  : ""
              }
            >
              Creators
            </Link>
          </div>
          <div className="grid md:grid-cols-2 grid-rows-2 md:grid-rows-1 md:col-end-5">
            <div className={clsx("relative m-auto", )}>
              <p className="bg-red-500 px-3 py-1 scale-70 text-white aspect-1/1 absolute rounded-full z-1 right-[-15px] top-[-20px] hidden">{inCart}</p>
              <Link
                href="/cart"
                className={clsx("z-2 relative",
                  pathname === "/cart" ? "underline text-orange-500" : ""
                )}
              >
                Cart
              </Link>
            </div>
            {user ? (
              <Link
                href="/profile"
                className={
                  pathname === "/profile" ? "underline text-orange-500" : ""
                }
              >
                Profile
              </Link>
            ) : (
              <Link
                href="/login"
                className={
                  pathname === "/login" ? "underline text-orange-500" : ""
                }
              >
                Login
              </Link>
            )}
          </div>
        </div>
        <button
          onClick={() => {
            setIsOpen((openState) => !openState);
          }}
          className="md:hidden justify-self-end p-3 mr-3 bg-inherit scale-150"
        >
          {isOpen ? <RiCloseLargeFill /> : <RiMenuLine />}
        </button>
      </div>
      {isOpen ? 
        <div className="md:hidden flex flex-col items-end pb-6">
          <Link
            href="/"
            className={pathname === "/" ? "underline text-orange-500" : ""}
          >
            Home
          </Link>
          <Link
            href="/browse"
            className={
              pathname.includes("/browse") ? "underline text-orange-500" : ""
            }
          >
            Browse
          </Link>
          <Link
            href="/creators"
            className={
              pathname.includes("/creators") ? "underline text-orange-500" : ""
            }
          >
            Creators
          </Link>

          <Link
            href="/cart"
            className={pathname === "/cart" ? "underline text-orange-500" : ""}
          >
            Cart
          </Link>
          {user ? (
            <Link
              href="/profile"
              className={
                pathname === "/profile" ? "underline text-orange-500" : ""
              }
            >
              Profile
            </Link>
          ) : (
            <Link
              href="/login"
              className={pathname === "/login" ? "underline text-orange-500" : ""}
            >
              Login
            </Link>
          )}
        </div> : null
      }
    </nav>
  );
}
