import Image from "next/image"

export function GridSkeleton() {
  return (
    <div>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div>
      <div className="relative w-full">
        <Image height={500} width={500} src={"/placeholder.png"} alt={"Product image"} className="w-full h-45 bg-gray-500 object-cover">
        </Image>
        <p className="font-bold absolute right-0 rounded-tl-2xl bottom-0 bg-primary-500 text-seafoam-50 px-4 py-2">${}</p>
      </div>
        <p className="text-sm text-gray-400">{}</p>
        <h3 className="font-extralight">{}</h3>
    </div>
  )
}