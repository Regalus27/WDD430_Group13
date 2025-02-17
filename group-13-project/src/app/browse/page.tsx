import { fetchProducts } from "@/lib/data"
import { ProductGallery } from "./gallery"
import { Suspense } from "react";

export default async function Gallery() {

  const products = await fetchProducts();

  return(
    <Suspense>
      <ProductGallery products={products} />
    </Suspense>
  )
}