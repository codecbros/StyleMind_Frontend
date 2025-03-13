'use client'

import { Suspense } from 'react'
import { X, UploadCloud } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SkeletonGrid } from './skeletons/SkeletonGridImages'
import Image from 'next/image'
import useImageUpload from '@/hooks/useImageUpload'

export default function ImageUploader() {
  const { files, getInputProps, getRootProps, isDragActive, removeFile } = useImageUpload()

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
              : 'Arrastra y suelta imágenes aquí, o haz click para seleccionar - maximo 4 imagenes'}
          </p>
          <p className='text-xs text-gray-500 text-center '>PNG, JPG, WEBP, AVIF, SVG - Max 5MB</p>
        </div>
      </div>
      <Suspense fallback={<SkeletonGrid count={files.length} />}>
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
      </Suspense>
    </section>
  )
}
