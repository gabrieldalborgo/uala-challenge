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
      variant={isSelected ? "default" : "outline"}
      className={`cursor-pointer ${isSelected ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
      onClick={() => onToggle(id)}
    >
      {label}
      {isSelected && (
        <X className="size-3 ml-1" />
      )}
    </Badge>
  )
}