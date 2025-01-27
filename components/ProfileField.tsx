import { format } from 'date-fns'

type ProfileFieldProps = {
  label: string
  value: any
}

export function ProfileField({ label, value }: ProfileFieldProps) {
  const formattedValue =
    label === 'Fecha de Nacimiento' && value
      ? format(new Date(value), 'dd/MM/yyyy') // Cambia el formato según tu preferencia
      : value

  return (
    <div className='flex flex-col gap-1.5'>
      <span className='text-base text-primary/80'>{label}</span>
      {label === 'Tono de piel' ? (
        <span className='w-8 h-8 rounded-full' style={{ backgroundColor: value }}>
          {' '}
        </span>
      ) : (
        <p className='text-sm text-primary/60 text-wrap'>{formattedValue || 'No Especificado'}</p>
      )}
    </div>
  )
}
