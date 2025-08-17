import { CollectionsSummary } from "@/features/collections/collections-summary";
import { TransactionsRecord } from "@/features/transactions/transactions-record";

export function Home() {
  return (
    <div className="flex justify-center">
      <div className="w-[440px] flex flex-col gap-5">
        <CollectionsSummary />
        <TransactionsRecord />
      </div>
    </div>
  )
}