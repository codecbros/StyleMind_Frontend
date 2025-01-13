'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useLoginForm } from '@/hooks/useLoginForm'
import { LoaderCircle } from 'lucide-react'

export default function LoginForm() {
  const { form, onSubmit, isLoading } = useLoginForm()
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-7'>
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
                  placeholder='••••••••'
                  className='hover:border-primary/50 focus:ring-primary/20  border border-muted-foreground'
                  {...field}
                />
              </FormControl>
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
          {isLoading ? 'Iniciando sesión...' : 'Ingresar a mi cuenta'}
        </Button>
      </form>
    </Form>
  )
}
