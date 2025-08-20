import emptyStateIcon from '@/assets/empty-state-icon.svg';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <img src={emptyStateIcon} alt="Empty state" />
      <div
        className="text-center"
        style={{
          fontFamily: 'Public Sans',
          fontWeight: 100,
          fontSize: '14px',
          lineHeight: '140%',
          letterSpacing: '0px',
          color: '#606882',
          maxWidth: '320px',
        }}
      >
        No hay resultados que mostrar. Podés probar usando los filtros.
      </div>
    </div>
  );
}
