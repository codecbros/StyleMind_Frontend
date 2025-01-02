'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { User, Shirt, Palette, PlusCircle, BarChart2 } from 'lucide-react'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar'

const sidebarItems = [
  { name: 'Perfil', href: '/perfil', icon: User },
  { name: 'Combinaciones', href: '/combinaciones', icon: Palette },
  { name: 'Nueva Combinación', href: '/nueva-combinacion', icon: PlusCircle },
  { name: 'Armario', href: '/armario', icon: Shirt },
  { name: 'Crear Prenda', href: '/crear-prenda', icon: Shirt },
  { name: 'Estadísticas', href: '/estadisticas', icon: BarChart2 }
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className='border-r'>
      <SidebarHeader className='border-b px-6 py-4'>
        <h2 className='text-lg font-semibold tracking-tight'>Fashion Dashboard</h2>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className='h-[calc(100vh-5rem)]'>
          <SidebarMenu>
            {sidebarItems.map(item => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  className='w-full justify-start'
                >
                  <Link href={item.href} className='flex items-center'>
                    <item.icon className='mr-2 h-4 w-4' />
                    {item.name}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  )
}
