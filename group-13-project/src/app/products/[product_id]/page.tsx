import { notFound } from "next/navigation"
import ProductPage from "./product-form"
import { fetchProductById } from "@/app/lib/data"

export default async function Product(props: {params: Promise<{product_id: string}>}) {

  const {product_id} = await props.params

  const product = await fetchProductById(product_id)

  if(!product) {
    notFound();
  }

  return(
    <ProductPage product={product!}/>
  )
}