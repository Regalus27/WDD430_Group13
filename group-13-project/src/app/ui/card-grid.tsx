// import Image from "next/image"
import type { CardData } from "@/lib/definitions";
import { clsx } from "clsx"
import { ProductCard } from "./product-card"

/*
  TODO: Pagination
  TODO: 
*/

export function CardGrid (props: {data: Array<CardData>, max_col?: number, max_row?: number, filter?: object}) {

  const max_col = props.max_col ? props.max_col : 1;
  const max_row = props.max_row ? props.max_row : 1;
  // Replace 0 with current page
  const currentPage = 1;
  const itemsPerPage = 12;
  const dataStart = max_col * (currentPage * max_row)
  const dataEnd = (max_col * max_row) + dataStart > props.data.length ? props.data.length : dataStart + (max_col * max_row);
  const data = props.data.slice(0, itemsPerPage)

  return (
    <div className={clsx("grid gap-2")} style={{gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`}}>
      {data.map((item: CardData, index: number) => {
        return (
          <ProductCard key={item.product_id} data={item}/>
        )
      })}
      {/* <Pagination totalPages={totalPages} /> */}
    </div>
  )
}