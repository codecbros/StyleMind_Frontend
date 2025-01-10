import FormRegister from '@/components/forms/auth/FormRegister'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function register() {
  return (
    <>
      <section className='lg:col-span-1 2xl:col-span-3 mx-auto hidden lg:block '>
        <img
          src='https://plus.unsplash.com/premium_vector-1724163333366-dc150b75f069'
          alt=''
          className='object-cover transition-all duration-300 rounded-lg filter grayscale hover:grayscale-0 h-outlet'
        />
      </section>
      <section className='mx-auto w-full lg:col-span-1 2xl:col-span-2'>
        <Card>
          <CardHeader>
            <CardTitle className='text-center leading-7 md:text-start'>
              Registrate y prueba tu mejor cachina
            </CardTitle>
            <CardDescription>hacelo pibe no lo dudes</CardDescription>
          </CardHeader>
          <CardContent>
            <FormRegister />
          </CardContent>
        </Card>
      </section>
    </>
  )
}
