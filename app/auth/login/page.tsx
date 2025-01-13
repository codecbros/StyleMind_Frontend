import { playfair_display } from '@/app/fonts'
import LoginForm from '@/components/forms/auth/LoginFrom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

export default function login() {
  return (
    <>
      <section className='mx-auto w-full lg:col-span-1 2xl:col-span-2'>
        <Card className='border border-muted-foreground'>
          <CardHeader>
            <CardTitle
              className={`${playfair_display.className} font-extrabold text-center leading-7 md:text-start uppercase`}
            >
              ¡Bienvenido de nuevo!
            </CardTitle>
            <div className='space-y-1 pt-2'>
              <CardDescription>
                Ingresa a tu cuenta para descubrir nuevas combinaciones
              </CardDescription>
              <CardDescription className='text-sm text-muted-foreground'>
                Accede a tus outfits personalizados y recomendaciones de IA
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </section>
      <section className='lg:col-span-1 2xl:col-span-3 mx-auto hidden lg:block '>
        <Image
          src='/RegisterImg.jpg'
          alt=''
          width={6000}
          height={4000}
          className='object-cover transition-all duration-300 rounded-lg hover:grayscale opacity-90 dark:opacity-75 h-outlet'
        />
      </section>
    </>
  )
}
