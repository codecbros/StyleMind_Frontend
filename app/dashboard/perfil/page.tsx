'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { useState } from 'react'

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
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
      profileDescription: '',
      birthDate: ''
    }
  })

  function onSubmit(data: any) {
    console.log(data)
  }

  return (
    <>
      <h1 className='text-center text-xl lg:text-3xl uppercase font-extrabold'>perfil</h1>
      <section className='w-full lg:w-3/4 2xl:w-3/5 flex justify-center mx-auto'>
        <Card className='p-5 mt-3 w-full border border-muted-foreground shadow-xl'>
          <h4 className='mb-3 text-lg font-semibold'>
            Completa tu perfil: Cuanta más información proporciones, mejores serán las combinaciones
          </h4>

          {isEditing ? (
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
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Género *</FormLabel>
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
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <FormField
                          control={form.control}
                          name='size'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Talla</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl className='hover:border-primary/50 border border-muted-foreground'>
                                  <SelectTrigger>
                                    <SelectValue placeholder='Selecciona una talla' />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent className='hover:border-primary/50 border border-muted-foreground'>
                                  <SelectItem value='xs'>XS</SelectItem>
                                  <SelectItem value='s'>S</SelectItem>
                                  <SelectItem value='m'>M</SelectItem>
                                  <SelectItem value='l'>L</SelectItem>
                                  <SelectItem value='xl'>XL</SelectItem>
                                  <SelectItem value='xxl'>XXL</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Selecciona tu talla de ropa habitual.
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
                              <FormDescription>
                                Describe tu color de cabello actual.
                              </FormDescription>
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
                              Proporciona una breve descripción de tu cuerpo (máximo 500
                              caracteres).
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
              </form>
            </Form>
          ) : (
            <div className='flex flex-col gap-3'>
              <section className='space-y-4'>
                <h4 className='text-lg font-semibold'>Información Básica</h4>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='flex flex-col gap-2'>
                    <p className='text-sm font-semibold text-gray-500'>Nombres</p>
                    <span className='text-sm text-gray-600'>No especificado</span>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-xs font-medium text-gray-500'>Nombres</p>
                    <span className='text-sm text-gray-600'>No especificado</span>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-xs font-medium text-gray-500'>Nombres</p>
                    <span className='text-sm text-gray-600'>No especificado</span>
                  </div>
                </div>
              </section>
              <section className='space-y-4'>
                <h4 className='text-lg font-semibold'>información Personal</h4>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='flex flex-col gap-2'>
                    <p className='text-xs font-medium text-gray-500'>Nombres</p>
                    <span className='text-sm text-gray-600'>No especificado</span>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-xs font-medium text-gray-500'>Nombres</p>
                    <span className='text-sm text-gray-600'>No especificado</span>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-xs font-medium text-gray-500'>Nombres</p>
                    <span className='text-sm text-gray-600'>No especificado</span>
                  </div>
                </div>
              </section>
              <section className='space-y-4'>
                <h4 className='text-lg font-semibold'>Catacreristicas Fisicas</h4>
                <div className='grid grid-cols-1'>
                  <div className='flex flex-col gap-2'>
                    <p className='text-xs font-medium text-gray-500'>Tono de piel</p>
                    <span className='text-sm text-gray-600'>No especificado</span>
                  </div>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='flex flex-col gap-2'>
                    <p className='text-xs font-medium text-gray-500'>Nombres</p>
                    <span className='text-sm text-gray-600'>No especificado</span>
                  </div>
                  <div className='flex flex-col gap-2'>
                    <p className='text-xs font-medium text-gray-500'>Nombres</p>
                    <span className='text-sm text-gray-600'>No especificado</span>
                  </div>
                </div>
                <div className='grid grid-cols-1'>
                  <div className='flex flex-col gap-2'>
                    <p className='text-xs font-medium text-gray-500'>Tono de piel</p>
                    <textarea disabled className='text-sm text-gray-600 p-2'>
                      No especificado
                    </textarea>
                  </div>
                </div>
              </section>
              <section>
                <div className='grid grid-cols-1'>
                  <div className='flex flex-col gap-2'>
                    <p className='text-xs font-medium text-gray-500'>Descripcion del perfil</p>
                    <textarea disabled className='text-sm text-gray-600 p-2'>
                      No especificado
                    </textarea>
                  </div>
                </div>
              </section>
            </div>
          )}

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
        </Card>
      </section>
    </>
  )
}
