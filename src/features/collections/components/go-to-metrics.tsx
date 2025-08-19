import pieIcon from "../../../assets/pie-icon.svg";
import pieWhiteIcon from "../../../assets/pie-white-icon.svg";
import { Button } from "../../../components/ui/button";
import { useState } from "react";

export function GoToMetrics() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button 
      variant="ghost" 
      className="text-[#022A9A] hover:bg-[#022A9A] hover:text-white transition-colors rounded-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => alert('Not implemented')}
    >
      <img 
        src={isHovered ? pieWhiteIcon : pieIcon} 
        alt="Filter" 
        className="w-6 h-6 transition-all" 
      />
      <span
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
    </Button>
  )
}
