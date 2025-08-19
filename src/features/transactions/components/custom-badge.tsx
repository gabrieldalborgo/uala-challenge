import { X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface CustomBadgeProps {
  id: string
  label: string
  isSelected: boolean
  onToggle: (id: string) => void
}

export function CustomBadge({ id, label, isSelected, onToggle }: CustomBadgeProps) {
  return (
    <Badge
      variant="outline"
      className={`cursor-pointer border border-[#002066] rounded-full h-8 flex items-center justify-center text-[10px] leading-[100%] text-center ${isSelected ? 'bg-[#E0EDFF] pl-3 pr-2 font-semibold text-[#002066]' : 'bg-white hover:bg-gray-50 py-2 px-3 font-normal text-[#022A9A]'}`}
      style={{ fontFamily: 'Public Sans', letterSpacing: '0%' }}
      onClick={() => onToggle(id)}
    >
      {label}
      {isSelected && (
        <X className="size-3 ml-1" />
      )}
    </Badge>
  )
}