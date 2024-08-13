'use client';

import { useGetWalletSummary } from '@/app/hooks/use-get-wallet-summary';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

function page() {
  const getWalletSummary = useGetWalletSummary();

 

  if (!getWalletSummary.data) {
    return <span>loading....</span>;
  }

  const columnData = getWalletSummary?.data?.totalBuyAmounts?.month ?? {};
  const lineData = getWalletSummary?.data?.totalBuySellTimes?.month ?? {};
  const keysArray = Object.keys(lineData);
  const valuesArray = Object.values(lineData);
  const columnValue = Object.values(columnData);

  // Sample data for the line chart

  // Maximum values for Y-axis left and right
  const maxYLeft = 25;
  const maxYRight = 50;

  // Calculate scaling factors
  const leftScale = 100 / maxYLeft;
  const rightScale = 100 / maxYRight;

  return (
    <div className="relative flex justify-center items-center w-full h-96 border border-gray-300">
      {/* Left Y-Axis */}
      <div className="absolute left-0 flex flex-col justify-between h-full px-2 text-xs text-gray-600">
        {[25, 20, 15, 10, 5, 0].map((val) => (
          <span key={val}>{val}</span>
        ))}
      </div>

      {/* Right Y-Axis */}
      <div className="absolute right-0 flex flex-col justify-between h-full px-2 text-xs text-gray-600">
        {[50, 40, 30, 20, 10, 0].map((val) => (
          <span key={val}>{val}</span>
        ))}
      </div>

      {/* Bars */}
      <div className="relative flex items-end w-full px-10 h-full space-x-2">
        {columnValue?.map((value: any, index: number) => {
          const heightPercent = (value / 10000) * leftScale;
          return (
            <div
              key={index}
              className="w-6 bg-blue-500"
              style={{ height: `${heightPercent}%` }}
            />
          );
        })}
        {/* Line */}
        <svg
          className="absolute inset-0 pointer-events-none left-10 top-0 h-full z-30"
          viewBox="0 0 100 100"
        >
          <polyline
            fill="none"
            stroke="red"
            strokeWidth="1"
            points={valuesArray
              ?.map((value: any, index: number) => {
                const x = (index * 100) / (valuesArray.length - 1);
                const y = 100 - value * rightScale;
                return `${x},${y}`;
              })
              .join(' ')}
          />
        </svg>
      </div>

      {/* X-Axis */}
      <div className="absolute bottom-0 left-10 right-10 flex justify-between text-xs text-gray-600">
        {keysArray?.map((label, index) => (
          <span key={index}>{label}</span>
        ))}
      </div>
    </div>
  );
}

export default page;
