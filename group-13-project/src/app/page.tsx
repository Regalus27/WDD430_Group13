// import Image from "next/image";
import FeaturedCard from "./featuredCard";
import { ulid } from "ulid";
import { CardGrid } from "./ui/card-grid";

export type CardData = {
  id: string,
  name: string,
  price: string,
  creator: {
    id: string,
    f_name: string,
    l_name: string,
    u_name: string
  }
}

export default function Home() {
  const arr = new Array(24).fill(1).map((): CardData => (
    {
      id: ulid(),
      name: "Test Name",
      price: "12.99",
      creator: {
        id: ulid(),
        f_name: "John",
        l_name: "Doe",
        u_name: "JDoeMakes"
      }
    }));
  
  return (
    <main role="main" className="w-full">
      {/** Featured Cards */}
      <h1>Featured Items</h1>
      <div className="grid grid-cols-3 gap-2">
        {/** TODO: Pull information from database and feature 3 algorithmically (probably random) items. */}
        {/* <FeaturedCard itemPicture={"mockup.png"} itemAltText={"Mockup Item Image"} itemPrice={1599} itemPageLink={"#"} />
        <FeaturedCard itemPicture={"mockup.png"} itemAltText={"Mockup Item Image"} itemPrice={399} itemPageLink={"#"} />
        <FeaturedCard itemPicture={"mockup.png"} itemAltText={"Mockup Item Image"} itemPrice={2000} itemPageLink={"#"} /> */}
      </div>
      {/** Newest Cards */}
      <h1>Newest Items</h1>
      <CardGrid data={arr} max_col={6}/>
    </main>
  );
}
