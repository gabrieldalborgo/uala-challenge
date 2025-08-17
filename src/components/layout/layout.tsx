import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/common/app-sidebar"
import { AppHeader } from "@/components/common/app-header"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className="bg-[#fafafa] min-h-screen">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}