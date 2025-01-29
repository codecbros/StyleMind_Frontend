import { SkinTonePicker } from '../SkinTonePicker'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '../ui/alert-dialog'
import { LoaderCircle } from 'lucide-react'
import { useProfileForm } from '@/hooks/forms/useProfileForm'
import { Dispatch, SetStateAction } from 'react'

type authProps = {
  isEditing: boolean
  setIsEditing: Dispatch<SetStateAction<boolean>>
}

export default function ProfileForm({ setIsEditing, isEditing }: authProps) {
  const { form, onSubmit, isLoading, handleDeleteAccount, profile } = useProfileForm({ setIsEditing, isEditing })

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
          name='genderId'
          render={() => (
            <FormItem>
              <FormLabel>Género</FormLabel>
              <Select disabled defaultValue={'current'}>
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
                        value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                        onChange={e => {
                          const date = new Date(e.target.value)
                          // Convertimos a formato ISO
                          const isoDate = date.toISOString()
                          field.onChange(isoDate)
                        }}
                        className='hover:border-primary/50 focus:ring-prim  ary/20 border border-muted-foreground'
                      />
                    </FormControl>
                    <FormDescription>Tu fecha de nacimiento se usa para calcular tu edad.</FormDescription>
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
                  name='skinColor'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tono de piel</FormLabel>
                      <FormControl>
                        <SkinTonePicker value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormDescription>Selecciona el tono de piel que mejor te describa.</FormDescription>
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
                    <FormDescription>Proporciona una breve descripción de tu cuerpo (máximo 350 caracteres).</FormDescription>
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
              <FormDescription>Proporciona una breve descripción de ti mismo (máximo 500 caracteres).</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='mt-5'>
          {isEditing ? (
            <div className='flex justify-between items-center'>
              <Button className='font-semibold' type='submit' disabled={isLoading}>
                {isLoading && <LoaderCircle className='animate-spin w-4 h-4' />}
                {isLoading ? 'Actualizando Datos...' : 'Guardar'}
              </Button>
              <Button className='font-semibold' type='button' variant='outline' onClick={() => setIsEditing(!isEditing)}>
                Cancelar
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant='destructive'>Eliminar Cuenta</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta acción eliminará tu cuenta de forma permanente y no podrás recuperarla. Todos tus datos asociados se perderán. Por favor,
                      confirma si deseas continuar.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDeleteAccount}>Eliminar</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          ) : (
            <Button className='font-semibold' type='button' onClick={() => setIsEditing(!isEditing)}>
              Editar
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}
