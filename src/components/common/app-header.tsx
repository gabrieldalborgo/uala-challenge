import { useIsMobile } from "@/hooks/use-mobile"
import { useSidebar } from "../ui/sidebar"

import profileSvg from "/src/assets/profile.svg"
import menuIconSvg from "/src/assets/menu-icon.svg"
import ualaLogoSvg from "/src/assets/uala-isotipo-mobile.svg"

function DesktopHeader() {
  return (
    <header className="h-20 w-full bg-white flex items-center px-6">
      <div className="flex items-center gap-8">
        <img
          src={profileSvg}
          alt="Profile"
          width="40"
          height="40"
          className="w-10 h-10"
        />
        <span
          className="font-['Public_Sans'] font-semibold text-base leading-[18px] tracking-[0px]"
        >
          Name
        </span>
      </div>
    </header>
  )
}

function MobileHeader() {
  const { toggleSidebar } = useSidebar()
  return (
    <header className="h-14 w-full bg-[#fafafa]">
      <div className="h-full w-full bg-background flex items-center px-0 border-b border-[#dee2ec] rounded-bl-[32px]">
        <div className="w-20 flex items-center">
          <div className="ml-6">
            <button className="w-6 h-6 p-0 flex items-center cursor-pointer" onClick={toggleSidebar}>
              <img
                src={menuIconSvg}
                alt="Menu"
                width="24"
                height="24"
                className="w-6 h-6"
              />
            </button>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <img
            src={ualaLogoSvg}
            alt="Uala"
            width="80"
            height="40"
            className="w-20 h-10"
          />
        </div>

        {/* Empty div to balance the layout */}
        <div className="w-20 h-6"></div>
      </div>
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
