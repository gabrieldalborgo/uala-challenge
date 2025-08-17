import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { AppSidebar } from "@/components/common/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile()
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {isMobile && <SidebarTrigger />}
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}