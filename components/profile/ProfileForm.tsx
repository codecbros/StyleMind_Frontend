import { useForm } from 'react-hook-form'
import { SkinTonePicker } from '../SkinTonePicker'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '../ui/form'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { UserSchemaType } from '@/types'
import { userSchema } from '@/schema/auth/userSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuthStore } from '@/store/auth.store'
import { Button } from '../ui/button'

export default function ProfileForm({ setIsEditing, isEditing }: any) {
  const profile = useAuthStore(state => state.profile)
  const form = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: profile?.firstName || '',
      lastName: profile?.lastName || '',
      //hairColor: user?.hairColor || '',
      skinTone: profile?.skinColor || '',
      weight: profile?.weight || 0,
      height: profile?.height || 0,
      bodyDescription: profile?.bodyDescription || '',
      profileDescription: profile?.profileDescription || '',
      birthDate: profile?.birthDate || '',
      genderName: profile?.gender.name || ''
    }
  })

  function onSubmit(data: any) {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
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
                    className='hover:border-primary/50 focus:ring-primary/20 border border-muted-foreground'
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
        </div>

        <FormField
          control={form.control}
          name='genderName'
          render={() => (
            <FormItem>
              <FormLabel>Género</FormLabel>
              <Select disabled defaultValue='current'>
                <FormControl className='hover:border-primary/50 border border-muted-foreground'>
                  <SelectTrigger>
                    <SelectValue>{profile?.gender?.name}</SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='current'>{profile?.gender?.name}</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Información Personal (Opcional) */}
        <Accordion type='single' collapsible className='w-full'>
          <AccordionItem value='item-1'>
            <AccordionTrigger>Información Personal (Opcional)</AccordionTrigger>
            <AccordionContent>
              <FormField
                control={form.control}
                name='birthDate'
                render={({ field }) => (
                  <FormItem className='mb-6'>
                    <FormLabel>Fecha de nacimiento</FormLabel>
                    <FormControl>
                      <Input
                        type='date'
                        max={new Date().toISOString().split('T')[0]}
                        {...field}
                        className='hover:border-primary/50 focus:ring-primary/20 border border-muted-foreground'
                      />
                    </FormControl>
                    <FormDescription>
                      Tu fecha de nacimiento se usa para calcular tu edad.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='grid grid-cols-2 gap-6'>
                <FormField
                  control={form.control}
                  name='weight'
                  render={({ field }) => (
                    <FormItem>
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
                    <FormItem>
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Características Físicas (Opcional) */}
        <Accordion type='single' collapsible className='w-full'>
          <AccordionItem value='item-2'>
            <AccordionTrigger>Características Físicas (Opcional)</AccordionTrigger>
            <AccordionContent className='space-y-6'>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
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
                  name='hairColor'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color de cabello</FormLabel>
                      <FormControl>
                        <Input
                          type='text'
                          placeholder='Ej: Castaño oscuro, Rubio cenizo, etc.'
                          {...field}
                          className='hover:border-primary/50 focus:ring-primary/20 border border-muted-foreground'
                        />
                      </FormControl>
                      <FormDescription>Describe tu color de cabello actual.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name='bodyDescription'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción del cuerpo</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Describe tu tipo de cuerpo, características distintivas, etc.'
                        className='hover:border-primary/50 focus:ring-primary/20 border border-muted-foreground'
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Proporciona una breve descripción de tu cuerpo (máximo 500 caracteres).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <FormField
          control={form.control}
          name='profileDescription'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción del perfil (Opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Describe tu personalidad, intereses, hobbies, etc.'
                  className='hover:border-primary/50 focus:ring-primary/20 border border-muted-foreground'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Proporciona una breve descripción de ti mismo (máximo 1000 caracteres).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='mt-5'>
          {isEditing ? (
            <div className='flex justify-between items-center'>
              <Button className='font-semibold' type='submit'>
                Guardar
              </Button>
              <Button
                className='font-semibold'
                type='button'
                variant='outline'
                onClick={() => setIsEditing(!isEditing)}
              >
                Cancelar
              </Button>
            </div>
          ) : (
            <Button
              className='font-semibold'
              type='button'
              onClick={() => setIsEditing(!isEditing)}
            >
              Editar
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}
