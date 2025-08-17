import { Skeleton } from "@/components/ui/skeleton";
import pieIcon from "../../assets/pie-icon.svg";

export function CollectionsSummary() {
  return (
    <div className="w-full mt-10 flex flex-col gap-4">
      <div className="flex justify-center">
        <div className="w-[320px]">
          <div
            className="text-[#313643]"
            style={{
              fontFamily: 'Public Sans',
              fontWeight: 600,
              fontStyle: 'SemiBold',
              fontSize: '22px',
              lineHeight: '120%',
              letterSpacing: '0px'
            }}
          >
            Tus cobros
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Skeleton className="w-52 h-10 rounded-2xl bg-[#dee2ec]" />
      </div>
      <div className="flex justify-center">
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
      </div>
    </div>
  )
}