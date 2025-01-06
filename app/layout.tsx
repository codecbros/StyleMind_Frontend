'use client'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import { playfair_display, raleway, roboto } from './fonts'
import MainNav from '@/components/main-nav'
import { ModeToggle } from '@/components/ModeToggle'
import { usePathname } from 'next/navigation'

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname()
  const showMainNav = ['/', '/auth/login', '/auth/registro'].includes(pathname)

  return (
    <>
      <html lang='es' suppressHydrationWarning>
        <head />
        <body
          className={`${playfair_display.variable} ${roboto.variable} ${raleway.variable} antialiased`}
        >
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            {showMainNav && (
              <>
                <header className='container mx-auto flex items-center justify-between py-4 px-2'>
                  <MainNav />
                  <ModeToggle />
                </header>
              </>
            )}
            <main className={`${showMainNav ? 'container mx-auto' : ''} px-2`}>{children}</main>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
