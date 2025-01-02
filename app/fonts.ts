import { Roboto, Raleway, Playfair_Display } from 'next/font/google'

export const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'], style: 'normal' })
export const raleway = Raleway({ subsets: ['latin'], weight: ['400', '700'], style: 'normal' })
export const playfair_display = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
  style: 'normal'
})
