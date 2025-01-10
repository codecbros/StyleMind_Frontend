import { Shirt } from 'lucide-react'
import Link from 'next/link'

export default function MainNav() {
  return (
    <nav className='flex items-center space-x-4 lg:space-x-6 w-full'>
      <Link href='/' className='flex items-center space-x-2'>
        <Shirt className='h-6 w-6' />
        <span className='font-bold'>Fashion Dashboard</span>
      </Link>
      <nav className='flex items-center space-x-4'>
        <Link href='/' className='text-sm font-medium transition-colors hover:text-primary'>
          Inicio
        </Link>
        <Link
          href='/auth/register'
          className='text-sm font-medium transition-colors hover:text-primary'
        >
          Registro
        </Link>
        <Link href='/login' className='text-sm font-medium transition-colors hover:text-primary'>
          Login
        </Link>
      </nav>
    </nav>
  )
}
