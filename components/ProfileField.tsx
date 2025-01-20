type ProfileFieldProps = {
  label: string
  value: string | undefined | null | number | boolean
}

export function ProfileField({ label, value }: ProfileFieldProps) {
  return (
    <div className='flex flex-col gap-1.5'>
      <span className='text-base text-primary/80'>{label}</span>
      <p className='text-sm text-primary/60 text-wrap'>{value || 'No Especificado'}</p>
    </div>
  )
}
