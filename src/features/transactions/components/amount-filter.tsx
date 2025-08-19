import { CustomSwitch } from '@/features/transactions/components/custom-switch'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import type { Filters } from '../types'
import commissionIcon from '@/assets/commission-icon.svg'

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

  const isEnabled = minAmount !== undefined || maxAmount !== undefined
  const max = maxAmount || MAX_VALUE
  const min = minAmount || MIN_VALUE

  const isValidRange = (newMin: number, newMax: number) => {
    return newMax > newMin
  }

  return (
    <div className="rounded-lg transition-colors hover:bg-accent/50">
      <div className="flex items-center justify-between h-12">
        <div className="flex items-center gap-3">
          <div className="text-muted-foreground">
            <img src={commissionIcon} alt="Commission" className="size-6" />
          </div>
          <span className="text-[14px] font-semibold leading-[100%] text-[#313643]" style={{ fontFamily: 'Public Sans', fontStyle: 'SemiBold', letterSpacing: '0%', verticalAlign: 'middle' }}>Monto</span>
        </div>
        <CustomSwitch
          checked={isEnabled}
          onCheckedChange={(checked: boolean) => checked ? onChange(min, max) : onChange(undefined, undefined)}
        />
      </div>
      
      {isEnabled && (
        <div className="mb-2 space-y-3">
          <div className="relative">
            <Slider
              value={[min, max]}
              min={MIN_VALUE}
              max={MAX_VALUE}
              step={1}
              onValueChange={(values) => {
                const [newMin, newMax] = values
                if (isValidRange(newMin, newMax)) {
                  onChange(newMin, newMax)
                }
              }}
              className="w-full [&_[data-slot=slider-range]]:bg-[#022A9A] [&_[data-slot=slider-track]]:bg-[#E0EDFF] [&_[data-slot=slider-thumb]]:bg-[#022A9A]"
            />
          </div>
          <div className="flex gap-12">
            <div className="relative flex-1">
              <div className="absolute left-3 top-6 text-sm text-gray-700 pointer-events-none">$</div>
              <Input
                type="number"
                value={min}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || MIN_VALUE
                  if (isValidRange(value, max)) {
                    onChange(value, max)
                  }
                }}
                className="text-sm border-[#022A9A] h-12 pl-6 pr-2 pt-6 pb-1"
                min={MIN_VALUE}
                max={max}
                placeholder=" "
              />
              <label className="absolute top-2 left-3 text-xs text-gray-500 pointer-events-none">
                Monto mínimo
              </label>
            </div>
            <div className="relative flex-1">
              <div className="absolute left-3 top-6 text-sm text-gray-700 pointer-events-none">$</div>
              <Input
                type="number"
                value={max}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || MAX_VALUE
                  if (isValidRange(min, value)) {
                    onChange(min, value)
                  }
                }}
                className="text-sm border-[#022A9A] h-12 pl-6 pr-2 pt-6 pb-1"
                min={min}
                max={MAX_VALUE}
                placeholder=" "
              />
              <label className="absolute top-2 left-3 text-xs text-gray-500 pointer-events-none">
                Monto máximo
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
