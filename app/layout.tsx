import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import { playfair_display, raleway, roboto } from './fonts'

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
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
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
