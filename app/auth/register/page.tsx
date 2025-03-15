import { playfair_display } from '@/app/fonts'
import RegisterForm from '@/components/auth/RegisterForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import Image from 'next/image'

export default function register() {
  return (
    <>
      <section className='lg:col-span-1 2xl:col-span-3 mx-auto hidden lg:block '>
        <Image
          src='/registerImg.jpg'
          alt='Imagen de fondo para el registro'
          width={3000}
          height={2000}
          priority={true}
          className='object-cover transition-all duration-300 rounded-lg hover:grayscale opacity-90 dark:opacity-75'
        />
      </section>
      <section className='mx-auto w-full lg:col-span-1 2xl:col-span-2'>
        <Card className='border border-muted-foreground'>
          <CardHeader>
            <CardTitle
              className={`${playfair_display.className} font-extrabold text-center leading-7 md:text-start uppercase`}
            >
              Descubre tu estilo único
            </CardTitle>
            <div className='space-y-1 pt-2'>
              <CardDescription className='text-sm text-muted-foreground'>
                Crea combinaciones personalizadas con IA y encuentra tu próximo outfit perfecto
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
      </section>
    </>
  )
}
