import { fetchProducts } from "@/lib/data"
import { ProductGallery } from "./gallery"

export default async function Gallery() {

  const products = await fetchProducts();

  return(
    <ProductGallery products={products} />
  )
}