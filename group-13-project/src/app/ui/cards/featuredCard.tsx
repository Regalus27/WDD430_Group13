'use client'

import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { Product } from "@/lib/definitions";
import Link from "next/link";
import { addToCart, CartItem } from "@/lib/cartUtils";


export default function FeaturedCard({ item }: { item: Product }) {
  /**
   * Things that need fixed:
   * - Use proper font
   * - Use proper color scheme
   * - Add a hover effect
   * - Link to an item page (requires item page to be built)
   */
  return (
    <div className="grid grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-[auto_1fr] gap-2 bg-azure-900 text-seafoam-100 h-max">
      <Link href={`/products/${item.product_id}`}>
        <Image
          className="w-full sm:mt-10 md:mt-0 sm:w-max md:w-full object-cover min-h-[150px] place-self-center md:place-self-start"
          alt=""
          src={item.image_url}
          height={400}
          width={400}
        />
      </Link>
      <div className="p-4 grid h-full grid-rows-[auto_auto_1fr_auto]">
        <h2 className="text-2xl md:text-4xl">{item.product_name}</h2>
        <p>{formatPrice(item.price_in_cents)}</p>
        <div className="my-5">
          <h3 className="text-2xl">Description</h3>
          <p>{item.description || "No Description Given..."}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5 min-h-[60px]">
          <button
            onClick={(e) => {
              e.preventDefault();
              const cartItem: CartItem = { ...item, Quantity: 1 };
              addToCart(cartItem);
            }}
            className="bg-primary-500 text-seafoam-100 px-1 py-2 rounded-md">
            Add to Cart!
            </button>
            {/* <button className="bg-primary-500 text-seafoam-100 px-5 py-2 rounded-md">
            Learn More!
            </button> */}
        </div>
      </div>
    </div>
  );
}
