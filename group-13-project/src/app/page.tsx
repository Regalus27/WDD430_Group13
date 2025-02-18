// import Image from "next/image";
// import FeaturedCard from "./featuredCard";
import { ulid } from "ulid";
import { CardGrid } from "./ui/card-grid";
import { Suspense } from "react";
import { GridSkeleton } from "./ui/skeletons";
import Image from "next/image";

export type CardData = {
  id: string,
  name: string,
  price: string,
  creator: {
    id: string,
    f_name: string,
    l_name: string,
    u_name: string
  }
}

export default function Home() {
  const arr = new Array(27)
  .fill(1)
  .map((): CardData => (
    {
      id: ulid(),
      name: "Test Name",
      price: "12.99",
      creator: {
        id: ulid(),
        f_name: "John",
        l_name: "Doe",
        u_name: "JDoeMakes"
      }
    }))
  
  return (
    <main role="main" className="w-full">
      {/** Featured Cards */}
      <h1 className="mt-5 text-2xl uppercase">Featured Item</h1>
      <div className="grid grid-cols-[auto_1fr] gap-2 bg-azure-900 text-seafoam-100">
        <Image className="w-max aspect-3/2 object-cover" alt="" src={"/placeholder.png"} height={500} width={500} />
        <div className="p-4 grid h-full">
          <h2 className="text-4xl">Product Name</h2>
          <p>$12.99</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis nulla odio optio officia vero molestias quo corrupti, veniam libero harum. Ad asperiores animi dignissimos ea praesentium ut dicta, nobis ex!</p>
          <button className="bg-primary-500 text-seafoam-100 px-5 py-2 rounded-md">Learn More</button>
        </div>
      </div>
      {/** Newest Cards */}
      <h1 className="mt-5 text-2xl uppercase">Newest Items</h1>
      <Suspense fallback={<GridSkeleton />}>
        <CardGrid data={arr} max_col={3} max_row={3} filter={{sortBy: "newest"}}/>
      </Suspense>
    </main>
  );
}
