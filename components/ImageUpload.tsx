'use client'
import React from 'react'
import { useCallback, useEffect} from 'react'
import { X, UploadCloud } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SkeletonGrid } from './skeletons/SkeletonGridImages'
import Image from 'next/image'
import { FileRejection, useDropzone } from 'react-dropzone'
import { useToastHandler } from '@/hooks/useToastHandler'
import { FilesType } from '@/types'

type ImageUploaderProps = {
  fileObjects: FilesType[]
  setFileObjects: React.Dispatch<React.SetStateAction<FilesType[]>>
  originalFiles: File[]
  setOriginalFiles: React.Dispatch<React.SetStateAction<File[]>>
  isImagesUploading?: boolean
}

export default function ImageUploader({
  fileObjects: files,
  setFileObjects: setFiles,
  originalFiles,
  setOriginalFiles,
  isImagesUploading
}: ImageUploaderProps) {
  const { showErrorToast, showPreventiveToast } = useToastHandler()

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [files])

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles?.length) {
        const totalFiles = files.length + acceptedFiles.length
        if (totalFiles > 4) {
          showPreventiveToast('Se ha excedido el límite de 4 archivos. Solo se aceptarán los primeros archivos hasta completar el límite.')

          const remainingSlots = Math.max(0, 4 - files.length)
          const allowedFiles = acceptedFiles.slice(0, remainingSlots)

          if (remainingSlots > 0) {
            const mappedFiles: FilesType[] = allowedFiles.map(file => ({
              ...file,
              path: file.name,
              relativePath: file.name,
              preview: URL.createObjectURL(file)
            }))
            setFiles(prev => [...prev, ...mappedFiles])
            setOriginalFiles(prev => [...prev, ...allowedFiles])
          }
        } else {
          const mappedFiles: FilesType[] = acceptedFiles.map(file => ({
            ...file,
            path: file.name,
            relativePath: file.name,
            preview: URL.createObjectURL(file)
          }))
          setFiles(prev => [...prev, ...mappedFiles])
          setOriginalFiles(prev => [...prev, ...acceptedFiles])
        }
      }

      if (rejectedFiles?.length) {
        try {
          rejectedFiles.forEach(file => {
            const errorMessage = file.errors?.map(error => error.message)?.join(', ') ?? 'Error desconocido'
            showErrorToast(errorMessage)
          })
        } catch {
          showErrorToast('Error al procesar los archivos rechazados')
        }
      }
    },
    [files, showPreventiveToast, showErrorToast, setFiles, setOriginalFiles]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    onDrop,
    maxSize: 5242880 // 5MB
  })

  const removeFile = (path: string) => {
    setFiles(prev => prev.filter(file => file.path !== path))
    setOriginalFiles(prev => prev.filter(file => file.name !== path))
  }

  return (
    <section>
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-6 transition-colors duration-200 hover:border-blue-500 hover:bg-blue-100 mt-1',
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300',
          files.length >= 4 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        )}
      >
        <input {...getInputProps()} />
        <div className='flex flex-col items-center justify-center gap-2'>
          <UploadCloud className='h-10 w-10 text-gray-400' />
          <p className='text-sm text-gray-600 text-center'>
            {isDragActive
              ? 'Suelta las imágenes aquí'
              : files.length >= 4
              ? 'Límite de imágenes alcanzado'
              : 'Arrastra y suelta imágenes aquí, o haz click para seleccionar - máximo 4 imágenes'}
          </p>
          <p className='text-xs text-gray-500 text-center'>PNG, JPG, WEBP, AVIF, SVG - Máx 5MB</p>
        </div>
      </div>

      {isImagesUploading && <SkeletonGrid count={originalFiles.length} />}
      {!isImagesUploading && (
        <ul className={files.length ? 'my-10 grid grid-cols-2 sm:gap-y-20 lg:grid-cols-4 gap-10' : 'hidden'}>
          {files.map(file => (
            <li key={file.preview} className='relative h-32 rounded-md shadow-lg hover:dark:bg-slate-100 hover:bg-slate-200'>
              <Image
                src={file.preview}
                alt={file.path}
                width={100}
                height={100}
                onLoad={() => URL.revokeObjectURL(file.preview)}
                className='h-full w-full object-scale-down rounded-md'
              />
              <button
                type='button'
                className='w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-red-400 transition-colors'
                onClick={() => removeFile(file.path)}
              >
                <X className='w-5 h-5 fill-white dark:fill-black hover:fill-secondary-400 transition-colors' />
              </button>
              <p className='mt-2 text-neutral-500 text-[12px] font-medium'>{file.path}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
