import { Product } from "@/lib/definitions";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function ProductCard (
  {
    data
  }: {
    data: Product
  }) {

  const {category, image_url: img, name: username, product_name: title, price_in_cents: price, product_id: id} = data

  return (
    <Link href={`/products/${id}`}>
      <div className="relative w-full">
        <Image height={500} width={500} src={img || "/placeholder.png"} alt={"Product image"} className="w-full aspect-3/2 bg-gray-500 object-cover">
        </Image>
        <p className="font-bold absolute right-0 rounded-tl-2xl bottom-0 bg-primary-500 text-seafoam-50 px-4 py-2">{formatPrice(price)}</p>
      </div>
        {/* <p>{props.index}</p> */}
        <p className="text-xs bg-secondary-500 text-azure-50 p-2 rounded-2xl max-w-max my-3">{category}</p>
        <h3 className="font-extralight">{title}</h3>
        <p className="text-sm text-gray-400">{username}</p>
        <button>Add to Cart 🛒</button>
    </Link>
  )
}