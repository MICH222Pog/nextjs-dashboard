import { Metadata } from 'next';
import { Suspense } from 'react';
import CustomersTable from '@/app/ui/customers/table';
import { CustomersTableSkeleton } from '@/app/ui/skeletons';
import { fetchFilteredCustomers, fetchCustomersPages } from '@/app/lib/data';
import Search from '@/app/ui/search';
import { lusitana } from '@/app/ui/fonts';
import Pagination from '@/app/ui/invoices/pagination';

export const metadata: Metadata = {
  title: 'Customers',
};

// Define page size
const PAGE_SIZE = 3;

export default async function Page({ searchParams }: { searchParams?: { query?: string; page?: string } }) {
  const query = searchParams?.query || '';
  const page = Number(searchParams?.page) || 1;

  // Fetch customers with correct page size
  const customers = await fetchFilteredCustomers(query, page, PAGE_SIZE);
  
  // Fetch total pages with correct page size
  const totalPages = await fetchCustomersPages(query, PAGE_SIZE);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Customer..." />
      </div>
      
      <Suspense fallback={<CustomersTableSkeleton />}>
        <CustomersTable customers={customers} />
      </Suspense>

      {/* Render Pagination only if needed */}
      <div className="mt-5 flex w-full justify-center">
            <Pagination totalPages={totalPages} />
        </div>

    </div>
  );
}
