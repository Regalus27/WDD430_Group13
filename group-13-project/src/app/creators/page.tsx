
import {fetchUserProfiles} from '@/lib/data';

import Image from 'next/image';
import { BtnViewArtist, BtnViewArtistDesktop } from '@/app/ui/creators/buttons';
import Search from "@/app/ui/search"; 
import CreatorsTable from '@/app/ui/creators'

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

    const users = await fetchUserProfiles();
  return (
    <div className="flex w-full flex-col md:col-span-4 p-2">
    {/* <div className="flex w-full flex-col md:col-span-4 p-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 min-h-screen"> */}
      <h2 className="mt-6 text-3xl font-extrabold text-center drop-shadow-lg">
        🎨 Creators Catalogue 🚀
      </h2>
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Search creators ..." />
            {/* <CreateInvoice /> */}
          </div>
          kkkkkkkkkk
          <div className="mt-5 flex w-full justify-center">
            {/* <Pagination totalPages={totalPages} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}