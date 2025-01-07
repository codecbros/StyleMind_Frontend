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
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormRegisterType } from '@/types/Register'
import { formSchema } from '@/schema/auth/registerSchema'
import { registerUser } from '@/services/auth/register'
import { useToast } from '@/hooks/use-toast'

export default function FormRegister() {
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<FormRegisterType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  })

  async function onSubmit(data: FormRegisterType) {
    try {
      const response = await registerUser(data)
      toast({
        title: '¡Registro exitoso!',
        description: response.message,
        className: 'uppercase'
      })
      form.reset()
      router.push('/')
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
        className: 'uppercase'
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-7'>
        <FormField
          control={form.control}
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombres</FormLabel>
              <FormControl>
                <Input type='text' placeholder='Pepito Pepon' {...field} />
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
                <Input type='text' placeholder='Perrone Perreo' {...field} />
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
                <Input type='email' placeholder='correo@correo.com' {...field} />
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
                <Input type='password' {...field} />
              </FormControl>
              <FormDescription>Recuerda poner una contraseña segura</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='font-semibold' type='submit'>
          Guardar
        </Button>
      </form>
    </Form>
  )
}
