'use client';

// import { isAuth } from "@/lib/utils";
import Link from "next/link";

export default function CreateProductLink() {
    // Only show button to authorized users
    // Ideally we would be able to check if the logged in user owns this page
    const showLink: boolean = true; // isAuth(); // compare user_id to auth user_id

    if (showLink) {
        return (
            <div className="mt-6">
                {/** Link to Create Product Form */}
                <Link
                    href={"/products/create"}
                    className="relative inline-flex items-center rounded-md transition-all duration-300 px-4 py-2 text-normal text-white bg-primary-400 hover:bg-blue-800 hover:scale-105"
                >Create Product Listing</Link>
            </div>
        );
    } else {
        return;
    }
}