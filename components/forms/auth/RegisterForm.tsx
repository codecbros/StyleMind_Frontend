'use client'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoaderCircle } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useRegisterForm } from '@/hooks/useRegisterForm'
import Link from 'next/link'
import { useGenders } from '@/hooks/useGenders'

export default function RegisterForm() {
  const { form, onSubmit, isLoading } = useRegisterForm()
  const { genders } = useGenders()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <FormField
          control={form.control}
          name='genderId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Género</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className='hover:border-primary/50 border border-muted-foreground'>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecciona tu género' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className='hover:border-primary/50 border border-muted-foreground'>
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
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombres</FormLabel>
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
              <FormLabel>Apellidos</FormLabel>
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
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo Electronico</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder='tu@email.com'
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
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  className='hover:border-primary/50 focus:ring-primary/20  border border-muted-foreground'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {' '}
                Usa al menos 6 caracteres, incluyendo números y símbolos
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex flex-col gap-6 md:flex-row justify-between items-center'>
          <Button
            className='font-semibold flex items-center gap-2'
            type='submit'
            disabled={isLoading}
          >
            {isLoading && <LoaderCircle className='animate-spin w-4 h-4' />}
            {isLoading ? 'Creando tu cuenta...' : 'Únete a la comunidad'}
          </Button>
          <p className='text-center text-sm text-muted-foreground font-semibold'>
            ¿Ya tienes una cuenta?{' '}
            <Link href='/auth/login' className='text-primary hover:underline font-semibold'>
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </form>
    </Form>
  )
}
