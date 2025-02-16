import { CardGrid } from "./ui/card-grid";
import { Suspense } from "react";
import { fetchNewestProduct, fetchProducts } from "@/lib/data";
import FeaturedCard from "./ui/featuredCard";
import { notFound } from "next/navigation";

export default async function Home() {
  const data = await fetchNewestProduct();
  const featured = (await fetchProducts()).reduce((prev, current) => prev.price_in_cents < current.price_in_cents ? current : prev )

  if(!data) {
    notFound();
  }

  return (
    <main role="main" className="w-full">
      {/** Featured Cards */}
      <h1 className="mt-5 text-2xl uppercase">Featured Item</h1>
      <Suspense fallback={<h2>Loading...</h2>}>
        <FeaturedCard item={featured}/>
      </Suspense>
      {/** Newest Cards */}
      <h1 className="mt-5 text-2xl uppercase">Newest Items</h1>
      <Suspense fallback={<h2>Loading...</h2>}>
        <CardGrid data={data.flat()} itemsPerPage={10} />
      </Suspense>
    </main>
  );
}
