import { useEffect, useState } from 'react'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import type { Filters } from './types'
import { CardFilter } from './components/card-filter'
import { PaymentMethodFilter } from './components/payment-method-filter'
import { InstallmentFilter } from './components/installment-filter'
import { DateFilter } from './components/date-filter'
import { AmountFilter } from './components/amount-filter'
import chevronLeftIcon from '@/assets/chevron-left-icon.svg'

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
    setCurrentFilters(f => ({ ...f, [filter]: value }))
  }

  return (
    <div className="flex flex-col h-full m-5 mb-0">
      {/* Header */}
      <div className="flex items-center">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <img src={chevronLeftIcon} alt="Back" className="size-5" />
          </Button>
          <h1 className="text-[16px] font-semibold leading-[18px] text-[#3A3A3A]" style={{ fontFamily: 'Public Sans', letterSpacing: '0px' }}>Filtros</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto mt-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[16px] font-semibold leading-[18px] text-[#3A3A3A]" style={{ fontFamily: 'Public Sans', letterSpacing: '0px' }}>Todos los filtros</h2>
          <Button
            variant="ghost"
            onClick={handleClearFilters}
            className="text-muted-foreground hover:text-foreground p-0 h-auto"
          >
            Limpiar
          </Button>
        </div>

        {/* Filter Components */}
        <div className="p-2 mb-2">

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
      <div className="p-4">
        <Button
          onClick={handleApplyFilters}
          disabled={JSON.stringify(filters) === JSON.stringify(currentFilters)}
          className="w-full h-12 bg-[#022A9A] text-white rounded-full hover:bg-[#022A9A]/90 text-[16px] leading-[100%] font-thin"
          style={{ fontFamily: 'Public Sans', letterSpacing: '0%' }}
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