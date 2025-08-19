import { CreditCard } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { CustomBadge } from './custom-badge'
import { usePaymentMethods } from '../hooks/use-payment-methods'
import type { Filters } from '../types'

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
      <div className="p-3 rounded-lg transition-colors hover:bg-accent/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-muted-foreground">
              <CreditCard className="size-5" />
            </div>
            <span className="text-sm font-medium">Métodos de cobro</span>
          </div>
          <Switch
            checked={Boolean(value)}
            onCheckedChange={(checked) => onChange(checked ? [] : undefined)}
          />
        </div>

        {value && (
          <div className="mt-3 flex flex-wrap gap-2">
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