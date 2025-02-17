import { Review } from "@/app/lib/definitions";
import Image from "next/image";
import { RiStarFill, RiStarLine } from "react-icons/ri"

export default function ReviewPost({review}: {review: Review}) {

  const arr = [1, 2, 3, 4, 5]
  const {rating, review_text, name, user_img} = review;

  return (
    <div className="my-10 p-5 bg-azure-950 text-white grid grid-rows-[auto_1fr] gap-5">
      <div className="flex items-center">
        <Image height={100} width={100} src={'/mockup.png'} alt={"user_img"} className="rounded-full mt-2"/>
        <h3 className="text-center mx-5 text-2xl">{name}</h3>
      </div>
      <div className="flex flex-col">
        <h3 className="text-2xl">Rating: </h3>
        <div className="flex">
          {arr.map((v, i) => {
            const star = i < rating ? <RiStarFill /> : <RiStarLine />
            return <div key={v}>{star}</div>
          })}
        </div>
        <br />
        <h3 className="text-2xl">Review:</h3>
          <p>{review_text}</p>
      </div>
    </div>
  )
}