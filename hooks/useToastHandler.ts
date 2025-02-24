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
      className: 'uppercase mb-3'
    })
  }

  const showPreventiveToast = (message: string) => {
    toast({
      title: 'Precaucion',
      description: message,
      className: 'uppercase',
      style: { backgroundColor: '#fcd34d', color: '#000' }
    })
  }
  return {
    showSuccessToast,
    showErrorToast,
    showPreventiveToast
  }
}
