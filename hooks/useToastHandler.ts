import { useToast } from './use-toast'

export const useToastHandler = () => {
  const { toast } = useToast()

  const showSuccessToast = (title: string, message: string) => {
    toast({
      title: title,
      description: message,
      className: 'uppercase'
    })
  }

  const showErrorToast = (message: string) => {
    toast({
      title: 'Error',
      description: message,
      variant: 'destructive',
      className: 'uppercase'
    })
  }

  return {
    showSuccessToast,
    showErrorToast
  }
}
