import { CreditCard } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { CustomBadge } from './custom-badge'
import { useCards } from '../hooks/use-cards'
import type { Filters } from '../types'

const ALL_CARD_OPTION = { id: 'all', label: 'Todas' }

interface CardFilterProps {
  value: Filters['card']
  onChange: (value: Filters['card']) => void
}

export function CardFilter({ value, onChange }: CardFilterProps) {
  const { cards, state } = useCards()

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
            <span className="text-sm font-medium">Tarjeta</span>
          </div>
          <Switch
            checked={Boolean(value)}
            onCheckedChange={(checked) => onChange(checked ? [] : undefined)}
          />
        </div>

        {value && (
          <div className="mt-3 flex flex-wrap gap-2">
            <CustomBadge
              id={ALL_CARD_OPTION.id}
              label={ALL_CARD_OPTION.label}
              isSelected={value.length === 0}
              onToggle={() => onChange(value.length > 0 ? [] : undefined)}
            />
            {cards.map((card) => (
              <CustomBadge
                key={card.value}
                id={card.value}
                label={card.label}
                isSelected={value.includes(card.value)}
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