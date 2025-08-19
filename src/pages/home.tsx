import { CollectionsSummary } from "@/features/collections/collections-summary";
import { TransactionsFilters, TransactionsFiltersSheet } from "@/features/transactions/transactions-filters";
import type { Filters } from "@/features/transactions/types";
import { TransactionsRecord } from "@/features/transactions/transactions-record";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center">
      <div className="w-[440px] flex flex-col gap-5">{children}</div>
    </div>
  )
}

interface HomeProps {
  filters: Filters,
  filtersOpen: boolean,
  onApplyFilters: (filters: Filters) => void,
  onCloseFilters: () => void,
  onFilter: () => void
  onExport: () => void
}

function HomeMobile({ filters, filtersOpen, onApplyFilters, onCloseFilters, onFilter, onExport }: HomeProps) {
  return (
    <Wrapper>
      {filtersOpen ? (
        <TransactionsFilters
          filters={filters}
          onClose={onCloseFilters}
          onApply={onApplyFilters}
        />
      ) : (
        <>
          <CollectionsSummary />
          <TransactionsRecord filters={filters} onFilter={onFilter} onExport={onExport} />
        </>
      )}
    </Wrapper>
  )
}

function HomeDesktop({ filters, filtersOpen, onApplyFilters, onCloseFilters, onFilter, onExport }: HomeProps) {
  return (
    <Wrapper>
      <CollectionsSummary />
      <TransactionsRecord filters={filters} onFilter={onFilter} onExport={onExport} />
      <TransactionsFiltersSheet
        filters={filters}
        open={filtersOpen}
        onClose={onCloseFilters}
        onApply={onApplyFilters}
      />
    </Wrapper>
  )
}

export function Home() {
  const isMobile = useIsMobile()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filters, setFilters] = useState<Filters>({})
  const openFilters = () => setFiltersOpen(true)
  const closeFilters = () => setFiltersOpen(false)

  if (isMobile) {
    return (
      <HomeMobile
        filters={filters}
        filtersOpen={filtersOpen}
        onApplyFilters={setFilters}
        onCloseFilters={closeFilters}
        onFilter={openFilters}
        onExport={() => alert('Not implemented')}
      />
    )
  }

  return (
    <HomeDesktop
      filters={filters}
      filtersOpen={filtersOpen}
      onApplyFilters={setFilters}
      onCloseFilters={() => setFiltersOpen(false)}
      onFilter={() => setFiltersOpen(true)}
      onExport={() => alert('Not implemented')}
    />
  )
}