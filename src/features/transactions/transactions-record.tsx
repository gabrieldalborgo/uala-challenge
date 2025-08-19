import { useTransactions } from "./hooks/use-transactions";
import { EmptyState } from "./components/empty-state";
import { ErrorState } from "./components/error-state";
import { Header } from "./components/header";
import { List, ListSkeleton } from "./components/list";
import type { Filters } from "./types";

interface TransactionsRecordProps {
  filters: Filters
  onFilter: () => void
  onExport: () => void
}

export function TransactionsRecord({ filters, onFilter, onExport }: TransactionsRecordProps) {
  const { transactions, state } = useTransactions({ filters })

  return (
    <div className="pr-2 pl-2">
      <Header
        title="Historial de transacciones"
        onFilter={onFilter}
        onExport={onExport}
      />
      {state === "loading" && <ListSkeleton count={10} />}
      {state === "error" && <ErrorState />}
      {state === "empty" && <EmptyState />}
      {state === "success" && <List items={transactions} />}
    </div>
  )
}