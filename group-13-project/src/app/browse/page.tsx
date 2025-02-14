'use client'

import { useState, useEffect } from "react";
import Image from 'next/image';
import Link from "next/link";

// This is just a demo product, the logic to fetch product with different category 
// should replace this. We can also store the product in the localstorage and 
// implement logic to fetch the product from the local storage
const products = [
    { id: 1, category: "Tables", image: "/mockup.png", title: "Real Craftsmanship", price: 25, dietaryOptions: "Eco Friendly" },
    { id: 2, category: "Chairs", image: "/mockup.png", title: "Modern Chair", price: 200, dietaryOptions: "Gluten Free" },
    { id: 3, category: "Beds", image: "/mockup.png", title: "Comfortable Bed", price: 175, dietaryOptions: "Nut Free" },
    { id: 4, category: "Chairs", image: "/mockup.png", title: "Classic Chair", price: 275, dietaryOptions: "Eco Friendly" },
    { id: 5, category: "Chairs", image: "/mockup.png", title: "Wooden Chair", price: 295, dietaryOptions: "Gluten Free" },
    { id: 6, category: "Tables", image: "/mockup.png", title: "Real Craftsmanship", price: 125, dietaryOptions: "Nut Free" },
    { id: 7, category: "Chairs", image: "/mockup.png", title: "Modern Chair", price: 100, dietaryOptions: "Eco Friendly" },
    { id: 8, category: "Beds", image: "/mockup.png", title: "Comfortable Bed", price: 75, dietaryOptions: "Gluten Free" },
    { id: 9, category: "Chairs", image: "/mockup.png", title: "Classic Chair", price: 205, dietaryOptions: "Nut Free" },
    { id: 10, category: "Chairs", image: "/mockup.png", title: "Wooden Chair", price: 315, dietaryOptions: "Eco Friendly" },
];

const categories = ["Chairs", "Beds", "Tables"];
const dietaryOptions = ["Eco Friendly", "Gluten Free", "Nut Free"];

const ProductGallery = () => {
    const [search, setSearch] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [expanded, setExpanded] = useState(false);
    const [expandedDietary, setExpandedDietary] = useState(false);
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

    // Count products in each category and dietary option
    const categoryCounts = categories.reduce((acc, category) => {
        acc[category] = products.filter((p) => p.category === category).length;
        return acc;
    }, {} as Record<string, number>);

    const dietaryCounts = dietaryOptions.reduce((acc, option) => {
        acc[option] = products.filter((p) => p.dietaryOptions === option).length;
        return acc;
    }, {} as Record<string, number>);

    // Filtering Logic
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const matchesDietary = selectedDietary.length === 0 || selectedDietary.includes(product.dietaryOptions);
        const matchesPrice = (minPrice === "" || product.price >= minPrice) && (maxPrice === "" || product.price <= maxPrice);

        return matchesSearch && matchesCategory && matchesDietary && matchesPrice;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div>
            <h2 className="text-center text-3xl font-extrabold">Browse Products</h2>
            <section className={`${isMobile ? 'w-full flex flex-col gap-2 px-4 py-10' : 'w-full flex gap-10 px-4 py-10'}`}>
                {/* Sidebar Filters */}
                <aside className={`${isMobile ? 'flex flex-col' : 'w-1/4'}`}>
                    {/* Search Bar */}
                    <div className="mb-4 relative">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="absolute left-3 top-5 top-1/2 transform -translate-y-1/2 size-6"
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
                            onClick={() => setSearch('')}
                            className="text-sm text-black-500 mt-2"
                        >
                            Clear All
                        </button>
                    </div><br></br>

                    {/* Filter products by price */}
                    <div className="mb-5">
                        <p>Sort by Price</p>
                        <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value ? parseFloat(e.target.value) : "")} placeholder="Min Price" className="mr-2" />
                        <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value ? parseFloat(e.target.value) : "")} placeholder="Max Price" />
                    </div>

                    {/* Categories */}
                    <div className="mb-4">
                        {/* Category header with foldable functionality */}
                        <div className="flex items-center cursor-pointer" onClick={() => setExpanded(!expanded)}>
                            <h3 className="font-bold mb-2">Categories</h3>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className={`transform transition-transform ${expanded ? '' : 'rotate-180'} w-4 h-4 ml-auto`}
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
                                {categories.map(category => (
                                    <label key={category} className="block">
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(category)}
                                            onChange={() =>
                                                setSelectedCategories(prev =>
                                                    prev.includes(category)
                                                        ? prev.filter(c => c !== category)
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
                    <div className="flex items-center cursor-pointer" onClick={() => setExpandedDietary(!expandedDietary)}>
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
                    </div>

                    {/* Conditionally render dietary options based on expandedDietary state */}
                    {expandedDietary && (
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
                    )}

                </aside>

                <div className="h-auto border-l border-black"></div>

                {/* Main Product Grid */}
                <main className={`${isMobile ? 'w-full' : 'w-3/4'} `}>
                    {/* Show All Products Button */}
                    <div className="text-center mb-5">
                        <button
                            onClick={() => {
                                setSearch("");
                                setSelectedCategories([]);
                                setSelectedDietary([]);
                                setMinPrice("");
                                setMaxPrice("");
                            }}
                            className="text-black cursor-pointer"
                        >
                            Show all products ({products.length})
                        </button>
                    </div>
                    {/* Product List */}
                    <div className={`${isMobile ? 'grid grid-cols-2 gap-6' : 'grid grid-cols-3 gap-6'}`}>
                        {paginatedProducts.length > 0 ? (
                            paginatedProducts.map(product => (
                                <Link key={product.id} href={`/browse/${product.id}`} passHref>
                                    <div key={product.id} className="border rounded-2xl">
                                        <Image src={product.image} alt={product.title} width={400} height={200} className={`${isMobile ? 'sm:w-1/2 sm:h-32' : 'w-full h-84 object-cover'} mb-5 rounded-2xl overflow-hidden shadow-md transform transition-all duration-300 hover:scale-110 `} />

                                        <div className="px-2">
                                            <span className="text-sm bg-gray-200 px-2 py-1 rounded-md">{product.category}</span>
                                            <div className="flex items-center justify-between mt-2">
                                                <h3 className={`${isMobile ? 'text-sm' : 'text-lg'} font-semibold `}>{product.title}</h3>
                                                <p className={`${isMobile ? 'text-sm' : 'text-lg'} font-bold `}>${product.price}</p>
                                            </div>
                                            <div className={`${isMobile ? 'block' : 'flex'} gap-2 mt-3 `}>
                                                <button className="px-4 py-2 bg-black text-white rounded-full hover:bg-opacity-70">Add To Cart</button>
                                                <button className={` px-4 py-2 bg-azure-900 text-white ${isMobile ? 'mt-3 mb-2' : ''} rounded-full hover:bg-opacity-90 `}>Buy Now</button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-3 text-center text-xl font-semibold mt-10">
                                No results found
                            </div>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center mt-6">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
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
                                        className={`px-3 py-1 rounded-full ${currentPage === index + 1 ? "bg-black text-white" : "border"}`}
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
                            onClick={() => setCurrentPage(prev => prev + 1)}
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
                    <p className="pt-5">{(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length}</p>
                </main>
            </section>
        </div>
    );
};

export default ProductGallery;
