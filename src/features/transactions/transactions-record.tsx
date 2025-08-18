import { useTransactions } from "./hooks/use-transactions";
import { EmptyState } from "./components/empty-state";
import { ErrorState } from "./components/error-state";
import { Header } from "./components/header";
import { List, ListSkeleton } from "./components/list";

export function TransactionsRecord() {
  const { transactions, state } = useTransactions()

  return (
    <div className="pr-2 pl-2">
      <Header />
      {state === "loading" && <ListSkeleton count={10} />}
      {state === "error" && <ErrorState />}
      {state === "empty" && <EmptyState />}
      {state === "success" && <List items={transactions} />}
    </div>
  )
}