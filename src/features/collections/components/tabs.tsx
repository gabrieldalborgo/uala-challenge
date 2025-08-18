import type { Periodicity } from "../types"

function Tab({ label, selected, onClick }: { label: string, selected?: boolean, onClick: () => void }) {
  return (
    <div className="h-12 flex items-center" onClick={onClick}>
      <div className="flex flex-col items-center">
        <div
          className="text-[#565656]"
          style={{
            fontFamily: 'Public Sans',
            fontWeight: selected ? 600 : 400,
            fontSize: '14px',
            lineHeight: '18px',
            letterSpacing: '0px',
            textAlign: 'center'
          }}
        >
          {label}
        </div>
        {selected && (
          <div 
            className="w-2 h-2 rounded-full bg-[#022A9A] mt-3"
          />
        )}
      </div>
    </div>
  )
}

export function Tabs({ periodicity, setPeriodicity }: { periodicity: Periodicity, setPeriodicity: (periodicity: Periodicity) => void }) {
  return (
    <>
      <Tab label="Diario" selected={periodicity === "daily"} onClick={() => setPeriodicity("daily")} />
      <Tab label="Semanal" selected={periodicity === "weekly"} onClick={() => setPeriodicity("weekly")} />
      <Tab label="Mensual" selected={periodicity === "monthly"} onClick={() => setPeriodicity("monthly")} />
    </>
  )
}