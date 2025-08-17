import { ItemSkeleton } from "./item"
import type { ItemProps } from "./item"

interface ListProps {
  loading: boolean
  items: ItemProps[]
}

function LoadingSkeleton() {
  return Array.from({ length: 10 }).map((_, index) => (
    <ItemSkeleton key={index} />
  ))
}

export function List({ loading, items }: ListProps) {
  return (
    <div className="w-full">
      <LoadingSkeleton />
    </div>
  )
}

export function ListSkeleton({ count }: { count: number }) {
  return Array.from({ length: count }).map((_, index) => (
    <ItemSkeleton key={index} />
  ))
}