import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import ualaIsotipo from "@/assets/uala-isotipo.svg"
import homeMenu from "@/assets/home-menu-icon.svg"
import metricsMenu from "@/assets/metrics-menu-icon.svg"
import appStore from "@/assets/app-store.svg"
import googlePlay from "@/assets/google-play.svg"

export function AppSidebar() {
  return (
    <Sidebar className="shadow-[10px_0px_31px_0px_#E7EEFF80] border-none">
      <SidebarHeader className="h-20">
        <div className="ml-5 h-full flex items-center">
          <img
            src={ualaIsotipo}
            alt="Ualá Logo"
            width="120"
            height="40"
            className="h-10 w-30"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem className="h-12 w-full">
              <SidebarMenuButton tooltip="Inicio" className="h-12 w-full items-center gap-4">
                <img
                  src={homeMenu}
                  alt="Home Icon"
                  width="24"
                  height="24"
                  className="w-6 h-6 ml-5"
                />
                <span className="font-sans font-normal text-sm leading-[18px] tracking-[0px]">Inicio</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem className="h-12 w-full">
              <SidebarMenuButton tooltip="Métricas" className="h-12 w-full items-center gap-4">
                <img
                  src={metricsMenu}
                  alt="Metrics Icon"
                  width="24"
                  height="24"
                  className="w-6 h-6 ml-5"
                />
                <span className="font-sans font-normal text-sm leading-[18px] tracking-[0px]">Métricas</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="mb-11">
        <h3 className="font-sans font-semibold text-lg leading-6 tracking-[0px] text-center text-gray-700 mb-4">
          Descargá la app desde
        </h3>
        <div className="space-y-4 flex flex-col items-center">
          <button className="w-[136px] h-[40px] cursor-pointer">
            <img
              src={appStore}
              alt="Download on App Store"
              width="136"
              height="40"
              className="w-full h-full"
            />
          </button>
          <button className="w-[136px] h-[40px] cursor-pointer">
            <img
              src={googlePlay}
              alt="Download on Google Play"
              width="136"
              height="40"
              className="w-full h-full"
            />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}