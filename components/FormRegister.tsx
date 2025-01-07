'use client'
import { z } from 'zod'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  firstname: z.string().min(2, {
    message: 'El nombre de usuario debe tener al menos 2 caracteres.'
  }),
  lastname: z.string().min(2, {
    message: 'El nombre de usuario debe tener al menos 2 caracteres.'
  }),
  email: z.string().email({
    message: 'Por favor, introduce un email válido.'
  }),
  password: z.string().min(8, {
    message: 'La contraseña debe tener al menos 8 caracteres.'
  })
})

type FormRegisterType = z.infer<typeof formSchema>

export default function FormRegister() {
  const form = useForm<FormRegisterType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    }
  })

  function onSubmit(values: FormRegisterType) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-7'>
        <FormField
          control={form.control}
          name='firstname'
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
          name='lastname'
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
