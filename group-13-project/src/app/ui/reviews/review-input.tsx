'use client'

import { createReview } from "@/lib/actions";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as SolidStar } from "@heroicons/react/24/solid";

export default function ReviewInput() {

  const arr = [1, 2, 3, 4, 5];
  const param = useParams();

  const [rating, setRating] = useState<number>(0)

  function handleStars(e: React.MouseEvent<HTMLInputElement>) {
    let value = +(e.currentTarget.value);
    if(value == rating) {
      value = 0;
    }
    setRating(value)
  }

  function handleForm(formData: FormData) {

    if(!formData) return

    const id = param.product_id?.toString();
    let review_text = formData.get("review")?.toString();

    if(!id) return

    if (review_text == null) review_text = "";
    const reviewObj = {
      rating: rating,
      review_text: review_text,
      product_id: id,
      user_id: "2433b8a1-1967-41f6-8ca0-d73ad8ddf94c"
    }

    createReview(reviewObj);
  }

  return (
    <form className="grid w-full mt-10" action={handleForm}>
      <h2 className="text-2xl">Review Product</h2>
      <p>Rating:</p>
      <div className="flex">
        {arr.map((a, i) => {
          const star = i < rating ? <SolidStar className="w-7 h-7 fill-accent-600" /> : <StarIcon className="w-7 h-7 fill-accent-600" />
          return (
          <div key={`star${a}`} className="hover:scale-130">
            <label htmlFor={`star${a}`}>{star}</label>
            <input onClick={handleStars} type="radio" id={`star${a}`} name="stars" value={a} hidden/>
          </div>
          )
      })}
      </div>
      <textarea name="review" id="review" className="my-5 p-5 outline-1 bg-white rounded-lg outline-primary-800" rows={5}></textarea>
      <button className="max-w-50 min-h-15 min-w-50 place-self-end">Accept</button>
    </form>
  )
}