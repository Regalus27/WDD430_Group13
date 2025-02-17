import Image from "next/image";
import { RiStarFill, RiStarLine } from "react-icons/ri"

export default function ReviewPost() {

  const arr = [1, 2, 3, 4, 5]
  const rating = 4;

  return (
    <div className="my-10 p-5 bg-azure-950 text-white grid grid-rows-[auto_1fr] gap-5">
      <div className="flex items-center">
        <Image height={100} width={100} src={'/mockup.png'} alt="profile image" className="rounded-full mt-2"/>
        <h3 className="text-center mx-5 text-2xl">Username</h3>
      </div>
      <div className="flex flex-col place-self-center">
        <h3 className="text-2xl">Rating: </h3>
        <div className="flex">
          {arr.map((v, i) => {
            const star = i < rating ? <RiStarFill /> : <RiStarLine />
            return <div key={v}>{star}</div>
          })}
        </div>
        <br />
        <h3 className="text-2xl">Review:</h3>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste optio rerum eius alias minima impedit inventore reprehenderit, iusto nobis aut aliquam cumque, fuga vitae officia? Incidunt at explicabo ratione sed. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi voluptas quis cupiditate architecto similique soluta fugit ea placeat mollitia inventore, aliquam delectus! Provident voluptates veniam iure incidunt est quas nesciunt? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere beatae eaque aut quos suscipit. Perspiciatis deserunt quia repellat, id iste explicabo dicta eius repudiandae autem totam similique veritatis atque voluptates! Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam commodi quibusdam placeat, eius et eaque dolorum iusto distinctio veritatis repellendus. Animi, voluptatibus in. Corporis assumenda dolorem minus soluta! Dolore, ab!</p>
      </div>
    </div>
  )
}