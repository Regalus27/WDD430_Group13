"use client";

import { notFound, useParams } from "next/navigation";
import Image from "next/image";
// import { useState, useEffect } from "react";
import { fetchProductById } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/lib/definitions";

type params = {
  product_id: string
}

export default function ProductPage({product} : {product: Product}) {
  // const { product_id } = useParams<params>();
  // const  = params;
  // const [isMobile, setIsMobile] = useState(false);
  const isMobile = false;



  // if (!product) {
  //   return <div className="text-center text-xl font-semibold mt-10">Product not found</div>;
  // }

  return (
    <section className={`flex ${isMobile ? "flex-col" : ""} bg-[#f5f1eb] rounded-lg shadow-md w-full`}>
      {/* Left Side - Images */}
      <div className={`${isMobile ? '' : 'flex md:flex-row gap-4'} px-4`}>

        {/* Main Image */}
        <div className={`relative  gap-3 w-auto ${isMobile ? 'fixed mt-5' : 'flex md:flex-col'}`}>

          <Image
            src={product.image_url}
            alt="Main Product"
            width={400}
            height={200}
            className="w-[450px] h-auto rounded-lg shadow-lg"
          />
          {/* Guarantee Badge */}
          <div className={`absolute top-3 right-3 items-center ${isMobile ? 'p-1' : 'flex flex-col'}`}>
            <div className="relative flex flex-col items-center">
              {/* Yellow Dot */}
              <div className="w-2 h-2 bg-yellow-400 border-[2px] border-[#14132B] rounded-full z-10 relative"></div>

              {/* Left and Right Bent Strings */}
              <div className="relative h-6 flex justify-between">
                <div className="w-0.5 h-8 bg-[#14132B] absolute left-[-2px] top-[2px] rotate-[40deg] origin-top"></div>
                <div className="w-0.5 h-8 bg-[#14132B] absolute right-[-2px] top-[2px] -rotate-[40deg] origin-top"></div>
              </div>
            </div>

            {/* Badge */}
            <div className={`relative bg-[#14132B] text-white ${isMobile ? 'px-1 py-1' : 'px-4 py-2'} text-sm font-semibold rounded-md shadow-lg rotate-[-10deg] mt-[-4px]`}>
              <span className={`block ${isMobile ? 'text-sm' : ''} text-lg font-bold`}>90 days</span>
              <span className="text-yellow-400 font-bold text-xs tracking-wide">GUARANTEE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Product Details */}
      <div className="flex-1 px-4 py-4">
        <h1 className="text-2xl font-bold">{product.product_name}</h1>
        <div className="flex items-center justify-between">

          <p className="text-xl text-customBrown font-semibold mt-2">${formatPrice(product.price_in_cents)}</p>

        </div>

        <br></br>

        {/* Description */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Description</h3>
          <p className="text-sm text-gray-600 mb-20">
            Add a contemporary design and a pop of colour to a cozy seating area or your living room
            with this chaise-inspired loveseat. We love all the mid-century details from the
            low-profile back and round arm to the sleek, black-finished tapered legs.
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 space-y-3">
          <button className="w-full py-3 bg-black text-white rounded-full font-semibold hover:bg-[#333333]">
            Add To Cart
          </button>
          <button className="w-full py-3 bg-azure-900 text-white rounded-full font-semibold hover:opacity-90">
            Buy Now
          </button>
        </div>
      </div>
    </section>
  );
};