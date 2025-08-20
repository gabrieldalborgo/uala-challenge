import { Skeleton } from '@/components/ui/skeleton';

export function Total({ amount }: { amount: string }) {
  return (
    <div
      className="text-[#313643] text-center"
      style={{
        fontFamily: 'Public Sans',
        fontWeight: 250,
        fontStyle: 'normal',
        fontSize: '34px',
        lineHeight: '100%',
        letterSpacing: '0%',
      }}
    >
      {amount}
    </div>
  );
}

export function TotalSkeleton() {
  return <Skeleton className="w-52 h-10 rounded-2xl bg-[#dee2ec]" />;
}
