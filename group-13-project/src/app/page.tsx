import FeaturedCard from "./featuredCard";
import { ulid } from "ulid";

export default function Home() {

  const arr = new Array(24).fill(1).map((v,i) => ulid());
  console.log(arr)
  
  return (
    <main role="main" className="w-full">
      {/** Featured Cards */}
      <h1>Featured Items</h1>
      <div className="grid grid-cols-3 gap-2">
        {/** TODO: Pull information from database and feature 3 algorithmically (probably random) items. */}
        <FeaturedCard itemPicture={"mockup.png"} itemAltText={"Mockup Item Image"} itemPrice={1599} itemPageLink={"#"} />
        <FeaturedCard itemPicture={"mockup.png"} itemAltText={"Mockup Item Image"} itemPrice={399} itemPageLink={"#"} />
        <FeaturedCard itemPicture={"mockup.png"} itemAltText={"Mockup Item Image"} itemPrice={2000} itemPageLink={"#"} />
      </div>
      {/** Newest Cards */}
      <h1>Newest Items</h1>
      <div className="grid grid-cols-4 gap-2">
        {arr.map((v) => {
          return (
            <a key={v} className="group black relative overflow-hidden rounded-lg" href={`/product/${v}`}>
              <img className="w-full size-40 object-cover bg-gray-100 rounded-lg dark:bg-neutral-800" src="mockup.png" alt="Mockup Item Image"></img>
            </a>
          )
        })}
      </div>
    </main>
  );
}
