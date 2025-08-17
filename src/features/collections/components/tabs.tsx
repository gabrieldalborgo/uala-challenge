function Tab({ label, selected }: { label: string, selected?: boolean }) {
  return (
    <div className="h-12 flex items-center">
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

export function Tabs() {
  return (
    <>
      <Tab label="Diario" />
      <Tab label="Semanal" selected />
      <Tab label="Mensual" />
    </>
  )
}