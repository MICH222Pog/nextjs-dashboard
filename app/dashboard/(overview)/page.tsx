import CardWrapper from '@/app/ui/dashboard/cards';
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data'; 
import { Suspense } from 'react';
import {
  RevenueChartSkeleton,
  LatestInvoicesSkeleton,
  CardsSkeleton,
} from '@/app/ui/skeletons';

import { Metadata } from 'next';
 
export const metadata: Metadata = {
    title: 'Dashboard',
  };

export default async function Page() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();
 
  return (
    <main className="bg-gray-100 min-h-screen p-6">
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl text-gray-900`}>
        Dashboard
      </h1>
      
      {/* Cards Section */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>

      {/* Charts & Invoices */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <div className="col-span-4 bg-white shadow-lg rounded-lg p-4 border border-gray-300">
            <RevenueChart />
          </div>
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <div className="col-span-4 bg-white shadow-lg rounded-lg p-4 border border-gray-300">
            <LatestInvoices />
          </div>
        </Suspense>
      </div>
    </main>
  );
}
