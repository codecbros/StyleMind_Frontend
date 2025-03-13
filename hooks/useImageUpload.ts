import { FilesType } from '@/types'
import { useCallback, useEffect, useState } from 'react'
import { useToastHandler } from './useToastHandler'
import { FileRejection, useDropzone } from 'react-dropzone'

export default function useImageUpload() {
  const [files, setFiles] = useState<FilesType[]>([])
  const { showErrorToast, showPreventiveToast } = useToastHandler()

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
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

            setFiles(previousFiles => [...previousFiles, ...mappedFiles])
          }
        } else {
          const mappedFiles: FilesType[] = acceptedFiles.map(file => ({
            ...file,
            path: file.name,
            relativePath: file.name,
            preview: URL.createObjectURL(file)
          }))

          setFiles(previousFiles => [...previousFiles, ...mappedFiles])
        }
      }

      if (rejectedFiles?.length) {
        console.log(rejectedFiles)
        try {
          rejectedFiles.forEach(file => {
            const errorMessage = file.errors?.map(error => error.message)?.join(', ') ?? 'Error desconocido'
            showErrorToast(errorMessage)
          })
        } catch (error) {
          showErrorToast('Error al procesar los archivos rechazados')
        }
      }
    },
    [files]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    onDrop,
    maxSize: 5242880 // 5MB
  })

  const removeFile = (path: string) => {
    setFiles(files => files.filter(file => file.path !== path))
  }

  return {
    getInputProps,
    getRootProps,
    isDragActive,
    files,
    removeFile
  }
}
