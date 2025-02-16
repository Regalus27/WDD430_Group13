"use client";

import { useState, useEffect } from "react";
import type { Product } from "@/lib/definitions";
import { CardGrid } from "../ui/card-grid";

const categories = ["Chairs", "Beds", "Tables"];
// TODO: We need to add more options to filter by. Eg. Material (wood, metal, etc), Medium(Oil Painting, jewlery, Sculpter), Theme (Nature, Industrial, Romance, Anime)

export const ProductGallery = (props: { products: Product[] }) => {
  const { products } = props;

  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expanded, setExpanded] = useState(false);
  // const [expandedDietary, setExpandedDietary] = useState(false);
  const itemsPerPage = 6;
  const [isMobile, setIsMobile] = useState(false);
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 800);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!products) return <div>Products Not Found!</div>;
  // Count products in each category and dietary option
  const categoryCounts = categories.reduce((acc, category) => {
    acc[category] = products!.filter((p) => p.category === category).length;
    return acc;
  }, {} as Record<string, number>);

  // const dietaryCounts = dietaryOptions.reduce((acc, option) => {
  //     acc[option] = products.filter((p) => p.dietaryOptions === option).length;
  //     return acc;
  // }, {} as Record<string, number>);

  // Filtering Logic
  const filteredProducts = products!.filter((product) => {
    const matchesSearch = product.product_name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    // const matchesDietary = selectedDietary.length === 0 || selectedDietary.includes(product.dietaryOptions);
    const matchesPrice =
      (minPrice === "" || product.price_in_cents >= minPrice) &&
      (maxPrice === "" || product.price_in_cents <= maxPrice);

    return (
      matchesSearch && matchesCategory /* && matchesDietary */ && matchesPrice
    );
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <h2 className="text-center text-3xl font-extrabold">Browse Products</h2>
      <section
        className={`${"w-full flex flex-col md:flex-row gap-2 lg:gap-10 px-4 py-10"}`}
      >
        {/* Sidebar Filters */}
        <aside className={`${"flex flex-col md:w-1/4"}`}>
          {/* Search Bar */}
          <div className="mb-4 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="absolute left-3 top-5 transform -translate-y-1/2 size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="w-full px-10 py-2 border rounded-full border-black bg-gray-200"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={() => setSearch("")}
              className="text-sm text-black-500 mt-2"
            >
              Clear All
            </button>
          </div>
          <br></br>

          {/* Filter products by price */}
          <div className="mb-5">
            <p>Sort by Price</p>
            <input
              type="number"
              value={minPrice}
              onChange={(e) =>
                setMinPrice(e.target.value ? parseFloat(e.target.value) : "")
              }
              placeholder="Min Price"
              className="mr-2"
            />
            <input
              type="number"
              value={maxPrice}
              onChange={(e) =>
                setMaxPrice(e.target.value ? parseFloat(e.target.value) : "")
              }
              placeholder="Max Price"
            />
          </div>

          {/* Categories */}
          <div className="mb-4">
            {/* Category header with foldable functionality */}
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setExpanded(!expanded)}
            >
              <h3 className="font-bold mb-2">Categories</h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`transform transition-transform ${
                  expanded ? "" : "rotate-180"
                } w-4 h-4 ml-auto`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            {/* Conditionally render categories based on expanded state */}
            {expanded && (
              <div className="mt-2">
                {categories.map((category) => (
                  <label key={category} className="block">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() =>
                        setSelectedCategories((prev) =>
                          prev.includes(category)
                            ? prev.filter((c) => c !== category)
                            : [...prev, category]
                        )
                      }
                      className="mr-5 mb-5"
                    />
                    {category} ({categoryCounts[category]})
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Dietary Filters */}
          {/* <div className="flex items-center cursor-pointer" onClick={() => setExpandedDietary(!expandedDietary)}>
                        <h3 className="font-bold mb-2">Dietary</h3>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className={`transform transition-transform ${expandedDietary ? '' : 'rotate-180'} w-4 h-4 ml-auto`}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div> */}

          {/* Conditionally render dietary options based on expandedDietary state */}
          {/* {expandedDietary && (
                        <div className="mt-2">
                            {dietaryOptions.map(option => (
                                <label key={option} className="block">
                                    <input
                                        type="checkbox"
                                        checked={selectedDietary.includes(option)}
                                        onChange={() =>
                                            setSelectedDietary(prev =>
                                                prev.includes(option)
                                                    ? prev.filter(d => d !== option)
                                                    : [...prev, option]
                                            )
                                        }
                                        className="mr-5 mb-5"
                                    />
                                    {option} ({dietaryCounts[option]})
                                </label>
                            ))}
                        </div>
                    )} */}
        </aside>

        <div className="h-auto border-l border-black"></div>

        {/* Main Product Grid */}
        <main className={"w-full md:w-3/4"}>
          {/* Show All Products Button */}
          <div className="text-center mb-5">
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategories([]);
                // setSelectedDietary([]);
                setMinPrice("");
                setMaxPrice("");
              }}
              className="text-black cursor-pointer"
            >
              Show all products ({products.length})
            </button>
          </div>
          {/* Product List */}
          {/* <CardGrid data={products} /> */}

          {/* Pagination Controls */}
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
                      currentPage === index + 1
                        ? "bg-black text-white"
                        : "border"
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
          <p className="pt-5">
            {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of{" "}
            {filteredProducts.length}
          </p>
        </main>
      </section>
    </div>
  );
};

export default ProductGallery;
