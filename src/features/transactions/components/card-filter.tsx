import { CustomSwitch } from '@/features/transactions/components/custom-switch';
import { CustomBadge } from './custom-badge';
import { useCards } from '../hooks/use-cards';
import type { Filters } from '../types';
import cardIcon from '@/assets/card-icon.svg';

const ALL_CARD_OPTION = { id: 'all', label: 'Todas' };

interface CardFilterProps {
  value: Filters['card'];
  onChange: (value: Filters['card']) => void;
}

export function CardFilter({ value, onChange }: CardFilterProps) {
  const { cards, state } = useCards();

  if (state === 'loading') {
    // TODO: implement loading state
    return <div>Loading...</div>;
  }

  if (state === 'success') {
    return (
      <div className="rounded-lg transition-colors hover:bg-accent/50">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center gap-3">
            <div className="text-muted-foreground">
              <img src={cardIcon} alt="Card" className="size-6" />
            </div>
            <span
              className="text-[14px] font-semibold leading-[100%] text-[#313643]"
              style={{
                fontFamily: 'Public Sans',
                fontStyle: 'SemiBold',
                letterSpacing: '0%',
                verticalAlign: 'middle',
              }}
            >
              Tarjeta
            </span>
          </div>
          <CustomSwitch
            checked={Boolean(value)}
            onCheckedChange={(checked: boolean) =>
              onChange(checked ? [] : undefined)
            }
          />
        </div>

        {value && (
          <div className="mb-2 flex flex-wrap gap-2">
            <CustomBadge
              id={ALL_CARD_OPTION.id}
              label={ALL_CARD_OPTION.label}
              isSelected={value.length === 0}
              onToggle={() => onChange(value.length > 0 ? [] : undefined)}
            />
            {cards.map(card => (
              <CustomBadge
                key={card.value}
                id={card.value}
                label={card.label}
                isSelected={value.includes(card.value)}
                onToggle={id =>
                  onChange(
                    value.includes(id)
                      ? value.filter(v => v !== id)
                      : [...value, id]
                  )
                }
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // TODO: implement other states
  return <div>State not implemented: {state}</div>;
}
