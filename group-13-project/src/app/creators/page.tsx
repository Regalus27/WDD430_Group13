import Search from '@/app/ui/search';
import TableCreators from '@/app/ui/creators/table';
import { Suspense } from 'react';

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
  return (
     <div className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"> 
      
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-3xl bg-white/90 p-6 shadow-xl backdrop-blur-md">
    
        <div className="w-full">
          <div className="flex w-full items-center justify-between">
            <h2 className={` text-2xl`}>🎨 Creators</h2>
          </div>
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Search placeholder="Search for creators ..." />
            {/* <CreateInvoice /> */}
          </div>
          <Suspense key={query + currentPage} >
            <TableCreators query={query} />
          </Suspense>
          
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}
