import { useState } from 'react'
import { ChevronLeft, Calendar, CreditCard, DollarSign, FolderOpen } from 'lucide-react'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'

interface TransactionsFiltersSheetProps {
  open: boolean
  onClose: () => void
  onApply: () => void
}

interface FilterOption {
  id: string
  label: string
  icon: React.ReactNode
  enabled: boolean
}

interface TransactionsFiltersProps {
  onClose: () => void
  onApply: () => void
  showBackButton?: boolean
  title?: string
}

export function TransactionsFilters({ 
  onClose, 
  onApply, 
  showBackButton = true, 
  title = "Filtros" 
}: TransactionsFiltersProps) {
  const [filters, setFilters] = useState<FilterOption[]>([
    { id: 'date', label: 'Fecha', icon: <Calendar className="size-5" />, enabled: false },
    { id: 'card', label: 'Tarjeta', icon: <CreditCard className="size-5" />, enabled: false },
    { id: 'installments', label: 'Cuotas', icon: <Calendar className="size-5" />, enabled: false },
    { id: 'amount', label: 'Monto', icon: <DollarSign className="size-5" />, enabled: false },
    { id: 'paymentMethods', label: 'Métodos de cobro', icon: <FolderOpen className="size-5" />, enabled: false },
  ])

  const handleFilterToggle = (filterId: string) => {
    setFilters(prev => 
      prev.map(filter => 
        filter.id === filterId 
          ? { ...filter, enabled: !filter.enabled }
          : filter
      )
    )
  }

  const handleClearFilters = () => {
    setFilters(prev => prev.map(filter => ({ ...filter, enabled: false })))
  }

  const handleApplyFilters = () => {
    onApply()
    onClose()
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b">
        {showBackButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="size-5" />
          </Button>
        )}
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-medium text-foreground">Todos los filtros</h2>
          <Button
            variant="ghost"
            onClick={handleClearFilters}
            className="text-muted-foreground hover:text-foreground p-0 h-auto"
          >
            Limpiar
          </Button>
        </div>

        {/* Filter Options */}
        <div className="space-y-4">
          {filters.map((filter) => (
            <div
              key={filter.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="text-muted-foreground">
                  {filter.icon}
                </div>
                <span className="text-sm font-medium">{filter.label}</span>
              </div>
              <Switch
                checked={filter.enabled}
                onCheckedChange={() => handleFilterToggle(filter.id)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer with Apply Button */}
      <div className="p-4 border-t">
        <Button
          onClick={handleApplyFilters}
          className="w-full h-12 text-base font-medium"
        >
          Aplicar filtros
        </Button>
      </div>
    </div>
  )
}

export function TransactionsFiltersSheet({ open, onClose, onApply }: TransactionsFiltersSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" showCloseButton={false} className="p-0">
        <TransactionsFilters onClose={onClose} onApply={onApply} />
      </SheetContent>
    </Sheet>
  )
}