import { Calendar } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import type { Filters } from '../types'

interface DateFilterProps {
  minDate: Filters['minDate']
  maxDate: Filters['maxDate']
}

export function DateFilter({ minDate, maxDate }: DateFilterProps) {
  return (
    <div className="p-3 rounded-lg transition-colors opacity-50 cursor-not-allowed">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-muted-foreground">
            <Calendar className="size-5" />
          </div>
          <span className="text-sm font-medium">Fecha</span>
        </div>
        <Switch
          checked={Boolean(minDate) || Boolean(maxDate)}
          disabled
        />
      </div>
    </div>
  )
}
