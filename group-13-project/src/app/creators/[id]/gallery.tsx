"use client";

import { useState, Suspense } from "react";
import type { Product } from "@/lib/definitions";
import { CardGrid } from "../../ui/cards/card-grid";

// TODO: We need to add more options to filter by. Eg. Material (wood, metal, etc), Medium(Oil Painting, jewlery, Sculpter), Theme (Nature, Industrial, Romance, Anime)
// TODO: Replace useStates and use formData instead

export const ProductGallery = ({products}: { products: Product[]}) => {

  if (!products) return <div>Products Not Found!</div>;
  // Count products in each category and dietary option

  return (
    <div>
      {/* <h2 className="text-center text-3xl mt-6 font-bold">Creator's Products</h2> */}
      <section
        className={`${"w-full flex flex-col md:flex-row gap-2 lg:gap-10 px-4 py-10"}`}
      >

        <div className="h-auto "></div>

        {/* Main Product Grid */}
        <div className={"w-full"}>
          <Suspense>
            <CardGrid data={products} itemsPerPage={6} />
          </Suspense>
        </div>
      </section>
    </div>
  );
};

export default ProductGallery;


