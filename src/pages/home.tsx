import { TransactionsRecord } from "@/features/transactions/transactions-record";

export function Home() {
  return (
    <div className="w-[440px] mx-auto">
      <TransactionsRecord />
    </div>
  )
}