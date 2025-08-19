import { CollectionsSummary } from "@/features/collections/collections-summary";
import { TransactionsFilters, TransactionsFiltersSheet } from "@/features/transactions/transactions-filters";
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
  filtersOpen: boolean,
  onCloseFilters: () => void,
  onFilter: () => void
  onExport: () => void
}

function HomeMobile({ filtersOpen, onCloseFilters, onFilter, onExport }: HomeProps) {
  return (
    <Wrapper>
      {filtersOpen ? (
        <TransactionsFilters
          onClose={onCloseFilters}
          onApply={() => alert('Not implemented')}
        />
      ) : (
        <>
          <CollectionsSummary />
          <TransactionsRecord onFilter={onFilter} onExport={onExport} />
        </>
      )}
    </Wrapper>
  )
}

function HomeDesktop({ filtersOpen, onCloseFilters, onFilter, onExport }: HomeProps) {
  return (
    <Wrapper>
      <CollectionsSummary />
      <TransactionsRecord onFilter={onFilter} onExport={onExport} />
      <TransactionsFiltersSheet
        open={filtersOpen}
        onClose={onCloseFilters}
        onApply={() => alert('Not implemented')}
      />
    </Wrapper>
  )
}

export function Home() {
  const isMobile = useIsMobile()
  const [filtersOpen, setFiltersOpen] = useState(false)

  if (isMobile) {
    return (
      <HomeMobile
        filtersOpen={filtersOpen}
        onCloseFilters={() => setFiltersOpen(false)}
        onFilter={() => setFiltersOpen(true)}
        onExport={() => alert('Not implemented')}
      />
    )
  }

  return (
    <HomeDesktop
      filtersOpen={filtersOpen}
      onCloseFilters={() => setFiltersOpen(false)}
      onFilter={() => setFiltersOpen(true)}
      onExport={() => alert('Not implemented')}
    />
  )
}