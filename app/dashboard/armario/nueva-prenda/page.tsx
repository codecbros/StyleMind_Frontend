'use client'

import ContainerLayout from '@/components/ContainerLayout'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useCategories } from '@/hooks/useCategories'
import { wardrobeItemSchema } from '@/schema/newClothingSchema'
import { postClothing } from '@/services/clothing.service'
import { ClothingItemResponse } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Select from 'react-select'

export default function page() {
  const { categories } = useCategories()

  const defaultValues = {
    name: '',
    description: '',
    season: '',
    primaryColor: '',
    secondaryColor: '',
    style: '',
    material: '',
    size: '',
    categoriesId: [] as string[]
  }

  const form = useForm({
    resolver: zodResolver(wardrobeItemSchema),
    defaultValues
  })

  const onSubmit = async (data: ClothingItemResponse) => {
    try {
      await postClothing(data)
      form.reset()
    } catch (error) {
      console.log(error)
    }

    // Aquí puedes manejar el envío de datos a tu API o servicio
  }

  return (
    <>
      <h1 className='text-center text-2xl lg:text-3xl uppercase font-extrabold'>Nueva Prenda</h1>
      <ContainerLayout>
        <Card>
          <h4 className='mb-3 text-lg font-semibold'>Cuanta más información proporciones, mejores serán las combinaciones</h4>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-10'>
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
                  name='categoriesId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Categorias</FormLabel>
                      <Select
                        className='react-select'
                        isMulti
                        options={categories.map(category => ({
                          value: category.id,
                          label: category.name
                        }))}
                        onChange={selectedOptions => {
                          field.onChange(selectedOptions.map(option => option.value))
                        }}
                        value={field.value.map(value => ({
                          value,
                          label: categories.find(category => category.id === value)?.name || ''
                        }))}
                        placeholder='Selecciona las categorias'
                      />
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
                      <FormControl>
                        <Input placeholder='Ej: Casual, Formal, Sporty' {...field} />
                      </FormControl>
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
                    <FormLabel className=''>Descripción de la prenda</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Ej: Camiseta de algodón color blanco, ideal para verano' {...field} />
                    </FormControl>
                    <FormDescription>Proporciona una descripcion sobre la prenda (máximo 1000 caracteres).</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className='font-semibold w-full md:w-max order-1 md:order-3' type='submit'>
                {' '}
                Guardar Prenda{' '}
              </Button>
            </form>
          </Form>
        </Card>
      </ContainerLayout>
    </>
  )
}
