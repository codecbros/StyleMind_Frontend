'use client'

import ContainerLayout from '@/components/ContainerLayout'
import ImageUploader from '@/components/ImageUpload'
import { Card } from '@/components/ui/card'
import { DropdownMenuRadioGroup } from '@/components/ui/dropdown-menu'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { wardrobeItemSchema } from '@/schema/newClothingSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export default function page() {
  const defaultValues = {
    images: [],
    title: '',
    category: '',
    size: '',
    brand: '',
    material: '',
    style: 'casual', // Valor por defecto (puedes cambiarlo según convenga)
    climate: '',
    description: '',
    color: '',
    purchaseDate: '',
    condition: 'new', // Valor por defecto para el estado de la prenda
    notes: ''
  }

  const form = useForm({
    resolver: zodResolver(wardrobeItemSchema),
    defaultValues
  })

  return (
    <>
      <h1 className='text-center text-2xl lg:text-3xl uppercase font-extrabold'>Nueva Prenda</h1>
      <ContainerLayout>
        <Card>
          <h4 className='mb-3 text-lg font-semibold'>Cuanta más información proporciones, mejores serán las combinaciones</h4>
          <Form {...form}>
            <form className='flex flex-col gap-10'>
              <FormField
                control={form.control}
                name='images'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Selecciona las imagenes de tu prenda</FormLabel>
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
                  name='title'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter title' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='category'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter category' {...field} />
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
                      <FormLabel>Size</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter size' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='brand'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter brand' {...field} />
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
                        <Input placeholder='Enter material' {...field} />
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
                      <FormLabel>Style</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className='hover:border-primary/50 border border-muted-foreground'>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a style' />
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
                  name='climate'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Climate</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter climate' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='color'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter color' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </Card>
      </ContainerLayout>
    </>
  )
}
