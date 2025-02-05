'use client'
import { User, LogOut, Shirt, SquarePlus } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { ModeToggle } from './ModeToggle'
import { useIsMobile } from '@/hooks/use-mobile'
import Link from 'next/link'
import { useAuthStore } from '@/store/auth.store'
import { useDeleteCookie } from 'cookies-next/client'
import { useToastHandler } from '@/hooks/useToastHandler'
import { usePathname, useRouter } from 'next/navigation'

// Menu items.
const items = [
  {
    title: 'Perfil',
    url: '/dashboard/perfil',
    icon: User
  },
  {
    title: 'Armario',
    url: '/dashboard/armario',
    icon: Shirt
  },
  {
    title: 'Nueva Prenda',
    url: '/dashboard/armario/nueva-prenda',
    icon: SquarePlus
  }
]

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useIsMobile()
  const logout = useAuthStore(state => state.logout)
  const deleteCookie = useDeleteCookie()
  const { showErrorToast, showSuccessToast } = useToastHandler()

  const handleClickLogout = () => {
    try {
      logout()
      deleteCookie('cookie-token')
      showSuccessToast('Cuenta Cerrada', 'Tu cuenta ha sido cerrada exitosamente.')
      router.push('/')
    } catch (error) {
      showErrorToast('Error al cerrar sesión')
    }
  }

  return (
    <Sidebar collapsible='icon' side={isMobile ? 'right' : 'left'}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>StyleMind</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton onClick={handleClickLogout}>
          <LogOut />
          <span>Cerrar sesión</span>
        </SidebarMenuButton>
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  )
}
