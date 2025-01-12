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
import { GENDER_OPTIONS } from '@/schema/auth/registerSchema'
import { useRegisterForm } from '@/hooks/useRegisterForm'

export default function FormRegister() {
  const { form, onSubmit, isLoading } = useRegisterForm()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-7'>
        <FormField
          control={form.control}
          name='genderId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Género</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className='hover:border-primary/50 focus:ring-primary/20 border border-muted-foreground'>
                    <SelectValue placeholder='Selecciona tu género' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {GENDER_OPTIONS.map(gender => (
                    <SelectItem key={gender.genderId} value={gender.genderId}>
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
        <Button
          className='font-semibold flex items-center gap-2'
          type='submit'
          disabled={isLoading}
        >
          {isLoading && <LoaderCircle className='animate-spin w-4 h-4' />}
          {isLoading ? 'Creando tu cuenta...' : 'Únete a la comunidad'}
        </Button>
      </form>
    </Form>
  )
}
