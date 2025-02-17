"use client";

// import Image from "next/image"
import type { Product } from "@/lib/definitions";
import { ProductCard } from "./product-card";
import { useState } from "react";

/*
  TODO: Pagination
  TODO: 
*/

export function CardGrid({data, itemsPerPage}: { data: Array<Product>, itemsPerPage: number }) {  
  const [currentPage, setCurrentPage] = useState(1);


  // Pagination Logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedProducts = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div
        className={"grid gap-2"}
        style={{ gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))` }}
      >
        {paginatedProducts.map((item: Product) => {
          return <ProductCard key={item.product_id} data={item} />;
        })}
        {/* Pagination Controls */}
      </div>
        <div className="flex justify-between items-center mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="pr-2 py-2 border rounded-md flex items-center gap-2 disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>

          <div className="flex gap-2">
            {totalPages > 0 ? (
              Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 rounded-full ${
                    currentPage === index + 1 ? "bg-black text-white" : "border"
                  }`}
                >
                  {index + 1}
                </button>
              ))
            ) : (
              <span className="text-gray-500">No pages available</span>
            )}
          </div>

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="pl-2 py-2 border rounded-md flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        <p className="pt-5 text-center">
          {(currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, data.length)} of {data.length}
        </p>
    </div>
  );
}
