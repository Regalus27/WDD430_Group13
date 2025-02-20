import Image from 'next/image';
import { fetchFilteredCreators } from '@/lib/data';
import { BtnViewCreator , BtnViewProfile} from '@/app/ui/creators/buttons';

export default async function CreatorsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const users = await fetchFilteredCreators(query, currentPage);

  return (

<div className="mt-6 flow-root">
<div className="inline-block min-w-full align-middle">
  <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            {/* Desktop Mobile View */}
    <div className="md:hidden">
      {users?.map((user) => (
        <div
          key={user.user_id}
          className="mb-2 w-full rounded-md bg-white p-4"
        >
          <div className="flex flex-col items-center border-b pb-4">
        
              <div className="mb-2 flex items-center">
                <Image
                  src={user.image_url}
                  className="mr-2 rounded-full"
                  width={28}
                  height={28}
                  alt={`${user.name}'s profile picture`}
                />
                <p>{user.name}</p>
              </div>
              <p className="text-sm text-gray-500 mb-5">{user.artstyle}</p>
           
            <div className="justify-end flex gap-2">
              <BtnViewCreator id={user.user_id} variant= 'icon' />
              <BtnViewProfile id={user.user_id} variant= 'icon' />
            </div>
          </div>
        </div>
      ))}
    </div>
    {/* Desktop Table View */}
    <table className="hidden min-w-full text-gray-900 md:table">
      <thead className="rounded-lg text-left text-sm font-normal">
        <tr>
          <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
            Creator
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
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
            className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
          >
            <td className="whitespace-nowrap py-3 pl-6 pr-3">
              <div className="flex items-center gap-3">
                <Image
                  src={user.image_url}
                  className="rounded-full"
                  width={28}
                  height={28}
                  alt={`${user.name}'s profile picture`}
                />
                <p>{user.name}</p>
              </div>
            </td>
            <td className="whitespace-nowrap px-3 py-3">
              {user.artstyle}
            </td>
            <td className="whitespace-nowrap py-3 pl-6 pr-3">
              <div className="justify-end grid gap-3">
              <BtnViewCreator id={user.user_id} variant= 'text'/>
              <BtnViewProfile id={user.user_id} variant= 'text' />

              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
</div>
  )
}
  