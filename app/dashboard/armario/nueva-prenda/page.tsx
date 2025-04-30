'use client'
import ContainerLayout from '@/components/ContainerLayout'
import ImageUploader from '@/components/ImageUpload'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useCategories } from '@/hooks/useCategories'
import { useToastHandler } from '@/hooks/useToastHandler'
import { wardrobeItemSchema } from '@/schema/newClothingSchema'
import { postClothing, postImages } from '@/services/clothing.service'
import { ClothingItemResponse, FilesType } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { set } from 'date-fns'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Select from 'react-select'

export default function Page() {
  const { showSuccessToast, showErrorToast } = useToastHandler()
  const { categories } = useCategories()
  const [fileObjects, setFileObjects] = useState<FilesType[]>([]) // Para la UI con previews
  const [originalFiles, setOriginalFiles] = useState<File[]>([]) // Para enviar al backend
  const [isLoading, setIsLoading] = useState(false)
  const [isImagesUploading, setIsImagesUploading] = useState(false)

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
    setIsLoading(true)
    try {
      const response = await postClothing(data)
      showSuccessToast('¡Prenda Guardada!', response.message)
      const { id }: any = response.data
      setIsImagesUploading(true)

      if (originalFiles.length > 0 && id) {
        const formData = new FormData()

        originalFiles.forEach(file => {
          formData.append('files', file)
        })

        if (id) {
          await postImages(id, formData)
          showSuccessToast('¡Imágenes subidas!', 'Las imágenes se han subido correctamente.')
          setIsImagesUploading(false)
          setIsLoading(false)
        } else {
          showErrorToast('Error al subir las imágenes')
        }
      }

      setFileObjects([])
      setOriginalFiles([])
      form.reset()
    } catch (error) {
      showErrorToast(`Error al guardar la prenda
        Por favor, revisa los datos ingresados`)
      console.log(error)
    }
  }

  return (
    <>
      <h1 className='text-center text-2xl lg:text-3xl uppercase font-extrabold'>Nueva Prenda</h1>
      <ContainerLayout>
        <Card>
          <h4 className='mb-3 text-lg font-semibold'>Cuanta más información proporciones, mejores serán las combinaciones</h4>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-8'>
              <ImageUploader
                fileObjects={fileObjects}
                originalFiles={originalFiles}
                setFileObjects={setFileObjects}
                setOriginalFiles={setOriginalFiles}
                isImagesUploading={isImagesUploading}
              />
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre de prenda</FormLabel>
                      <FormControl>{field && <Input placeholder='Camiseta basica' {...field} />}</FormControl>
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
                      <FormControl>
                        {field && (
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
                        )}
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

              <Button className='font-semibold w-full md:w-max order-1 md:order-3' type='submit' disabled={isLoading || isImagesUploading}>
                {(isLoading || isImagesUploading) && <LoaderCircle className='animate-spin w-4 h-4 mr-1' />}
                {isLoading || isImagesUploading ? 'Guardando...' : 'Guardar'}
              </Button>
            </form>
          </Form>
        </Card>
      </ContainerLayout>
    </>
  )
}
