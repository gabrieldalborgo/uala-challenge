import { useEffect, useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import type { Filters } from './types'
import { CardFilter } from './components/card-filter'
import { PaymentMethodFilter } from './components/payment-method-filter'
import { InstallmentFilter } from './components/installment-filter'
import { DateFilter } from './components/date-filter'
import { AmountFilter } from './components/amount-filter'

interface TransactionsFiltersSheetProps {
  open: boolean
  onClose: () => void
  onApply: (filters: Filters) => void
  filters: Filters
}

interface TransactionsFiltersProps {
  filters: Filters,
  onClose: () => void,
  onApply: (filters: Filters) => void
}

export function TransactionsFilters({
  filters,
  onClose,
  onApply
}: TransactionsFiltersProps) {

  const [currentFilters, setCurrentFilters] = useState<Filters>(filters)

  useEffect(() => {
    setCurrentFilters(filters)
  }, [filters])

  const handleClearFilters = () => {
    setCurrentFilters({})
  }

  const handleApplyFilters = () => {
    onApply(currentFilters)
    onClose()
  }

  const handleFilterChange = (filter: keyof Filters, value: unknown) => {
    setCurrentFilters({ ...currentFilters, [filter]: value })
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="size-5" />
          </Button>
          <h1 className="text-lg font-semibold">Filtros</h1>
        </div>
        <Button
          variant="ghost"
          onClick={handleClearFilters}
          className="text-muted-foreground hover:text-foreground p-0 h-auto"
        >
          Limpiar
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-base font-medium text-foreground">Todos los filtros</h2>
        </div>

        {/* Filter Components */}
        <div className="space-y-4">

          <DateFilter
            minDate={currentFilters.minDate}
            maxDate={currentFilters.maxDate}
          />

          <CardFilter
            value={currentFilters.card}
            onChange={(value: Filters['card']) => handleFilterChange('card', value)}
          />

          <InstallmentFilter
            value={currentFilters.installment}
            onChange={(value: Filters['installment']) => handleFilterChange('installment', value)}
          />

          <AmountFilter
            minAmount={currentFilters.minAmount}
            maxAmount={currentFilters.maxAmount}
            onChange={(value: Filters['minAmount'], maxAmount: Filters['maxAmount']) => {
              handleFilterChange('minAmount', value)
              handleFilterChange('maxAmount', maxAmount)
            }}
          />

          <PaymentMethodFilter
            value={currentFilters.paymentMethod}
            onChange={(value: Filters['paymentMethod']) => handleFilterChange('paymentMethod', value)}
          />
        </div>
      </div>

      {/* Footer with Apply Button */}
      <div className="p-4 border-t">
        <Button
          onClick={handleApplyFilters}
          disabled={JSON.stringify(filters) === JSON.stringify(currentFilters)}
          className="w-full h-12 text-base font-medium"
        >
          Aplicar filtros
        </Button>
      </div>
    </div>
  )
}

export function TransactionsFiltersSheet({ open, onClose, onApply, filters }: TransactionsFiltersSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" showCloseButton={false} className="p-0">
        <TransactionsFilters filters={filters} onClose={onClose} onApply={onApply} />
      </SheetContent>
    </Sheet>
  )
}