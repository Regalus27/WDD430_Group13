import { fetchProductCategories, fetchProducts } from "@/lib/data"
import { ProductGallery } from "./gallery"
import { Suspense } from "react";

export default async function Gallery() {

  const products = await fetchProducts();
  const categories = await fetchProductCategories()

  return(
    <Suspense fallback={<h2>Loading...</h2>}>
      <ProductGallery products={products} categories={categories} />
    </Suspense>
  )
}