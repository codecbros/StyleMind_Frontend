import { Roboto, Raleway, Playfair_Display } from 'next/font/google'

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: 'normal',
  variable: '--font-roboto'
})
export const raleway = Raleway({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: 'normal',
  variable: '--font-raleway'
})
export const playfair_display = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '800', '900'],
  variable: '--font-playfair',
  style: 'normal'
})
