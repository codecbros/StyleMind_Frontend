'use client'

import ContainerLayout from '@/components/ContainerLayout'
import ImageUploader from '@/components/ImageUpload'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { DropdownMenuRadioGroup } from '@/components/ui/dropdown-menu'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { wardrobeItemSchema } from '@/schema/newClothingSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Images } from 'lucide-react'
import { useForm } from 'react-hook-form'

export default function page() {
  const defaultValues = {
    images: [""],
    name: "",
    description: "",
    season: "",
    primaryColor: "",
    secondaryColor: "",
    style: "",
    material: "",
    size: "",
    categoryId: ""
  };
  

  const form = useForm({
    resolver: zodResolver(wardrobeItemSchema),
    defaultValues
  })

  const onSubmit = (data) => { 
    console.log(data)
  }

  return (
    <>
      <h1 className='text-center text-2xl lg:text-3xl uppercase font-extrabold'>Nueva Prenda</h1>
      <ContainerLayout>
        <Card>
          <h4 className='mb-3 text-lg font-semibold'>Cuanta más información proporciones, mejores serán las combinaciones</h4>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-10'>
              <FormField
                control={form.control}
                name='images'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-base'>Selecciona las imagenes de tu prenda</FormLabel>
                    <FormControl>
                      <ImageUploader />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de prenda</FormLabel>
                      <FormControl>
                        <Input placeholder='Camiseta basica' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='categoryId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categoria</FormLabel>
                      <FormControl>
                        <Input placeholder='Seleccione la categoria correspondiente' {...field} />
                      </FormControl>
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
                      <FormControl>
                        <Input placeholder='Ej: S, M, L, XL' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='season'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Temporada</FormLabel>
                      <FormControl>
                        <Input placeholder='Ej: Verano (elige la temporada considerando el material)' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='material'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Material</FormLabel>
                      <FormControl>
                        <Input placeholder='Ej: Algodón, Poliéster, Cuero' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='style'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estilo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className='hover:border-primary/50 border border-muted-foreground'>
                          <SelectTrigger>
                            <SelectValue placeholder='Seleccione el estilo de la prenda' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='casual'>Casual</SelectItem>
                          <SelectItem value='formal'>Formal</SelectItem>
                          <SelectItem value='sporty'>Sporty</SelectItem>
                          <SelectItem value='other'>Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='primaryColor'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color Principal</FormLabel>
                      <FormControl>
                        <Input placeholder='Color principal de la prenda' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='secondaryColor'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color Secundario (opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder='Color secundario' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              </div>
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem className='-mt-4'>
                      <FormLabel className=''>Descripción de la prenda (Opcional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder='Ej: Camiseta de algodón color blanco, ideal para verano' {...field} />
                      </FormControl>
                      <FormDescription>Proporciona una descripcion sobre la prenda (máximo 500 caracteres).</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className='font-semibold w-full md:w-max order-1 md:order-3' type='submit'> Guardar Prenda </Button>
            </form>
          </Form>
        </Card>
      </ContainerLayout>
    </>
  )
}
