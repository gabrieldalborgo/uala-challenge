import { CustomSwitch } from '@/features/transactions/components/custom-switch'
import { CustomBadge } from './custom-badge'
import { usePaymentMethods } from '../hooks/use-payment-methods'
import type { Filters } from '../types'
import categoriesIcon from '@/assets/categories-icon.svg'

interface PaymentMethodFilterProps {
  value: Filters['paymentMethod']
  onChange: (value: Filters['paymentMethod']) => void
}

export function PaymentMethodFilter({ value, onChange }: PaymentMethodFilterProps) {
  const { paymentMethods, state } = usePaymentMethods()

  if (state === "loading") {
    // TODO: implement loading state
    return <div>Loading...</div>
  }

  if (state === "success") {
    return (
      <div className="rounded-lg transition-colors hover:bg-accent/50">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center gap-3">
            <div className="text-muted-foreground">
              <img src={categoriesIcon} alt="Categories" className="size-6" />
            </div>
            <span className="text-[14px] font-semibold leading-[100%] text-[#313643]" style={{ fontFamily: 'Public Sans', fontStyle: 'SemiBold', letterSpacing: '0%', verticalAlign: 'middle' }}>Métodos de cobro</span>
          </div>
          <CustomSwitch
            checked={Boolean(value)}
            onCheckedChange={(checked: boolean) => onChange(checked ? [] : undefined)}
          />
        </div>

        {value && (
          <div className="mb-2 flex flex-wrap gap-2">
            {paymentMethods.map((paymentMethod) => (
              <CustomBadge
                key={paymentMethod.value}
                id={paymentMethod.value}
                label={paymentMethod.label}
                isSelected={value.includes(paymentMethod.value)}
                onToggle={(id) => onChange(value.includes(id) ? value.filter(v => v !== id) : [...value, id])}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  // TODO: implement other states
  return <div>State not implemented: {state}</div>
}