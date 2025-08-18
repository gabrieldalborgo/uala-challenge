import { List, ListSkeleton } from "./components/list";
import { useTransactions } from "./hooks/use-transactions";
import filterIcon from "../../assets/filter-icon.svg";
import exportIcon from "../../assets/export-icon.svg";
import { EmptyState } from "./components/empty-state";

export function TransactionsRecord() {
  const { transactions, state } = useTransactions()

  return (
    <div className="pr-2 pl-2">
      <div className="flex items-center justify-between h-12 pb-2">
        <div 
          className="text-[#313643]"
          style={{
            fontFamily: 'Public Sans',
            fontWeight: 600,
            fontStyle: 'normal',
            fontSize: '14px',
            lineHeight: '100%',
            letterSpacing: '0%',
            verticalAlign: 'middle'
          }}
        >
          Historial de transacciones
        </div>
        <div className="flex items-center gap-6">
          <button className="w-6 h-6 flex items-center justify-center">
            <img src={filterIcon} alt="Filter" className="w-6 h-6" />
          </button>
          <button className="w-6 h-6 flex items-center justify-center">
            <img src={exportIcon} alt="Export" className="w-6 h-6" />
          </button>
        </div>
      </div>
      {state === "loading" && <ListSkeleton count={10} />}
      {state === "success" && <List items={transactions} />}
      {state === "empty" && <EmptyState />}
    </div>
  )
}