import { Skeleton } from '@/components/ui/skeleton';
import storeIcon from '@/assets/store-icon.svg';
import type { Transaction } from '../types';

export function Item({ amount, date, method, type }: Transaction) {
  return (
    <div className="flex items-center justify-between w-full h-14 gap-2 border-b border-gray-200 pt-3 pr-2 pb-3 pl-2">
      {/* Left: Icon */}
      <img src={storeIcon} alt="Store icon" className="w-8 h-8" />

      {/* Middle: Method and Type (takes remaining space, left-aligned) */}
      <div className="flex flex-col flex-1 text-left gap-1">
        <span
          className="text-[14px] font-semibold leading-none text-[#313643]"
          style={{
            fontFamily: 'Public Sans',
            letterSpacing: '0%',
            verticalAlign: 'middle',
          }}
        >
          {method}
        </span>
        <span
          className="text-[14px] font-thin leading-none text-[#606882]"
          style={{
            fontFamily: 'Public Sans',
            letterSpacing: '0%',
            verticalAlign: 'middle',
          }}
        >
          {type}
        </span>
      </div>

      {/* Right: Amount and Date (right-aligned) */}
      <div className="flex flex-col items-end gap-1">
        <span
          className="text-[14px] font-semibold leading-none text-[#1C8367] text-right"
          style={{
            fontFamily: 'Public Sans',
            letterSpacing: '0%',
            verticalAlign: 'middle',
          }}
        >
          {amount}
        </span>
        <span
          className="text-[14px] font-thin leading-none text-[#606882] text-right"
          style={{
            fontFamily: 'Public Sans',
            letterSpacing: '0%',
            verticalAlign: 'middle',
          }}
        >
          {date}
        </span>
      </div>
    </div>
  );
}

export function ItemSkeleton() {
  return (
    <div className="flex items-center gap-3 pb-1">
      <Skeleton className="w-10 h-10 rounded-2xl bg-[#dee2ec]" />
      <Skeleton className="h-10 flex-1 bg-[#dee2ec]" />
    </div>
  );
}
