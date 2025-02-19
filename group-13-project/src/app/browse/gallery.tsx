"use client";

import { useState, Suspense } from "react";
import type { Product } from "@/lib/definitions";
import { CardGrid } from "../ui/cards/card-grid";

// TODO: We need to add more options to filter by. Eg. Material (wood, metal, etc), Medium(Oil Painting, jewlery, Sculpter), Theme (Nature, Industrial, Romance, Anime)
// TODO: Replace useStates and use formData instead

export const ProductGallery = ({products, categories}: { products: Product[], categories: string[] }) => {

  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [expanded, setExpanded] = useState(false);
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  if (!products) return <div>Products Not Found!</div>;
  // Count products in each category and dietary option
  const categoryCounts = categories.reduce((acc, category) => {
    acc[category] = products!.filter((p) => p.category === category).length;
    return acc;
  }, {} as Record<string, number>);

  // Filtering Logic
  const filteredProducts = products!.filter((product) => {
    const matchesSearch = product.product_name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    // const matchesDietary = selectedDietary.length === 0 || selectedDietary.includes(product.dietaryOptions);
    const price = +(product.price_in_cents);

    const matchesPrice =
      (minPrice === "" || price >= minPrice * 100) &&
      (maxPrice === "" || price <= maxPrice * 100);

    return (
      matchesSearch && matchesCategory && matchesPrice
    );
  });

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
        </aside>

        <div className="h-auto border-l border-black"></div>

        {/* Main Product Grid */}
        <main className={"w-full md:w-3/4"}>
          {/* Show All Products Button */}
          {/* <div className="text-center mb-5">
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
          </div> */}
          {/* Product List */}
          <Suspense>
            <CardGrid data={filteredProducts} itemsPerPage={6} />
          </Suspense>
        </main>
      </section>
    </div>
  );
};

export default ProductGallery;
