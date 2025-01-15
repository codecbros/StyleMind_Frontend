'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { userSchema } from '@/schema/auth/userSchema'
import { UserSchemaType } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { SkinTonePicker } from '@/components/SkinTonePicker'
import { useGenders } from '@/hooks/useGenders'
import { Textarea } from '@/components/ui/textarea'

export default function Profile() {
  const { genders } = useGenders()
  const form = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      size: '',
      hairColor: '',
      skinTone: '',
      weight: 0, // Valores numéricos por defecto
      height: 0,
      genderId: '',
      bodyDescription: '',
      profileDescription: ''
    }
  })

  function onSubmit(data: any) {
    console.log('first')
    console.log(data)
  }

  return (
    <>
      <h1 className='text-center text-xl uppercase font-extrabold'>perfil</h1>

      <section className='w-full lg:w-3/4 2xl:w-3/5 flex justify-center mx-auto'>
        <Card className='p-5 mt-3 w-full border border-muted-foreground'>
          <h4 className='text-sm text-muted-foreground'>Informacion Personal</h4>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombres *</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='Ej: María'
                        className='hover:border-primary/50 focus:ring-primary/20  border border-muted-foreground'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apellidos *</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='Ej: García López'
                        className='hover:border-primary/50 focus:ring-primary/20  border border-muted-foreground'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex justify-between items-center gap-5'>
                <FormField
                  control={form.control}
                  name='weight'
                  render={({ field }) => (
                    <FormItem className='w-1/2'>
                      <FormLabel>Peso (kg)</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          step='0.1'
                          placeholder='70.5'
                          {...field}
                          className='hover:border-primary/50 focus:ring-primary/20  border border-muted-foreground '
                        />
                      </FormControl>
                      <FormDescription>Tu peso en kilogramos.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='height'
                  render={({ field }) => (
                    <FormItem className='w-1/2'>
                      <FormLabel>Altura (cm)</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='175'
                          {...field}
                          className='hover:border-primary/50 focus:ring-primary/20  border border-muted-foreground'
                        />
                      </FormControl>
                      <FormDescription>Tu altura en centímetros.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='hairColor'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color de cabello</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Ej: Castaño oscuro, Rubio cenizo, etc.'
                        {...field}
                        className='hover:border-primary/50 focus:ring-primary/20  border border-muted-foreground'
                      />
                    </FormControl>
                    <FormDescription>Describe tu color de cabello actual.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='size'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Talla</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className='hover:border-primary/50 focus:ring-primary/20  border border-muted-foreground'>
                          <SelectValue placeholder='Selecciona una talla' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='xs'>XS</SelectItem>
                        <SelectItem value='s'>S</SelectItem>
                        <SelectItem value='m'>M</SelectItem>
                        <SelectItem value='l'>L</SelectItem>
                        <SelectItem value='xl'>XL</SelectItem>
                        <SelectItem value='xxl'>XXL</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>Selecciona tu talla de ropa habitual.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='skinTone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tono de piel</FormLabel>
                    <FormControl>
                      <SkinTonePicker value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormDescription>
                      Selecciona el tono de piel que mejor te describa.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='genderId'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Género *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className='hover:border-primary/50 focus:ring-primary/20 border border-muted-foreground'>
                          <SelectValue placeholder='Selecciona tu género' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {genders.map(gender => (
                          <SelectItem key={gender.id} value={gender.id}>
                            {gender.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='bodyDescription'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Tell us a little bit about yourself'
                        className='hover:border-primary/50 focus:ring-primary/20  border border-muted-foreground'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      You can <span>@mention</span> other users and organizations.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='profileDescription'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Tell us a little bit about yourself'
                        className='hover:border-primary/50 focus:ring-primary/20  border border-muted-foreground'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      You can <span>@mention</span> other users and organizations.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='flex justify-between items-center'>
                <Button className='font-semibold flex items-center gap-2' type='submit'>
                  Guardar
                </Button>
                <Button type='button' className='h-10 font-semibold'>
                  Editar
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </section>
    </>
  )
}
