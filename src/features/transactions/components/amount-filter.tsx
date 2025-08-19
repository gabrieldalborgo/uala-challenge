import { DollarSign } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import type { Filters } from '../types'

const MIN_VALUE = 0
const MAX_VALUE = 2000

interface AmountFilterProps {
  minAmount: Filters['minAmount']
  maxAmount: Filters['maxAmount']
  onChange: (minAmount: Filters['minAmount'], maxAmount: Filters['maxAmount']) => void
}

export function AmountFilter({ 
  minAmount, 
  maxAmount, 
  onChange 
}: AmountFilterProps) {

  const isEnabled = Boolean(minAmount) || Boolean(maxAmount)
  const max = maxAmount || MAX_VALUE
  const min = minAmount || MIN_VALUE

  const handleInputChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value) || 0
    switch (type) {
      case 'min':
        onChange(numValue, maxAmount)
        break
      case 'max':
        onChange(minAmount, numValue)
        break
    }
  }

  return (
    <div className="p-3 rounded-lg transition-colors hover:bg-accent/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-muted-foreground">
            <DollarSign className="size-5" />
          </div>
          <span className="text-sm font-medium">Monto</span>
        </div>
        <Switch
          checked={isEnabled}
          onCheckedChange={(checked) => checked ? onChange(min, max) : onChange(undefined, undefined)}
        />
      </div>
      
      {isEnabled && (
        <div className="mt-3 space-y-3">
          <div className="relative">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-2 bg-primary rounded-full"
                style={{ width: `${((max - min) / MAX_VALUE) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>${min}</span>
              <span>${max}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Monto mínimo</label>
              <Input
                type="number"
                value={min}
                onChange={(e) => handleInputChange('min', e.target.value)}
                className="text-sm"
                min={MIN_VALUE}
                max={max}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Monto máximo</label>
              <Input
                type="number"
                value={max}
                onChange={(e) => handleInputChange('max', e.target.value)}
                className="text-sm"
                min={min}
                max={MAX_VALUE}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
