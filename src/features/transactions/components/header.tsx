import { Button } from '@/components/ui/button';
import filterIcon from '@/assets/filter-icon.svg';
import exportIcon from '@/assets/export-icon.svg';

interface HeaderProps {
  title: string;
  onFilter: () => void;
  onExport: () => void;
}

export function Header({ title, onFilter, onExport }: HeaderProps) {
  return (
    <div className="flex items-center justify-between h-12 pb-2">
      <div
        className="text-[#313643]"
        style={{
          fontFamily: 'Public Sans',
          fontWeight: 600,
          fontStyle: 'normal',
          fontSize: '14px',
          lineHeight: '100%',
          letterSpacing: '0%',
          verticalAlign: 'middle',
        }}
      >
        {title}
      </div>
      <div className="flex items-center gap-0">
        <Button
          className="rounded-full cursor-pointer"
          size="icon"
          variant="ghost"
          onClick={onFilter}
        >
          <img src={filterIcon} alt="Filter" className="w-6 h-6" />
        </Button>
        <Button
          className="rounded-full cursor-pointer"
          size="icon"
          variant="ghost"
          onClick={onExport}
        >
          <img src={exportIcon} alt="Export" className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
