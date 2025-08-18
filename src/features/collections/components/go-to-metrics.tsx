import pieIcon from "../../../assets/pie-icon.svg";

export function GoToMetrics() {
  return (
    <button className="flex items-center gap-2">
      <img src={pieIcon} alt="Filter" className="w-6 h-6" />
      <span
        className="text-[#022A9A]"
        style={{
          fontFamily: 'Public Sans',
          fontWeight: 400,
          fontStyle: 'Regular',
          fontSize: '14px',
          lineHeight: '100%',
          letterSpacing: '0%',
          textAlign: 'right'
        }}
      >
        Ver métricas
      </span>
    </button>
  )
}
