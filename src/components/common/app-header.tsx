import { useIsMobile } from "@/hooks/use-mobile"
import { SidebarTrigger } from "@/components/ui/sidebar"

function DesktopHeader() {
  return (
    <header className="h-20 w-full bg-white border-b border-gray-200 flex items-center px-6">
      <div className="flex items-center gap-8">
        <img 
          src="/src/assets/profile.svg" 
          alt="Profile" 
          width="40"
          height="40"
          className="w-10 h-10"
        />
        <span 
          className="font-sans font-semibold text-base leading-[18px] tracking-[0px]"
        >
          Name
        </span>
      </div>
    </header>
  )
}

function MobileHeader() {

  return (
    <header className="h-20 w-full bg-white border-b border-gray-200">
      <SidebarTrigger />
      {/* Header content will go here */}
    </header>
  )
}

export function AppHeader() {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <MobileHeader />
  }

  return <DesktopHeader />
}
