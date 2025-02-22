import { Metadata } from 'next';
import { Suspense } from 'react';
import CustomersTable from '@/app/ui/customers/table';
import { AddUser } from '@/app/ui/customers/buttons';
import { CustomerTableSkeleton } from '@/app/ui/skeletons';
import { fetchFilteredCustomers, fetchCustomersPages } from '@/app/lib/data';
import Search from '@/app/ui/search';
import { lusitana } from '@/app/ui/fonts';
import Pagination from '@/app/ui/invoices/pagination';

export const metadata: Metadata = {
  title: 'User',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const page = Number(searchParams?.page) || 1;

  const customers = await fetchFilteredCustomers(query, page);
  
  const totalPages = await fetchCustomersPages(query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>User</h1>
      </div>
      
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search..." />
         <AddUser />
      </div>
      <Suspense fallback={<CustomerTableSkeleton />}>
        <CustomersTable customers={customers} />
      </Suspense>

      <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
        </div>

    </div>
  );
}
