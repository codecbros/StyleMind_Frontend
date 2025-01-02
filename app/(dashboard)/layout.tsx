import { AppSidebar } from '@/components/AppSidebar'
import { ModeToggle } from '@/components/ModeToggle'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='flex flex-1 flex-col gap-4 p-4'>
        <div className='flex justify-between'>
          <SidebarTrigger />
          <ModeToggle />
        </div>
        {children}
      </main>
    </SidebarProvider>
  )
}
