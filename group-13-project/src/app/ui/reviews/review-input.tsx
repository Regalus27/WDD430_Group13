'use client'

import React, { useState } from "react";
import { RiStarFill, RiStarLine } from "react-icons/ri"

export default function ReviewInput() {

  const arr = [1, 2, 3, 4, 5];

  const [rating, setRating] = useState<number>(0)

  function handleStars(e: React.MouseEvent<HTMLInputElement>) {
    let value = +(e.currentTarget.value);
    if(value == rating) {
      value = 0;
    }
    setRating(value)
  }

  return (
    <form className="grid w-full mt-10">
      <h2 className="text-2xl">Review Product</h2>
      <p>Rating:</p>
      <div className="flex">
        {arr.map((a, i) => {
          const star = i < rating ? <RiStarFill className="w-7 h-7 fill-accent-600" /> : <RiStarLine className="w-10 h-10 fill-accent-600" />
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