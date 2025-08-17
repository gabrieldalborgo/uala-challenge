import { Skeleton } from "@/components/ui/skeleton"

export interface ItemProps {
  amount: number
  date: string
  method: string
}

export function Item({ amount, date, method }: ItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{method}</span>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{amount}</span>
      </div>
    </div>
  )
}

export function ItemSkeleton() {
  return (
    <div className="flex items-center gap-3 pb-1">
      <Skeleton className="w-10 h-10 rounded-2xl bg-[#dee2ec]" />
      <Skeleton className="h-10 flex-1 bg-[#dee2ec]" />
    </div>
  )
}