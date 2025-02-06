import Image from "next/image";
import Link from "next/link";

export function ProductCard (
  props: {
    img?: string, 
    title?: string, 
    username?: string, 
    rating?: number, 
    id?: string,
    price?: string,
    index?: number
  }) {
  return (
    <Link href={`/product/${props.id}`}>
      <p>{props.index}</p>
      <div className="relative w-max">
        <Image height={500} width={500} src={props.img || "/placeholder.png"} alt={"Product image"} className="w-max h-44 bg-gray-500">
        </Image>
        <p className="font-bold absolute right-0 rounded-tl-2xl bottom-0 bg-primary-500 text-seafoam-50 px-4 py-2">${props.price}</p>
      </div>
        <p className="text-sm text-gray-400">{props.username}</p>
        <h3 className="font-extralight">{props.title}</h3>
    </Link>
  )
}