import { fetchUserProfiles } from "@/app/lib/data";

import Image from "next/image";
import { BtnViewArtist, BtnViewArtistDesktop } from "@/app/ui/creators/buttons";
import { notFound } from "next/navigation";

export default async function Page() {
  const users = await fetchUserProfiles();

  if (!users) notFound();

  return (
    <div className="flex w-full flex-col md:col-span-4 p-2">
      {/* <div className="flex w-full flex-col md:col-span-4 p-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 min-h-screen"> */}
      <h2 className="mt-6 text-3xl font-extrabold text-center drop-shadow-lg">
        🎨 Creators Catalogue 🚀
      </h2>
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-3xl bg-white/90 p-6 shadow-xl backdrop-blur-md">
            {/* Mobile List View */}
            <div className="md:hidden">
              {users?.map((user) => (
                <div
                  key={user.user_id}
                  className="mb-4 w-full rounded-lg bg-white p-6 shadow-lg transition hover:scale-105 duration-300"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={"/mockup.png"}
                        className="rounded-full border-4 border-yellow-400 shadow-md"
                        width={60}
                        height={60}
                        alt={`${user.name}'s profile`}
                      />
                      <p className="text-lg font-semibold text-gray-900">
                        {user.name}
                      </p>
                    </div>
                    <BtnViewArtist id={user.user_id} />
                  </div>
                  <div className="flex w-full justify-between pt-4">
                    <p className="text-purple-600 font-medium">
                      {user.artstyle}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg bg-indigo-700 text-white text-sm font-semibold">
                <tr>
                  <th scope="col" className="px-4 py-5 sm:pl-6 text-lg ">
                    Creator
                  </th>
                  <th scope="col" className="px-3 py-5 text-lg text-left">
                    {" "}
                    Style
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">View</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {users?.map((user) => (
                  <tr
                    key={user.user_id}
                    className="border-b py-3 text-md last:border-none hover:bg-gray-100 transition duration-300"
                  >
                    <td className="whitespace-nowrap py-4 pl-6 pr-3 flex items-center gap-4">
                      <Image
                        src={"/mockup.png"}
                        className="rounded-full border-2 border-pink-500 shadow-md"
                        width={60}
                        height={60}
                        alt={`${user.name}'s profile`}
                      />
                      <p className="text-gray-900 font-semibold">{user.name}</p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-purple-700 font-medium">
                      {user.artstyle}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3 flex justify-end">
                      <BtnViewArtistDesktop id={user.user_id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
