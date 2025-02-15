import Image from "next/image";
import Link from "next/link";

export function ProductCard (
  props: {
    img?: string, 
    title: string, 
    username: string, 
    rating?: number, 
    id: string,
    price?: string,
    index?: number
  }) {

  const {
    title,
    username,
    id,
    // rating = 2, 
    // img = "/placeholder.png",
  } = props

  return (
    <Link href={`/product/${id}`}>
      <div className="relative w-full">
        <Image height={500} width={500} src={props.img || "/placeholder.png"} alt={"Product image"} className="w-full aspect-3/2 bg-gray-500 object-cover">
        </Image>
        <p className="font-bold absolute right-0 rounded-tl-2xl bottom-0 bg-primary-500 text-seafoam-50 px-4 py-2">${props.price}</p>
      </div>
        {/* <p>{props.index}</p> */}
        <p className="text-sm text-gray-400">{username}</p>
        <h3 className="font-extralight">{title}</h3>
    </Link>
  )
}