import { CustomSwitch } from '@/features/transactions/components/custom-switch'
import type { Filters } from '../types'
import calendarIcon from '@/assets/calendar-icon.svg'

interface DateFilterProps {
  minDate: Filters['minDate']
  maxDate: Filters['maxDate']
}

export function DateFilter({ minDate, maxDate }: DateFilterProps) {
  return (
    <div className="rounded-lg transition-colors opacity-50 cursor-not-allowed">
      <div className="flex items-center justify-between h-12">
        <div className="flex items-center gap-3">
          <div className="text-muted-foreground">
            <img src={calendarIcon} alt="Calendar" className="size-6" />
          </div>
          <span className="text-[14px] font-semibold leading-[100%] text-[#313643]" style={{ fontFamily: 'Public Sans', fontStyle: 'SemiBold', letterSpacing: '0%', verticalAlign: 'middle' }}>Fecha</span>
        </div>
        <CustomSwitch
          checked={Boolean(minDate) || Boolean(maxDate)}
          disabled
        />
      </div>
    </div>
  )
}
