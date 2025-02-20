"use client";

import Image from "next/image";
// import { formatPrice, isAuth } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";
import { Product, Review } from "@/lib/definitions";
import ReviewInput from "@/app/ui/reviews/review-input";
import ReviewPost from "@/app/ui/reviews/review-post";
import { addToCart, CartItem } from "@/lib/cartUtils";
import {ulid} from 'ulid'
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function ProductPage({product, reviews} : {product: Product, reviews: Review[]}) {
  const isMobile = false;
  const path = usePathname();
  const router = useRouter();

  // const auth = isAuth();
  const auth = true; // So that I can show the edit page

  return (
    <>
    <section className={`flex ${isMobile ? "flex-col" : ""} bg-[#f5f1eb] rounded-lg shadow-md w-full`}>
      {/* Left Side - Images */}
      <div className={`${isMobile ? '' : 'flex md:flex-row gap-4'}`}>

        {/* Main Image */}
        <div className={`relative  gap-3 w-auto ${isMobile ? 'fixed mt-5' : 'flex md:flex-col'}`}>

          <Image
            src={product.image_url}
            alt="Main Product"
            width={400}
            height={200}
            className="w-[450px] h-auto rounded-lg"
          />

        </div>
      </div> 

      {/* Right Side - Product Details */}
      <div className="flex-1 grid grid-rows-[auto_auto_1fr_auto] px-4 py-4">
        <h1 className="text-2xl font-bold">{product.product_name}</h1>
        <div className="items-center justify-between">

          <p className="text-xl text-customBrown font-semibold mt-2">{formatPrice(product.price_in_cents)}</p>

        </div>

        {/* Description */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Description</h3>
          <p className="text-sm text-gray-600 mb-20">
            {product.description}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-3">
          <button
            onClick={(e) => {
              e.preventDefault();
              const cartItem: CartItem = { ...product, Quantity: 1 };
              addToCart(cartItem);
            }}
            className="w-full py-3 bg-black text-white rounded-full font-semibold hover:bg-[#333333]">
            Add To Cart
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              const cartItem: CartItem = { ...product, Quantity: 1 };
              addToCart(cartItem);
              router.push("/cart");
            }}
            className="w-full py-3 bg-azure-900 text-white rounded-full font-semibold hover:opacity-90"
          >
            Buy Now
          </button>
        </div>
      </div>
    </section>
    {auth ? <Link href={path + "/edit"} className="relative inline-flex items-center rounded-md transition-all duration-300 px-4 py-2 text-normal text-white bg-primary-400 hover:bg-blue-800 hover:scale-105">Edit Page</Link> : null}
    <p>Total reviews: {reviews.length}</p>
    {false ? 
      <ReviewInput /> : 
      <div>
        <p>Please Sign In to leave review!</p>
        <a href="/login">Sign In</a>
      </div>
    }
    <div>
      {!reviews ? null : reviews.map(review => (
        <ReviewPost review={review} key={ulid()}/>
      ))}
    </div>
    </>
  );
};