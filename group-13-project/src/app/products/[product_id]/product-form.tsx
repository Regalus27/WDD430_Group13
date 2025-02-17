"use client";

import Image from "next/image";
import { formatPrice } from "@/app/lib/utils";
import { Product, Review } from "@/app/lib/definitions";
import ReviewInput from "@/app/ui/reviews/review-input";
import ReviewPost from "@/app/ui/reviews/review-post";
import {ulid} from 'ulid'

export default function ProductPage({product, reviews} : {product: Product, reviews: Review[]}) {
  const isMobile = false;

  console.log(reviews)

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
          {/* Guarantee Badge 
          <div className={`absolute top-3 right-3 items-center ${isMobile ? 'p-1' : 'flex flex-col'}`}>
            <div className="relative flex flex-col items-center">
              {/* Yellow Dot 
              <div className="w-2 h-2 bg-yellow-400 border-[2px] border-[#14132B] rounded-full z-10 relative"></div>

              {/* Left and Right Bent Strings 
              <div className="relative h-6 flex justify-between">
                <div className="w-0.5 h-8 bg-[#14132B] absolute left-[-2px] top-[2px] rotate-[40deg] origin-top"></div>
                <div className="w-0.5 h-8 bg-[#14132B] absolute right-[-2px] top-[2px] -rotate-[40deg] origin-top"></div>
              </div>
            </div> 

            {/* Badge 
            <div className={`relative bg-[#14132B] text-white ${isMobile ? 'px-1 py-1' : 'px-4 py-2'} text-sm font-semibold rounded-md shadow-lg rotate-[-10deg] mt-[-4px]`}>
              <span className={`block ${isMobile ? 'text-sm' : ''} text-lg font-bold`}>90 days</span>
              <span className="text-yellow-400 font-bold text-xs tracking-wide">GUARANTEE</span>
            </div>
          </div>*/}

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
        <div className="mt-6 space-y-3 grid grid-cols-2 gap-5">
          <button className="w-full py-3 bg-inherit border-secondary-600 border-2 text-secondary-600 rounded-xl font-semibold h-full hover:bg-secondary-600 hover:text-white">
            Add to Cart
          </button>
          <button className="w-full py-3 bg-primary-600 text-white rounded-xl font-semibold h-full hover:bg-primary-800">
            Buy Now
          </button>
        </div>
      </div>
    </section>
    <p>Total reviews: {reviews.length}</p>
    <ReviewInput />
    <div>
      {!reviews ? null : reviews.map(review => (
        <ReviewPost review={review} key={ulid()}/>
      ))}
    </div>
    </>
  );
};