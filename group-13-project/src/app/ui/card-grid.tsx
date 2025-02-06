import Image from "next/image"
import { CardData } from "../page"
import { clsx } from "clsx"

export function CardGrid (props: {data: Array<CardData>, max_col?: number, max_row?: number}) {
  const { data, max_col, max_row } = props

  const style = `grid-cols-${max_col}`

  return (
    <div className={clsx("grid gap-2")} style={{gridTemplateColumns: `repeat(${max_col}, 1fr)`}}>
        {data.map((item: any) => {
          return (
            <a key={item.id} className="group black relative overflow-hidden rounded-lg" href={`/product/${item.id}`}>
              <Image className="w-full size-40 object-cover bg-gray-100 rounded-lg dark:bg-neutral-800" src="/mockup.png" alt="Mockup Item Image" width={100} height={100}></Image>
              <p>${item.price}</p>
              <p>{item.name}</p>
              <p>{item.creator.u_name}</p>
            </a>
          )
        })}
      </div>
  )
}