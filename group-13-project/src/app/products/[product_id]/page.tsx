import { notFound } from "next/navigation"
import ProductPage from "./product-form"
import { fetchProductById, fetchReviewByProductId } from "@/lib/data"
import { Suspense } from "react"

export default async function Product(props: {params: Promise<{product_id: string}>}) {

  const {product_id} = await props.params

  const product = await fetchProductById(product_id)
  let reviews = await fetchReviewByProductId(product_id)

  if(!product) {
    notFound();
  }

  if(!reviews) reviews = []

  return(
    <Suspense fallback={<p>Loading...</p>}>
      <ProductPage product={product} reviews={reviews}/>
    </Suspense>
  )
}