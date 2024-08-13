'use client';

import { useState } from 'react';
import { useGetWallets } from './hooks/use-get-wallets';
import Link from 'next/link';

export default function Home() {
  const getWallets = useGetWallets();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  if (!getWallets.data) {
    return <span>Loading...</span>;
  }

  // Calculate total pages
  const totalPages = Math.ceil(getWallets.data.length / itemsPerPage);

  // Get the data for the current page
  const currentData = getWallets.data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="w-full h-screen bg-white flex flex-col items-center justify-center">
      <div className="w-full border-red-100 bg-green-500">
        <div className="flex justify-around">
          <span className="text-red">"netProfit</span>
          <span>"walletAddress</span>
        </div>
      </div>
      <div className="h-80 overflow-y-auto w-full">
        {currentData.map((w, index) => (
          <div key={index} className="flex justify-around w-full">
            <Link href={`walletsummary/{${w.walletAddress}}`}>
              {w.netProfit}
            </Link>
            <Link href={`walletsummary/{${w.walletAddress}}`}>
              {w.walletAddress}
            </Link>
          </div>
        ))}
      </div>
      {/* Pagination controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="mx-2 px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="mx-2 px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
