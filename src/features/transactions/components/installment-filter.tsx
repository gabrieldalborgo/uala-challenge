import { CustomSwitch } from '@/features/transactions/components/custom-switch';
import { CustomBadge } from './custom-badge';
import type { Filters } from '../types';
import installmentIcon from '@/assets/installment-icon.svg';

const ALL_INSTALLMENT_OPTION = { id: 'all', label: 'Todas' };

const INSTALLMENT_OPTIONS = [
  { id: '1', label: '1' },
  { id: '2', label: '2' },
  { id: '3', label: '3' },
  { id: '6', label: '6' },
  { id: '12', label: '12' },
];

interface InstallmentFilterProps {
  value: Filters['card'];
  onChange: (value: Filters['card']) => void;
}

export function InstallmentFilter({ value, onChange }: InstallmentFilterProps) {
  return (
    <div className="rounded-lg transition-colors hover:bg-accent/50">
      <div className="flex items-center justify-between h-12">
        <div className="flex items-center gap-3">
          <div className="text-muted-foreground">
            <img src={installmentIcon} alt="Installment" className="size-6" />
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
            Cuotas
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
            id={ALL_INSTALLMENT_OPTION.id}
            label={ALL_INSTALLMENT_OPTION.label}
            isSelected={value.length === 0}
            onToggle={() => onChange(value.length > 0 ? [] : undefined)}
          />
          {INSTALLMENT_OPTIONS.map(installment => (
            <CustomBadge
              key={installment.id}
              id={installment.id}
              label={installment.label}
              isSelected={value.includes(installment.id)}
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
